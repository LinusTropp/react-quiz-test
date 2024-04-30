import { useState } from "react";

interface Question {
	question : string;
	answer : string[];
	correct : number;
}


type GameProps = {
	showResult: () => void;
	answeredCorrectly : () => void;
}

const Game = (props: GameProps ) => {
	const questions : Question[] = getQuestions();

	const [currentQuestion, setCurrentQuestion] = useState<number>(0);

	const [selectedAnswer, setSelectedAnswer] = useState<number | null >(null);

	const question = questions[currentQuestion];

	const options = question.answer.map(( answer, index ) => (
		<p key={index}>
			<label>
			<input type="radio" name="answers" onClick={()=> setSelectedAnswer(index)} />
			{answer}
			</label>
		</p>
	));

	const handleDecided = () => {
		if (selectedAnswer == question.correct ) {
			
			props.answeredCorrectly();

			
		}
		if (currentQuestion<questions.length - 1) {
			setCurrentQuestion(currentQuestion+1);

		} else {
			props.showResult();

		}

	}

	return (
		<section>
			<h3>{question.question}</h3>
			{options}
			<button onClick={handleDecided}>Answer</button>

		</section>
	)
}


const getQuestions = () : Question[] => {
	return [
		{
			question: 'När är julafton',
			answer: ['24 maj', '24 dec', '6 juni'],
			correct: 1
		},
		{
			question: 'Vad är bäst',
			answer: ['Javascript', 'Typescript', 'Peni'],
			correct: 1
		},
		{
			question: 'Who dis',
			answer: ['Linos', 'angos', 'juli'],
			correct: 0
		},
		{
			question: 'who you',
			answer: ['angos', 'debbi', 'daboo'],
			correct: 0
		}

	];


};



export default Game;