import React from "react";
import Link from "next/link";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

interface IProps {
  score: string | null;
  result: "success" | "fail";
}

const Score = ({ score, result }: IProps) => {
  const { width, height } = useWindowSize();

  return (
    <div className="flex justify-center items-center flex-col gap-8 p-8 w-full h-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-2xl">
      {/* Confetti for Success */}
      {result === "success" && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={250}
          gravity={0.3}
          wind={0.02}
        />
      )}

      {/* Header Section */}
      <div className="text-center">
        {result === "success" ? (
          <>
            <h1 className="text-5xl font-bold text-white mb-2">
              🎉 Congratulations! 🎉
            </h1>
            <p className="text-lg text-gray-200">
              You've successfully completed the quiz!
            </p>
          </>
        ) : (
          <>
            <h1 className="text-5xl font-bold text-white mb-2">
              😞 Better Luck Next Time! 😞
            </h1>
            <p className="text-lg text-gray-200">
              Don’t worry, keep trying and you'll get it!
            </p>
          </>
        )}
      </div>

      {/* Score Display Section */}
      <div className="flex flex-col items-center gap-6 bg-white p-6 rounded-lg shadow-lg w-80">
        <span
          className={`text-6xl font-extrabold ${
            result === "success" ? "text-green-500" : "text-red-500"
          }`}
        >
          {score}
        </span>
        {result === "success" ? (
          <span className="text-4xl">🏆</span>
        ) : (
          <span className="text-4xl">💪</span>
        )}
        <p className="text-gray-700 font-medium text-center">
          {result === "success"
            ? "Your hard work paid off! Keep going to achieve more."
            : "Don't give up! Your next try will be even better!"}
        </p>
      </div>

      {/* Button Section */}
      <Link href="/quiz">
        <button className="px-6 py-3 bg-emerald-600 text-white rounded-3xl shadow hover:bg-emerald-700">
          Go to Quizes
        </button>
      </Link>
    </div>
  );
};

export default Score;
