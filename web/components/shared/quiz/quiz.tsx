import { Check, Clock } from "lucide-react";

import { IOption } from "@/models/questions";

interface QuizProps {
  question: string;
  options: IOption[];
  currentQuestion: number;
  totalQuestions: number;
  onAnswerSelect: (optionId: number) => void;
  handleAnswerSubmit: () => void;
  selectedAnswer: number | null;
}

const Quiz: React.FC<QuizProps> = ({
  question,
  options,
  currentQuestion,
  totalQuestions,
  onAnswerSelect,
  handleAnswerSubmit,
  selectedAnswer,
}) => {
  return (
    <div className="flex justify-center items-center flex-col lg:flex-row gap-8 lg:gap-20 p-6 w-full h-full">
      {/* Left Section - Question and Options */}
      <div className="w-full lg:w-2/3 space-y-6">
        {/* Question */}
        <h1 className="text-2xl font-bold">
          {question} (
          <span className="text-green-600">
            {currentQuestion}/{totalQuestions}
          </span>
          )
        </h1>

        {/* Options */}
        <div className="space-y-4">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => onAnswerSelect(option.id)}
              className={`flex items-center justify-between w-full p-4 border rounded-lg ${
                selectedAnswer === option.id
                  ? "border-green-600 bg-green-50"
                  : "border-gray-300"
              } transition-all`}
            >
              <div className="flex items-center gap-2">
                <span className="font-medium bg-gray-200 rounded-md w-8 h-8 flex items-center justify-center">
                  {option.label}
                </span>
                <span className="font-medium">{option.text}</span>
              </div>

              {selectedAnswer === option.id && (
                <Check className="text-green-600" size={20} />
              )}
            </button>
          ))}
        </div>

        {/* Submit Button */}
        <button
          className="w-full lg:w-1/3 px-4 py-4 bg-emerald-600 text-white rounded-3xl  shadow hover:bg-emerald-700"
          onClick={() => handleAnswerSubmit()}
        >
          {currentQuestion === totalQuestions ? "Submit Quiz" : "Submit Answer"}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
