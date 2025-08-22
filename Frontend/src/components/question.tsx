/*
  this is a container for a question
  it will have a title, a description and input field,
  it will also leverage predefined constraints for a question and answer,

*/

import { ResponseInput } from "./responseInput";

interface QuestionProps {
  question: any;
  setAnswer: (answers: any) => void;
  setIsValidAnswer: (isValid: boolean) => void;
}

export const Question = ({ question, setAnswer, setIsValidAnswer }: QuestionProps) => {
  return (
    <div className="space-y-6">
      {/* Question Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          {question.title}
        </h2>
        {question.description && (
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {question.description}
          </p>
        )}
      </div>

      {/* Question Input */}
      <div className="max-w-md mx-auto">
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Your Answer
          </label>
          <ResponseInput 
            type={question.type} 
            setAnswer={setAnswer} 
            setIsValidAnswer={setIsValidAnswer}
          />
        </div>
      </div>

      {/* Question Type Indicator */}
      <div className="text-center">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
          {question.type.charAt(0).toUpperCase() + question.type.slice(1)} Question
        </span>
      </div>
    </div>
  );
};