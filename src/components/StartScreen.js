import "./StartScreen.css";

const StartScreen = ({startGame}) => {
  return (
    <div className="StartScreen">
        <h1>Secret Word</h1>
        <p>Clique abaixo para começar a jogar!</p>
        <button onClick={startGame}>Começar</button>
    </div>
  )
}

export default StartScreen