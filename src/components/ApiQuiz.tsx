import { useState, useEffect } from "react";
import he from "he";

interface Question {
  question: string;
  answer: string[];
  correct: number;
}

type ResultProps = {
	
	restartQuiz : () => void;
	
}

const ApiQuiz = (props : ResultProps) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  useEffect(() => {
    fetchQuestionsFromAPI();
  }, []);

  const fetchQuestionsFromAPI = async () => {
	try {
	  const response = await fetch("https://opentdb.com/api.php?amount=5&category=15");
	  const data = await response.json();
	  // Check if the response contains results
	  if (data.results && data.results.length > 0) {
		// Map the API response to match the Question interface
		const formattedQuestions: Question[] = data.results.map((result: any) => {
		  // Decode the question and each answer using he.decode
		  const decodedQuestion = he.decode(result.question);
		  const decodedAnswers = result.incorrect_answers.map((answer: string) => he.decode(answer));
		  const decodedCorrectAnswer = he.decode(result.correct_answer);
		  
		  return {
			question: decodedQuestion,
			answer: [...decodedAnswers, decodedCorrectAnswer],
			// Calculate the index of correct answer
			correct: decodedAnswers.length,
		  };
		});
		setQuestions(formattedQuestions);
	  } else {
		console.error("No questions found in the API response.");
	  }
	} catch (error) {
	  console.error("Error fetching questions:", error);
	}
  };

  const handleDecided = () => {
    if (selectedAnswer === questions[currentQuestion].correct) {
      // Update score if answer is correct
      setScore(score + 1);
    }
    if (currentQuestion < questions.length - 1) {
      // Move to the next question
      setCurrentQuestion(currentQuestion + 1);
      // Reset selected answer
      setSelectedAnswer(null);
    } else {
      // Quiz completed
      setQuizCompleted(true);
    }
  };

  const renderOptions = () => {
    const question = questions[currentQuestion];
	if (!question) {
		return null;
	}
    return question.answer.map((answer, index) => (
      <p key={index}>
        <label>
          <input
            type="radio"
            name="answers"
            value={answer}
            checked={index === selectedAnswer}
            onChange={() => setSelectedAnswer(index)}
          />
          {answer}
        </label>
      </p>
    ));
  };

  if (quizCompleted) {
    // Render quiz completion message
    return (
      <section>
        <h3>Quiz completed!</h3>
        <p>Your score: {score}</p>
		<button onClick={props.restartQuiz}>STarta om</button>
      </section>
    );
  }

  return (
    <section>
      <h3>{questions[currentQuestion]?.question}</h3>
      {renderOptions()}
      <button onClick={handleDecided}>Next</button>
    </section>
  );
};





export default ApiQuiz;
