import "./GameOver.css"

const GameOver = ({restart, score, pickedWords}) => {
  return (
    <div>
        <h1>Fim de jogo!</h1>
        <h2>A sua pontuação foi: <span>{score}</span></h2>
        <h2>A palavra errada foi: <span>{pickedWords}</span></h2>
        <button onClick={restart}>Reiniciar Jogo</button>
    </div>
  )
}

export default GameOver