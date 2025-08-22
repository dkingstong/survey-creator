import { useEffect, useState } from "react";
import { Response, responseService } from "../lib/services/response";

// review survey session

interface ReviewSurveySessionProps {
  surveySessionId: string;
}

export const ReviewSurveySession = ({ surveySessionId }: ReviewSurveySessionProps) => {
  const [responses, setResponses] = useState<Response[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getResponses = async () => {
      setIsLoading(true);
      try {
        const responses = await responseService.getResponsesBySurveySession(surveySessionId);
        setResponses(responses);
      } catch (error) {
        console.error('Error fetching responses:', error);
        setError('Error fetching responses. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
    getResponses();
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex">
        {error && (
          <div className="flex items-center justify-center h-screen">
            <div className="text-red-500">{error}</div>
          </div>
        )}
        {isLoading ? (
          <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <div className="flex-1 p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Review Survey Session
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {responses.map((response) => (
                <div key={response.id} className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {response.questionVersion.title}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {response.questionVersion.description}
                  </p>
                  <p className="text-gray-600 mb-4">
                    Response: {response.value.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};