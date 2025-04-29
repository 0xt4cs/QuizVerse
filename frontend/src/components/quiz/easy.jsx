import React, { useState, useEffect } from "react";
import axios from "axios";
import he from "he";
import Navigation from "../navigation/nav";
import FooterName from "../footer/footerName";
import Loading from "../ui/loading";
import Homebtn from "../ui/home";

const Easy = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/quiz/easy",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
          }
        );
        setQuestions(response.data.questions);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswer = (selectedAnswer) => {
    const correctAnswer = he.decode(questions[currentQuestion].correct_answer);

    if (selectedAnswer === correctAnswer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const saveScoreToBackend = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/scores",
        { score, difficulty: "easy" },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("Score saved successfully:", response.data);
    } catch (error) {
      console.error("Error saving score:", error.response?.data || error.message);
      alert("Failed to save score. Please try again.");
    }
  };

  useEffect(() => {
    if (showScore) {
      saveScoreToBackend();
    }
  }, [showScore]);

  if (loading) {
    return (
      <div className="h-screen w-screen grid place-content-center">
        <Loading />
      </div>
    );
  }

  if (showScore) {
    return (
      <div className="text-white h-screen w-screen">
        <Navigation />
        <div className="h-[calc(100%-110px)] w-full grid place-content-center">
          <div className="h-[50vh] w-[50vw] flex flex-col justify-evenly items-center bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-10 rounded-t-lg shadow-2xl">
            <div className="text-center">
              <h1 className="text-[60px] font-bold">Your Score</h1>
              <p className="text-[25px]">
                You scored {score} out of {questions.length}
              </p>
            </div>
            <div> 
              <Homebtn />
            </div>
          </div>
        </div>
        <div className="h-fit grid place-content-center">
          <FooterName />
        </div>
      </div>
    );
  }

  return (
    <div className="text-white h-screen w-screen">
      <Navigation />
      <div className="h-[92.5%] w-full grid place-content-center animate-slideup">
        <div className="flex flex-col p-5 justify-between items-center h-fit w-[50vw] bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-10 rounded-t-lg shadow-2xl gap-10">
          <div className="text-center">
            <h1 className="text-[35px] font-bold mt-5 leading-10">General Knowledge</h1>
            <h2 className="text-[20px]">( Easy )</h2>
          </div>
          <div className="w-[80%] h-1/2 text-[24px] flex flex-col justify-between text-center">
            <p className="mb-5">{he.decode(questions[currentQuestion].question)}</p>
            <div className="w-full h-fit flex flex-col justify-evenly">
              <button
                className="bg-[#05082096] border-2 py-[5px] px-[30px] hover:bg-white hover:text-[#050820] rounded-lg my-2"
                onClick={() => handleAnswer("True")}
              >
                True
              </button>
              <button
                className="bg-[#05082096] border-2 py-[5px] px-[30px] hover:bg-white hover:text-[#050820] rounded-lg my-2"
                onClick={() => handleAnswer("False")}
              >
                False
              </button>
            </div>
          </div>
          <p>
            Question {currentQuestion + 1}/{questions.length}
          </p>
        </div>
        <div className="w-full h-[15px] rounded-b-lg bg-gradient-to-r from-cyan-500 to-blue-500"></div>
      </div>
    </div>
  );
};

export default Easy;
