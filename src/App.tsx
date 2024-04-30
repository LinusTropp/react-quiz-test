import { useState } from 'react'
import Result from './components/Result'
import Game from './components/Game'
import Welcome from './components/Welcome'
import ApiQuiz from './components/ApiQuiz'
import './App.css'


enum Screen {

	WELCOME = 'welcome',
	GAME = 'game',
	RESULT = 'result',
	API_QUIZ = 'apiQuiz'
}


function App() {
  
	const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.WELCOME);
	const [score, setScore] = useState<number>(0);

	let content : React.ReactElement | null = null

	const restartQuiz = () => {
		setScore(0);
		setCurrentScreen(Screen.WELCOME);
	}

	const startApiQuiz = () => {
		setCurrentScreen(Screen.API_QUIZ);
	};

	switch ( currentScreen ) {
		case Screen.WELCOME:
			content = <Welcome nextScreen={ () => setCurrentScreen(Screen.GAME)  } startApiQuiz={startApiQuiz}/>
			break;
		case Screen.GAME:
			content = <Game showResult={() => setCurrentScreen(Screen.RESULT)} answeredCorrectly={() => setScore(score + 1)}/>
			break;
		case Screen.RESULT:
			content = <Result restartQuiz={restartQuiz} score={score}/>
			break;
		case Screen.API_QUIZ:
			content=<ApiQuiz restartQuiz={restartQuiz}/>;
			break;
		default:
			content = null;

	}

  return (
    <>

	{content}
	
    </>
  )
}

export default App
