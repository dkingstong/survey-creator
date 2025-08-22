/* this component is a sidebar that will contain different surveys */

import { Button } from "./ui/button";
import { SurveyVersionHydrated } from "@/lib/services/surveys";

interface SidebarProps {
  surveys: SurveyVersionHydrated[];
  setCurrentSurvey: (survey: SurveyVersionHydrated) => Promise<void>;
  isLoading?: boolean;
}

export const Sidebar = ({ surveys, setCurrentSurvey, isLoading = false }: SidebarProps) => {
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "not_started":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <div className="w-2 h-2 bg-gray-400 rounded-full mr-1.5"></div>
            Not Started
          </span>
        );
      case "in_progress":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <div className="w-2 h-2 bg-blue-400 rounded-full mr-1.5 animate-pulse"></div>
            In Progress
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-1.5"></div>
            Completed
          </span>
        );
      default:
        return null;
    }
  };

  const getButtonText = (survey: SurveyVersionHydrated) => {
    if (survey.status === "not_started") {
      return "Start Survey";
    }
    return "Continue Survey";
  };

  const getButtonVariant = (survey: SurveyVersionHydrated) => {
    if (survey.status === "not_started") {
      return "default";
    }
    return "outline";
  };

  const handleSurveyClick = async (survey: SurveyVersionHydrated) => {
    if (isLoading) {
      console.log('Loading in progress, skipping survey selection');
      return;
    }
    await setCurrentSurvey(survey);
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 shadow-sm flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Surveys</h1>
            <p className="text-sm text-gray-600">{surveys.length} available</p>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex-shrink-0 p-4 border-b border-gray-200">
          <div className="flex items-center justify-center py-4">
            <div className="flex items-center space-x-2">
              <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-sm text-gray-600">Loading surveys...</span>
            </div>
          </div>
        </div>
      )}

      {/* Surveys List */}
      <div className="flex-1 p-4 space-y-3">
        {surveys.map((survey) => (
          <div 
            key={survey.id} 
            className={`group relative bg-white border border-gray-200 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md hover:border-blue-300 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-50'
            }`}
            onClick={() => handleSurveyClick(survey)}
          >
            {/* Status Badge */}
            <div className="flex justify-between items-start mb-3">
              {getStatusBadge(survey.status)}
              {survey.question_number > 0 && (
                <span className="text-xs text-gray-500">
                  Q{survey.question_number}
                </span>
              )}
            </div>

            {/* Survey Title */}
            <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              {survey.name}
            </h3>

            {/* Survey Description */}
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {survey.description}
            </p>

            {/* Action Button */}
            <Button 
              onClick={(e) => {
                e.stopPropagation();
                handleSurveyClick(survey);
              }} 
              variant={getButtonVariant(survey) as any}
              size="sm"
              className="w-full"
              disabled={isLoading}
            >
              {getButtonText(survey)}
            </Button>

            {/* Hover Effect */}
            <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-blue-300 transition-colors pointer-events-none"></div>
          </div>
        ))}

        {/* Empty State */}
        {surveys.length === 0 && !isLoading && (
          <div className="text-center py-8">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No surveys available</h3>
            <p className="mt-1 text-sm text-gray-500">Check back later for new surveys.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-center">
          <p className="text-xs text-gray-500">
            Waterlily Survey Platform
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Your feedback matters
          </p>
        </div>
      </div>
    </div>
  );
};