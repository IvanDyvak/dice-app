import './App.css';
import React, {useState, useEffect} from "react";


function App() {
    // const [ diceNumber, setDiceNumber ] = useState(0);
    const [ diceImageSource, setDiceImageSource ] = useState(`images/dice-question.png`);
    const [ score, setScore ] = useState(0);
    const [ diceArray, setDiceArray ] = useState([0]);
    const [ showDice, setShowDice ] = useState(true);



    useEffect(() => {

        const updatedSum = diceArray.reduce((sum, current) =>{
                return sum + current;
            }, 0);
        setScore(updatedSum);
        }, [diceArray]);


    const rollDice = () =>{
        setShowDice(false);

        setTimeout(() => {
            // setDiceNumber(Math.trunc(Math.random() * 6) + 1);
            const diceNumber = Math.trunc(Math.random() * 6) + 1;
            setDiceArray([...diceArray, diceNumber]);
            setDiceImageSource(`images/dice-${diceNumber}.png`);
            setShowDice(true);
        }, 3000);
    }

    const resetGame = () =>{
        setScore(0);
        setDiceArray([0]);
        setDiceImageSource(`images/dice-question.png`);
    }

  return (
    <div className="App">
      <header className="App-header">
        <img src='images/logo.png' className="App-logo" alt="logo" />
      </header>
        <button className="reset-btn" onClick={resetGame}>Reset</button>

        <h4 className="score-line">Score: {score}</h4>

        <div className="player-block">
            <div className="player-block__img">
                { showDice ?
                    <img src={diceImageSource} className="dice-image" alt="dice facet" /> :
                    <img src='images/dice-gif.gif' className="dice-gif" alt="gif image" />
                }
            </div>
            <button className="roll-btn" onClick={rollDice}>Roll Dice!</button>
        </div>

    </div>
  );
}

export default App;
