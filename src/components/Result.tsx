

type ResultProps = {
	score : number;
	restartQuiz : () => void;
	
}

const Result = (props : ResultProps) => {
	return (
		<section>
			<h2>Result</h2>
			<p>Du fick {props.score} rätt!</p>
			<button onClick={props.restartQuiz}>Börja om</button>
		</section>
	)
}

export default Result;