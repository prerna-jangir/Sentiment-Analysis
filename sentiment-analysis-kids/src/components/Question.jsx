import React from "react";

export default function Question({ question, options, onAnswer }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 mt-4">
      <h3 className="text-lg font-semibold">{question}</h3>
      <div className="mt-4 space-y-2">
        {options.map((opt, idx) => (
          <button
            key={idx}
            className="w-full bg-blue-200 hover:bg-blue-300 rounded-lg py-2 px-4"
            onClick={() => onAnswer(opt.correct)}
          >
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  );
}
