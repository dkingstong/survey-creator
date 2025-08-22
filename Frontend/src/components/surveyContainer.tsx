/*
  this is a container for survey questions,
  it will contain the question component and navigation buttons,
  it can also contain a progress bar and a submit button
*/

import { useEffect, useState, useRef, useCallback } from "react";
import { Button } from "./ui/button";
import { Sidebar } from "./sidebar";
import { surveySessionService } from "../lib/services/surveySession";
import { surveyVersionService } from "../lib/services/surveyVersion";
import { surveyVersionQuestionService } from "../lib/services/surveyVersionQuestion";
import { responseService } from "../lib/services/response";

import { authService } from "@/lib/services/auth";
import { QuestionVersion } from "@/lib/services/surveyVersionQuestion";
import { SurveyVersionHydrated } from "@/lib/services/surveys";
import { Question } from "./question";
import { ReviewSurveySession } from "./reviewSurveySession";

export const SurveyStatus = {
  not_started: "not_started",
  in_progress: "in_progress",
  completed: "completed",
} as const;

export const SurveyContainer = () => {

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState<QuestionVersion[]>([]);
  const [currentSurvey, setCurrentSurvey] = useState<SurveyVersionHydrated | null>(null);
  const [surveys, setSurveys] = useState<SurveyVersionHydrated[]>([]);
  const [answer, setAnswer] = useState<Record<string, any> | null>(null);
  const [isValidAnswer, setIsValidAnswer] = useState(false);
  
  // Loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [isCreatingSession, setIsCreatingSession] = useState(false);
  const [isSubmittingResponse, setIsSubmittingResponse] = useState(false);
  const [isUpdatingSession, setIsUpdatingSession] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Refs to prevent race conditions
  const isFetchingSurveys = useRef(false);
  const isFetchingQuestions = useRef(false);
  
  const isLastQuestion = currentQuestion === questions.length - 1;

  // Memoized function to refresh surveys
  const refreshSurveys = useCallback(async () => {
    if (isFetchingSurveys.current) {
      console.log('Already fetching surveys, skipping...');
      return;
    }

    try {
      isFetchingSurveys.current = true;
      setIsLoading(true);
      setError(null);
      
      const user = authService.getCurrentUser();
      if (!user) {
        console.log('No user found, skipping survey fetch');
        return;
      }

      const [surveySessions, surveyVersions] = await Promise.all([
        surveySessionService.getSessionsByUserId(user.id),
        surveyVersionService.getActiveSurveyVersions()
      ]);

      let processedSurveys: SurveyVersionHydrated[];

      console.log('surveySessions', surveySessions);
      console.log('surveyVersions', surveyVersions);

      if (surveySessions.length === 0) {
        // User hasn't started any surveys
        processedSurveys = surveyVersions.map((version) => ({
          id: version.id,
          name: version.name,
          description: version.description,
          version: version.version,
          is_active: version.is_active,
          survey_id: version.survey_id,
          created_at: version.created_at,
          updated_at: version.updated_at,
          sessionStatus: SurveyStatus.not_started,
          question_number: 0,
          surveySessionId: '',
        }));
      } else if (surveySessions.length === surveyVersions.length) {
        // User has started all surveys
        processedSurveys = surveySessions.map(surveySession => ({
          ...surveySession.surveyVersion,
          sessionStatus: surveySession.status,
          question_number: surveySession.question_number,
          surveySessionId: surveySession.id,
        } as SurveyVersionHydrated));
      } else {
        // User has started some surveys
        const startedSurveyVersions = surveySessions.map((session) => ({
          ...session.surveyVersion,
          surveyVersionStatus: session.surveyVersion.is_active,
          sessionStatus: session.status,
          question_number: session.question_number,
          surveySessionId: session.id,
        } as SurveyVersionHydrated));
        
        const notStartedSurveyVersions = surveyVersions.filter((version) => 
          !startedSurveyVersions.some((startedVersion) => startedVersion.id === version.id)
        );

        const allSurveyVersions = [...startedSurveyVersions, ...notStartedSurveyVersions];
        processedSurveys = allSurveyVersions.map((version) => ({
          id: version.id,
          name: version.name,
          description: version.description,
          version: version.version,
          is_active: version.is_active,
          survey_id: version.survey_id,
          created_at: version.created_at,
          updated_at: version.updated_at,
          sessionStatus: 'status' in version ? version.status as string : SurveyStatus.not_started,
          question_number: 'question_number' in version ? version.question_number as number : 0,
          surveySessionId: 'surveySessionId' in version ? version.surveySessionId as string : '',
        }));
      }

      setSurveys(processedSurveys);
    } catch (err) {
      console.error('Error fetching surveys:', err);
      setError('Failed to load surveys. Please try again.');
    } finally {
      setIsLoading(false);
      isFetchingSurveys.current = false;
    }
  }, []);

  // Fetch surveys on component mount
  useEffect(() => {
    refreshSurveys();
  }, [refreshSurveys]);

  // Fetch questions when current survey changes
  useEffect(() => {
    if (!currentSurvey || currentSurvey.sessionStatus === SurveyStatus.completed) return;

    const fetchQuestions = async () => {
      if (isFetchingQuestions.current) {
        console.log('Already fetching questions, skipping...');
        return;
      }

      try {
        isFetchingQuestions.current = true;
        setError(null);

        const questions = await surveyVersionQuestionService.getQuestionsWithDetails(currentSurvey.id);
        setQuestions(questions.map((question) => question.questionVersion) as QuestionVersion[]);
        setCurrentQuestion(currentSurvey.question_number);
      } catch (err) {
        console.error('Error fetching questions:', err);
        setError('Failed to load questions. Please try again.');
      } finally {
        isFetchingQuestions.current = false;
      }
    };

    fetchQuestions();
  }, [currentSurvey]);

  const handleSubmit = async () => {
    // we need to submit last answer, update session to completed and show the review answers
    
    if (isSubmittingResponse || isUpdatingSession) {
      console.log('Already processing, skipping submit action');
      return;
    }

    if (!isValidAnswer || !currentSurvey || !questions[currentQuestion]) {
      console.log('Cannot proceed: invalid answer or missing data');
      return;
    }

    try {
      setIsSubmittingResponse(true);
      setError(null);

      // Submit response
      await responseService.submitResponseAndUpdateSession({
        surveySessionId: currentSurvey?.surveySessionId,
        questionVersionId: questions[currentQuestion].id,
        is_last_question: isLastQuestion,
        value: answer as Record<string, any>
      });

      // show the review answers
      setCurrentSurvey({...currentSurvey, sessionStatus: SurveyStatus.completed});
      setCurrentQuestion(questions.length);
      setAnswer(null); 
    } catch (err) {
      console.error('Error handling next:', err);
      setError('Failed to save your answer. Please try again.');
    } finally {
      setIsSubmittingResponse(false);
      setIsUpdatingSession(false);
    }
  };
  const handleNext = async () => {
    if (isSubmittingResponse || isUpdatingSession) {
      console.log('Already processing, skipping next action');
      return;
    }

    if (!isValidAnswer || !currentSurvey || !questions[currentQuestion]) {
      console.log('Cannot proceed: invalid answer or missing data');
      return;
    }

    try {
      setIsSubmittingResponse(true);
      setError(null);

      // Submit response
      await responseService.submitResponseAndUpdateSession({
        surveySessionId: currentSurvey.surveySessionId,
        questionVersionId: questions[currentQuestion].id,
        value: answer as Record<string, any>
      });

      // Update local state
      setCurrentQuestion(currentQuestion + 1);
      setAnswer(null);
      setIsValidAnswer(false);
    } catch (err) {
      console.error('Error handling next:', err);
      setError('Failed to save your answer. Please try again.');
    } finally {
      setIsSubmittingResponse(false);
      setIsUpdatingSession(false);
    }
  };

  const handlePrevious = async () => {
    if (isUpdatingSession) {
      console.log('Already updating session, skipping previous action');
      return;
    }

    if (!currentSurvey || currentQuestion <= 0) {
      console.log('Cannot go back: already at first question');
      return;
    }

    try {
      setIsUpdatingSession(true);
      setError(null);

      await surveySessionService.updateSession({
        id: currentSurvey.surveySessionId,
        question_number: currentQuestion - 1,
      });

      setCurrentQuestion(currentQuestion - 1);
    } catch (err) {
      console.error('Error handling previous:', err);
      setError('Failed to update session. Please try again.');
    } finally {
      setIsUpdatingSession(false);
    }
  };

  const handleSetCurrentSurvey = async (survey: SurveyVersionHydrated) => { 
    // Prevent multiple rapid calls
    if (isCreatingSession) {
      console.log('Already creating session, skipping...');
      return;
    }

    // If survey is not started, create a session
    if (survey.sessionStatus === SurveyStatus.not_started) {
      try {
        setIsCreatingSession(true);
        setError(null);
        
        console.log('Creating new survey session for:', survey.name);
        const surveySession = await surveySessionService.createSession({
          surveyVersionId: survey.id,
        });
        
        console.log('Survey session created successfully for:', survey.name);
        
        // Refresh surveys to get updated status
        await refreshSurveys();
        
        // Update local state
        setCurrentSurvey({...surveySession.surveyVersion, surveySessionId: surveySession.id, sessionStatus: surveySession.status, question_number: surveySession.question_number});
        setCurrentQuestion(surveySession.question_number);
      } catch (err) {
        console.error('Failed to create survey session:', err);
        setError('Failed to start survey. Please try again.');
        // Still set the survey even if session creation fails
        setCurrentSurvey(survey);
        setCurrentQuestion(survey.question_number);
      } finally {
        setIsCreatingSession(false);
      }
    } else {
      console.log('Setting current survey without creating session:', survey.name);
      console.log('survey', survey);
      console.log('questions', questions);
      setCurrentSurvey(survey);
      setCurrentQuestion(survey.question_number);
    }
  };

  // Clear error when user starts a new action
  const clearError = () => setError(null);

  // Calculate progress percentage
  const progressPercentage = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex">
        <Sidebar 
          surveys={surveys} 
          setCurrentSurvey={handleSetCurrentSurvey}
          isLoading={isLoading}
        />
        
        <div className="flex-1 p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {currentSurvey ? currentSurvey.name : 'Select a Survey'}
            </h1>
            {currentSurvey && (
              <p className="text-gray-600 text-lg">
                {currentSurvey.description}
              </p>
            )}
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="text-red-800">{error}</span>
                </div>
                <button 
                  onClick={clearError}
                  className="text-red-400 hover:text-red-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-blue-800">Loading surveys...</span>
              </div>
            </div>
          )}

          {/* Main Content */}
          {currentSurvey && currentSurvey.sessionStatus === SurveyStatus.completed ? (
            <ReviewSurveySession surveySessionId={currentSurvey.surveySessionId} />
          ) : currentSurvey && questions && questions.length > 0 && currentQuestion < questions.length ? (
              <div className="max-w-4xl mx-auto">
                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Question {currentQuestion + 1} of {questions.length}
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      {Math.round(progressPercentage)}% Complete
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>
  
                {/* Question Card */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                  <Question 
                    key={currentQuestion}
                    question={questions[currentQuestion]} 
                    setAnswer={setAnswer} 
                    setIsValidAnswer={setIsValidAnswer}
                  />
                </div>
  
                {/* Navigation */}
                <div className="flex justify-between items-center">
                  <Button 
                    onClick={handlePrevious}
                    disabled={isUpdatingSession || currentQuestion === 0}
                    variant="outline"
                    className="px-8 py-3 text-lg font-medium"
                  >
                    {isUpdatingSession ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Updating...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Previous
                      </>
                    )}
                  </Button>
  
                  {isLastQuestion ? (
                    <Button 
                      disabled={isSubmittingResponse || !isValidAnswer}
                      onClick={handleSubmit}
                      className="px-8 py-3 text-lg font-medium bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                    >
                      {isSubmittingResponse ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Submit Survey
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleNext}
                      disabled={isSubmittingResponse || isUpdatingSession || !isValidAnswer}
                      className="px-8 py-3 text-lg font-medium bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                    >
                      {isSubmittingResponse ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving...
                        </>
                      ) : (
                        <>
                          Next
                          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              /* Welcome State */
              <div className="max-w-2xl mx-auto text-center">
                <div className="bg-white rounded-xl shadow-lg p-12">
                  <div className="mb-6">
                    <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Welcome to Waterlily Surveys
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Select a survey from the sidebar to get started. Your responses help us improve our services and better understand your needs.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">Easy to use</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">Secure</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">Quick</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};