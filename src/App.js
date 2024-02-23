//CSS
import './App.css';
//React
import { useCallback, useEffect, useState } from 'react';
//Data
import { wordsList } from './data/words';
//Componenetes
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  {id:1, name: "start"},
  {id:2, name: "game"},
  {id:3, name: "gameover"},
]

function App() {
  const [GameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  //criando states para as palavras 
  const [pickedWords, setPickedWords] = useState("")
  const [pickedCategory, setPickedCaterory] = useState("")
  const [letters, setLetters] = useState([])

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(5)
  const [score, setScore] = useState(0)

  const pickWordAndCategory = useCallback(() =>{
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
    console.log("A categoria sorteada é " + category)

    const word = words[category][Math.floor(Math.random() * words[category].length)]
    console.log("A palavra sorteada é " + word)

    return {word, category}
  },[words])
  
  //Start Game 
  const startGame = useCallback(() =>{
    //clear all letters 
    clearLetterStates()

    // pick word and category
    const {category, word} = pickWordAndCategory()
    console.log(category, word)

    // create array of letters
    let wordletters = word.toLowerCase().split("")
    console.log(wordletters)

    //fill sates 
    setPickedWords(word)
    setPickedCaterory(category)
    setLetters(wordletters)

    setGameStage(stages[1].name)
  },[pickWordAndCategory])

  //process the verify letter input
  const verifyLetter = (letter) =>{
    //console.log(letter)

    const normalizedLetter = letter.toLowerCase()
    //console.log(normalizedLetter)

    //check
    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)){
      return
    }

    //push guessed letter or remove a guess
    if(letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters)=>[
        ...actualGuessedLetters,
        normalizedLetter,
      ])
    }else{
      setWrongLetters((actualWrongLetters)=>[
        ...actualWrongLetters,
        normalizedLetter,
      ])
      setGuesses(guesses - 1)// verificar depois se está correto
    }
    
  }
  console.log("Letras já utilizadas: " + guessedLetters)
  console.log("Letras erradas: " + wrongLetters)

  const clearLetterStates = () =>{
    setGuessedLetters([])
    setWrongLetters([])
  }

  //check is guesses ended
  useEffect(() =>{
    if (guesses <= 0){
      alert("Fim de jogo")
      //reset all states
      clearLetterStates()

      setGameStage(stages[2].name)
    }
  },[guesses])

  //check win
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)]
    
    //win condition
    if(guessedLetters.length === uniqueLetters.length){
      //add score
      setScore((actualScore) => (actualScore += 100 ))
      //restart game with new word
      startGame()
    }
    

    

  },[guessedLetters, letters, startGame])

  //Restart game
  const restart = () =>{
    setScore(0)
    setGuesses(5)
    setGameStage(stages[0].name)
  }
  return (
    <div className="App">
      {GameStage === "start" && <StartScreen startGame={startGame}/>}
      {GameStage === "game" && <Game verifyLetter={verifyLetter} pickedWords={pickedWords} pickedCategory={pickedCategory} letters={letters} guessedLetters={guessedLetters} wrongLetters={wrongLetters} guesses={guesses} score={score}/>}
      {GameStage === "gameover" && <GameOver restart={restart} score={score} pickedWords={pickedWords}/>}
    </div>
  );
}

export default App;
