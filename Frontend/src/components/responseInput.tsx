/* this is a component that will depepnd on the type of question and will return the appropriate input field */

interface ResponseInputProps {
  type: string;
  setAnswer: (answers: any) => void;
  setIsValidAnswer: (isValid: boolean) => void;
}

export const ResponseInput = ({ type, setAnswer, setIsValidAnswer }: ResponseInputProps) => {
  const handleInputChange = (value: string) => {
    setAnswer({ value });
    // Basic validation - consider answer valid if it's not empty
    setIsValidAnswer(value.trim().length > 0);
  };

  const getInputIcon = () => {
    switch (type) {
      case "text":
        return (
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
        );
      case "number":
        return (
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      case "date":
        return (
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
        );
    }
  };

  const getPlaceholder = () => {
    switch (type) {
      case "text":
        return "Type your answer here...";
      case "number":
        return "Enter a number...";
      case "date":
        return "Select a date...";
      default:
        return "Enter your answer...";
    }
  };

  const baseInputClasses = "w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500";

  switch (type) {
    case "text":
      return (
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {getInputIcon()}
          </div>
          <input 
            type="text" 
            onChange={(e) => handleInputChange(e.target.value)} 
            placeholder={getPlaceholder()}
            className={baseInputClasses}
          />
        </div>
      );
    case "number":
      return (
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {getInputIcon()}
          </div>
          <input 
            type="number" 
            onChange={(e) => handleInputChange(e.target.value)} 
            placeholder={getPlaceholder()}
            className={baseInputClasses}
          />
        </div>
      );
    case "date":
      return (
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {getInputIcon()}
          </div>
          <input 
            type="date" 
            onChange={(e) => handleInputChange(e.target.value)} 
            className={baseInputClasses}
          />
        </div>
      );
    default:
      return (
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {getInputIcon()}
          </div>
          <input 
            type="text" 
            onChange={(e) => handleInputChange(e.target.value)} 
            placeholder={getPlaceholder()}
            className={baseInputClasses}
          />
        </div>
      );
  }
};