export default function QuizPage(props) {
  function classNameSetter(choice, index) {
    if (props.questions[index].correctAnswer === choice)
      return "answer-choice-label correct";
    else if (props.currentAnswers[index].currentAnswer === choice)
      return "answer-choice-label wrong";
    else return "answer-choice-label";
  }

  const questionArray = props.questions.map((question, index) => {
    const inputArray = question.choices.map((choice) => {
      return (
        <>
          <input
            className="question-choice"
            type="radio"
            id={choice}
            name={`question-${question.id}`}
            value={choice}
            checked={props.currentAnswers[index].currentAnswer === choice}
            onChange={() => props.handleChange(event, question.id)}
          />
          <label className="question-choice-label" htmlFor={choice}>
            {choice}
          </label>
        </>
      );
    });
    return (
      <div className="questions-container" key={question.id}>
        <h2>{question.question}</h2>
        {inputArray}
        <hr></hr>
      </div>
    );
  });

  const answersArray = props.questions.map((question, index) => {
    const inputArray = question.choices.map((choice) => {
      return (
        <>
          <input
            className="answer-choice"
            type="radio"
            id={choice}
            name={`question-${question.id}`}
            value={choice}
            checked={props.currentAnswers[index].currentAnswer === choice}
            onChange={() => props.handleChange(event, question.id)}
            disabled
          />
          <label className={classNameSetter(choice, index)} htmlFor={choice}>
            {choice}
          </label>
        </>
      );
    });
    return (
      <div className="questions-container" key={question.id}>
        <h2>
          {question.question}

          {props.currentAnswers[index].currentAnswer === "" && (
            <span> (Not Answered)</span>
          )}
        </h2>
        {inputArray}
        <hr></hr>
      </div>
    );
  });

  return (
    <form
      className="form-container"
      onSubmit={
        props.quizStatus === "started"
          ? (event) => props.submitAnswers(event)
          : (event) => props.endQuiz(event)
      }
    >
      {props.quizStatus === "started" && questionArray}
      {props.quizStatus === "finished" && answersArray}
      <div className="button-area">
        {props.quizStatus === "finished" && (
          <h1>
            You scored {props.score}/{props.questions.length} correct answers
          </h1>
        )}
        <button>
          {props.quizStatus === "started" ? "Check Answers" : "Play Again"}
        </button>
      </div>
    </form>
  );
}
