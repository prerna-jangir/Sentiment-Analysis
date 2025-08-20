import React, { useState } from 'react'

export default function Quiz({ onFinish }) {
  const questions = [
    { text: "I love ice cream!", answer: "Happy" },
    { text: "I lost my toy...", answer: "Sad" },
    { text: "The book is on the table.", answer: "Neutral" },
  ]

  const [step, setStep] = useState(0)
  const [score, setScore] = useState(0)

  const checkAnswer = (choice) => {
    if (choice === questions[step].answer) {
      setScore(score + 1)
      alert("✅ Correct!")
    } else {
      alert("❌ Oops, try again!")
    }

    if (step + 1 < questions.length) {
      setStep(step + 1)
    } else {
      onFinish()
    }
  }

  return (
    <div>
      <h2>Question {step + 1}</h2>
      <p>{questions[step].text}</p>
      <button onClick={() => checkAnswer("Happy")}>😊 Happy</button>
      <button onClick={() => checkAnswer("Sad")}>😢 Sad</button>
      <button onClick={() => checkAnswer("Neutral")}>😐 Neutral</button>
    </div>
  )
}
