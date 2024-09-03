import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import StartPage from "./components/StartPage.jsx";
import QuizPage from "./components/QuizPage.jsx";
import AnswerPage from "./components/AnswerPage.jsx";
import "./App.css";

export default function App() {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentAnswers, setCurrentAnswers] = useState([]);
  const [quizStatus, setQuizStates] = useState("notStarted");
  const [score, SetScore] = useState(0);

  useEffect(() => {
    if (quizStatus === "notStarted") {
      fetch("https://opentdb.com/api.php?amount=5&type=multiple")
        .then((response) => response.json())
        .then((response) => {
          const questions = response.results.map((resQuestion) => {
            let choicesArr = [...resQuestion.incorrect_answers];
            choicesArr.push(resQuestion.correct_answer);
            choicesArr = shuffleArray(choicesArr);
            return {
              id: nanoid(),
              question: decodeHtml(resQuestion.question),
              choices: choicesArr.map((choice) => decodeHtml(choice)),
              correctAnswer: decodeHtml(resQuestion.correct_answer),
            };
          });

          setQuizQuestions(questions);

          setCurrentAnswers(
            questions.map((question) => ({
              id: question.id,
              currentAnswer: "",
            }))
          );
        })
        .catch((error) =>
          console.error("Error fetching quiz questions:", error)
        );
    }
  }, [quizStatus]);

  function shuffleArray(array) {
    array.forEach((_, i) => {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    });
    return array;
  }

  function decodeHtml(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  function startTheQuiz() {
    setQuizStates("started");
  }

  function handleChange(event, id) {
    const { name, value } = event.target;
    setCurrentAnswers((prevAnswers) =>
      prevAnswers.map((answer) =>
        answer.id === id ? { ...answer, currentAnswer: value } : answer
      )
    );
  }

  function submitAnswers(event) {
    event.preventDefault();
    setQuizStates("finished");
    let finalScore = 0;
    quizQuestions.map((quesion, index) => {
      console.log(quesion.correctAnswer);
      console.log(quesion.correctAnswer);
      quesion.correctAnswer === currentAnswers[index].currentAnswer
        ? finalScore++
        : "";
    });
    SetScore(finalScore);
  }
  function endQuiz(event) {
    event.preventDefault();
    SetScore(0);
    setQuizStates("notStarted");
  }

  return (
    <main>
      {quizStatus === "notStarted" && (
        <StartPage startQuiz={() => startTheQuiz()} />
      )}
      {(quizStatus === "started" || quizStatus === "finished") && (
        <QuizPage
          questions={quizQuestions}
          currentAnswers={currentAnswers}
          handleChange={handleChange}
          submitAnswers={submitAnswers}
          endQuiz={endQuiz}
          quizStatus={quizStatus}
          score={score}
        />
      )}
      {/* {quizStatus === "finished" && <AnswerPage />} */}
    </main>
  );
}
