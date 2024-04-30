


type WelcomeProps = { 
	nextScreen: () => void;
	startApiQuiz: () => void;
 }

const Welcome = (props : WelcomeProps ) => {
	return (
		<section>
			<h2>Welcome till quizzen</h2>
			<p>Wanna begin?</p>
			<button onClick={props.nextScreen}>Start</button>
			<button onClick={props.startApiQuiz}>Svår af</button>
		</section>
	)
}

export default Welcome;