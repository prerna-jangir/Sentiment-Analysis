import React, { useState } from "react";
import { motion } from "framer-motion";

export default function App() {
  const [step, setStep] = useState(0);
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);

  const story = [
    {
      character: "😊 Sunny the Smiley",
      text: "Hi there! I'm Sunny. I feel happy when someone says nice things!"
    },
    {
      character: "😢 Sammy the Tear",
      text: "Hello… I’m Sammy. I feel sad when someone says mean things."
    },
    {
      character: "🤔 Our Task",
      text: "Can you help us figure out if a message is HAPPY or SAD? That's called Sentiment Analysis!"
    }
  ];

  const mcqs = [
    {
      question: "If someone says: 'You are awesome!', how would Sunny feel?",
      options: ["😊 Happy", "😢 Sad", "😐 Not sure"],
      answer: "😊 Happy"
    },
    {
      question: "If someone says: 'I hate this game', how would Sammy feel?",
      options: ["😊 Happy", "😢 Sad", "😐 Not sure"],
      answer: "😢 Sad"
    }
  ];

  const analyze = (text) => {
    const happyWords = ["happy", "great", "good", "love", "awesome", "fun"];
    const sadWords = ["sad", "bad", "hate", "angry", "upset", "cry"];
    let score = 0;
    happyWords.forEach((w) => {
      if (text.toLowerCase().includes(w)) score++;
    });
    sadWords.forEach((w) => {
      if (text.toLowerCase().includes(w)) score--;
    });
    if (score > 0) return "😊 Happy";
    if (score < 0) return "😢 Sad";
    return "😐 Not sure";
  };

  const restart = () => {
    setStep(0);
    setInput("");
    setResult(null);
    setScore(0);
  };

  const totalSteps = story.length + mcqs.length + 1;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-yellow-100 to-blue-100 p-6">
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center"
      >
        {step < story.length ? (
          <>
            <div className="text-6xl mb-4">{story[step].character.split(" ")[0]}</div>
            <h2 className="text-xl font-bold mb-2">{story[step].character}</h2>
            <p className="text-lg mb-6">{story[step].text}</p>
            <button
              onClick={() => setStep(step + 1)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl"
            >
              Next
            </button>
          </>
        ) : step < story.length + mcqs.length ? (
          <>
            <h2 className="text-xl font-bold mb-4">Quiz Time! 📝</h2>
            <p className="mb-4 text-lg">{mcqs[step - story.length].question}</p>
            <div className="flex flex-col gap-2">
              {mcqs[step - story.length].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (opt === mcqs[step - story.length].answer) {
                      setScore(score + 1);
                      alert("Correct! 🎉");
                    } else {
                      alert("Oops! Try again.");
                    }
                    setStep(step + 1);
                  }}
                  className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-xl"
                >
                  {opt}
                </button>
              ))}
            </div>
          </>
        ) : step === totalSteps - 1 ? (
          <>
            <h2 className="text-2xl font-bold mb-4">🎯 Your Turn!</h2>
            <p className="mb-4 text-lg">
              Type a short message and we’ll tell if it makes Sunny 😊 or Sammy 😢!
            </p>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full p-2 border rounded-lg mb-4"
              placeholder="Type something nice or mean..."
            />
            <button
              onClick={() => setResult(analyze(input))}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl"
            >
              Check
            </button>
            {result && (
              <div className="mt-6 text-3xl font-bold">{result}</div>
            )}
            <p className="mt-6 text-lg">You answered {score} MCQs correctly! 🎉</p>
            <button
              onClick={() => setStep(step + 1)}
              className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl"
            >
              Finish
            </button>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold mb-4">🌟 Great Job! 🌟</h2>
            <p className="text-lg mb-6">
              You’ve learned about Sentiment Analysis and helped Sunny & Sammy!
            </p>
            <p className="text-lg mb-6">Final Score: {score} / {mcqs.length}</p>
            <button
              onClick={restart}
              className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-xl"
            >
              Play Again
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
}
