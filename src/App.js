import React from 'react';
import './App.css';
import Die from './Die';
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'

function App() {
  const [count, setCount] = React.useState(1)
  const [diez, setDiez] = React.useState(allNewDiez())
  const [tenzies, setTenzies] = React.useState(false)

  // for use both these states synchonously should use useEffect
  React.useEffect(() => {
    // console.log("Dice state changed")
    const isAllHeld = diez.every(die => die.isHeld)
    const firstVal = diez[0].value
    const isAllSame = diez.every(die => die.value === firstVal)
    if (isAllHeld && isAllSame) {
      setTenzies(true)
      console.log("You Won")
    }
  }, [diez])

  function generateNewDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDiez() {
    const newDiez = []
    //generate 10 dices
    for (var i = 0; i < 10; i++) {
      // newDiez.push(Math.floor(Math.random()*7))
      newDiez.push(generateNewDice())
    }
    return newDiez
  }
  console.log(allNewDiez())

  function rollDiez() {
    // setDiez(allNewDiez())
    //if not yet won
    if (tenzies === false) {
      // count increase every time roll button clicked
      setCount(count => count+1)
      setDiez(oldDiez => oldDiez.map(die => {
        return die.isHeld ?
          die : generateNewDice()
      }))
    } else { // if have won (tenzies === true)
      setTenzies(false) // change tenzies state to false again when the button clicked
      setCount(1) // set count to 1 whenever new gan]me asked for
      setDiez(allNewDiez()) //create new game(begin method)
    }
  }

  //changing hold property whenever hold on that dice
  function holdDize(id) {
    // console.log(id)
    setDiez(oldDiez => oldDiez.map((die) => {
      return die.id === id ?
        { ...die, isHeld: !die.isHeld } :
        die
    }))
  }

  const diezElements = diez.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDize(die.id)}
    />
  ))
  //above die.value is value property of each die that accessing through map func


  return (
    <main>
      {tenzies && <Confetti />}   {/* this is also conditional rendering way */}
      <h1 className='title'>Tenzies</h1>
      <p className='instructions'> Roll untill all dice are same.
        Click each die to freez it as its current value between rolls.</p>
      <div className='die-container'>
        {diezElements}
      </div>

      <button className="roll-diez"
        onClick={rollDiez}
      >
        {tenzies ? "New Game" : "Roll"}
      </button>
      <h5>No of rolls : {count}</h5>
      {tenzies ? <h1>You Won !!!</h1> : ""}
    </main>
  );
}

export default App;
