import React, { useEffect, useState } from "react";
import SubmitComponent from "./SubmitComponent";
export default function Quiz() {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [count, setCount] = useState(0);
  const [reload, setReload] = useState("none");
  const [answer, setAnswer] = useState([]);
  const [timeOut, setTimeOutId] = useState(null);
  const[buttonDisable,setButtonDisable]=useState(false)
  const questions = [
    {
      question: "What is the capital of France?",
      option1: "Berlin",
      option2: "London",
      option3: "Paris",
      option4: "Rome",
      correctAnswer: "Paris",
    },
    {
      question: "Which planet is known as the Red Planet?",
      option1: "Venus",
      option2: "Mars",
      option3: "Jupiter",
      option4: "Saturn",
      correctAnswer: "Mars",
    },
    {
      question: "Who wrote the play 'Romeo and Juliet'?",
      option1: "William Shakespeare",
      option2: "Mark Twain",
      option3: "Charles Dickens",
      option4: "Jane Austen",
      correctAnswer: "William Shakespeare",
    },
    {
      question: "What is the largest mammal?",
      option1: "Elephant",
      option2: "Blue Whale",
      option3: "Giraffe",
      option4: "Hippopotamus",
      correctAnswer: "Blue Whale",
    },
  ];

  const nextClick = () => {
    if (timeOut) {
      clearTimeout(timeOut);
    }
    setQuestionNumber(questionNumber + 1);
    setCount(0);
  };
  const handleRadioClick = (e) => {
    const selectedOption = e.target.value;
    const updatedAnswer = [...answer];
    updatedAnswer[questionNumber] = selectedOption;
    setAnswer(updatedAnswer);
  };
  useEffect(() => {
    console.warn(answer);
    if (questionNumber < questions) {
      if (answer[questionNumber] === questions[questionNumber].correctAnswer) {
        setScore((prev) => prev + 1);
      }
    }
  }, [questionNumber]);

  useEffect(() => {
    if (timeOut) {
      clearTimeout(timeOut);
    }
    const timeoutId = setTimeout(() => {
      setCount(count + 1);
    }, 1000);
    setTimeOutId(timeoutId);
  }, [count, questionNumber]);

  useEffect(() => {
    if (count === 10) {
      setQuestionNumber(questionNumber + 1);
      setCount(0);
    }
  }, [count]);

  
  if (questionNumber === questions.length) {
    clearTimeout(timeOut);

    const submitFunction = () => {
      for (let i = 0; i < answer.length; i++) {
        if (questions[i].correctAnswer === answer[i]) {
          setScore((prev) => prev + 1);
        }
      }
      setReload("block");
      setButtonDisable(true)
    };
    return (
      <>
        <SubmitComponent reload={reload} score={score} disable={buttonDisable} questions={questions} submitFunction={submitFunction}/>
      </>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-600">
      <div className="p-8 bg-white rounded shadow-lg">
        <h2 className="text-gray-700 font-bold mb-4 text-center">
          Question {questionNumber + 1}: {questions[questionNumber].question}
        </h2>
        {Object.keys(questions[questionNumber])
          .slice(1, 5)
          .map((optionKey) => (
            <label
              key={optionKey}
              className="flex items-center mb-2 cursor-pointer"
            >
              <input
                type="radio"
                checked={answer[questionNumber] === questions[questionNumber][optionKey]}
                name="question"
                value={questions[questionNumber][optionKey]}
                onClick={handleRadioClick}
              />
              <span className="ml-2 text-gray-700">
                {questions[questionNumber][optionKey]}
              </span>
            </label>
          ))}
        <div className="flex justify-center mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={nextClick}
          >
            Next
          </button>
        </div>
      </div>
      <div className="absolute top-2  bg-white text-gray-700 p-2 rounded-md">
        Time: {10-count}/10sec
      </div>
    </div>
  );
}
