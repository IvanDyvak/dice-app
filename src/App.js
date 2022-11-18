import './App.css';
import React, {useState, useEffect} from "react";



function App() {
    const [ activePlayer, setActivePlayer ] = useState(1);
    const [ diceImageSource, setDiceImageSource ] = useState(`images/dice-question.png`);
    const [ scorePlayer1, setScorePlayer1 ] = useState(0);
    const [ scorePlayer2, setScorePlayer2 ] = useState(0);
    const [ diceArray1, setDiceArray1 ] = useState([]);
    const [ diceArray2, setDiceArray2 ] = useState([]);
    const [ showDice, setShowDice ] = useState(true);
    const [ winner, setWinner ] = useState(false);
    const [ winnerText, setWinnerText ] = useState('');

    function addPoints(array){
        const updatedSum = array.reduce((sum, current) =>{
            return sum + current;
        }, 0);
        return updatedSum;
    }
    function resetGame(){
        setScorePlayer1(0);
        setDiceArray1([]);
        setScorePlayer2(0);
        setDiceArray2([]);
        setDiceImageSource(`images/dice-question.png`);
        setWinner(false);
        setWinnerText('');
        setActivePlayer(1);
    }

    useEffect(() => {
        setScorePlayer1(addPoints(diceArray1));
        setScorePlayer2(addPoints(diceArray2));

        if(diceArray2.length === 3){
            if(scorePlayer1 > scorePlayer2){
                setWinnerText('The winner is Player 1');
            } else if(scorePlayer1 < scorePlayer2){
                setWinnerText('The winner is Player 2');
            }else if (scorePlayer1 === scorePlayer2){
                setWinnerText('This is a draw. Try again');
            }
            setWinner(true);

            setTimeout(() => {
                resetGame();
            }, 3500);
        }
        }, [diceArray1, diceArray2, winner]);


    const rollDice = () =>{
        setShowDice(false);

        setTimeout(() => {
            const diceNumber = Math.trunc(Math.random() * 6) + 1;
            activePlayer === 1 ? setDiceArray1([...diceArray1, diceNumber]) : setDiceArray2([...diceArray2, diceNumber]);
            setDiceImageSource(`images/dice-${diceNumber}.png`);
            setShowDice(true);
            activePlayer === 1  ? setActivePlayer(2) : setActivePlayer(1);
        }, 2000);
    }

    const newGame = () =>{
        resetGame();
    }

    const styles = {
        width: '120px',
        };

  return (
    <div className="App">
      <header className="App-header">
        <img src='images/logo.png' className="App-logo" alt="logo" />
      </header>
        <p className="rules">The players rolls the dice three times each. The winner is defined based on the score.</p>
        <div className="players-block-wrap">
            <div className="players-block">
                <div className={`player ${activePlayer === 1 ? 'active-player' : ''}` }>
                    <h4 className="name">Player 1</h4>
                    <h4 className="score-line">Score: {scorePlayer1}</h4>
                </div>
                <div className={`player ${activePlayer === 1 ? '' : 'active-player'}` }>
                    <h4 className="name">Player 2</h4>
                    <h4 className="score-line">Score: {scorePlayer2}</h4>
                </div>
            </div>
            <div className="player-block__img">
                { showDice ?
                    <img src={diceImageSource} className="dice-image" style={styles}  alt="dice facet" /> :
                    <img src='images/dice-gif.gif' className="dice-gif" width="180" alt="gif image" />
                }
            </div>
            <button className="reset-btn" onClick={newGame}>New Game</button>
            {winner &&
                <h2 className="winner-name">{winnerText}</h2>
            }
            <div className="btn-block">
                <button className="roll-btn" onClick={rollDice}>Roll Dice!</button>
            </div>
        </div>

    </div>
  );
}

export default App;
