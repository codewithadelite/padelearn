import { AlertCircle } from "lucide-react";

interface ErrorProps {
  title?: string;
  message?: string;
}

const ErrorDisplayer: React.FC<ErrorProps> = ({
  title = "An error occurred",
  message = "Something went wrong. Please try again later.",
}) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 rounded-lg border border-red-500 bg-red-50 p-4 text-center shadow-md">
      <div className="text-red-500">
        <AlertCircle size={48} />
      </div>
      <h2 className="text-lg font-semibold text-red-600">{title}</h2>
      <p className="text-sm text-red-700">{message}</p>
    </div>
  );
};

export default ErrorDisplayer;
