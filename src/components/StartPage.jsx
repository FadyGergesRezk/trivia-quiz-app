export default function StartPage(props) {
  return (
    <div className="start-page-container">
      <h1>Quizzical</h1>
      <button onClick={props.startQuiz}>Start Quiz</button>
    </div>
  );
}
