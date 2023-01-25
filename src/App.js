import React , {useState , useEffect} from "react";
import Die from "./Components/Die";
import nextId from "react-id-generator"
import Confetti from 'react-confetti'

export default function App() {

  const [dieRan, setDieRan] = useState(newDiceRan())
  const [tenzis , setTenzis] = useState(false)
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    const allHeld = dieRan.every(die => die.isHeld)
    const firstVal = dieRan[0].value
    const allVal = dieRan.every(die => die.value === firstVal)
     
    if (allHeld && allVal) {
      setTenzis(true)
      console.log("you win")
    }

  },[dieRan])

  function dieGen() {
    return {
      value: Math.ceil(Math.random()*6),
      isHeld: false,
      id: nextId()
    }
  }

    function newDiceRan(){
      const arrayDice= []
      for(let i=0; i<10 ;i++){
        arrayDice.push(dieGen())
      }
      return arrayDice
    } 

    function count() {
      setCounter(prevCount => prevCount +1)
    }
    function newRoll() {
      count()
      if(!tenzis) {
        setDieRan(prevDie => prevDie.map(die => {
          return die.isHeld ? 
          die : dieGen()
        }))
      } else {
        setTenzis(false)
        setDieRan(newDiceRan())
        setCounter(0)
      }
     
    }

    function holdedDice(id) {
      setDieRan(prevDie => prevDie.map(die => {
        return die.id === id ? 
        {...die, isHeld: !die.isHeld 
        } : die
      }))
        
    }
    const diceElements = dieRan.map(dieEl => {
       
      return <Die 
        value={dieEl.value} 
        className="dice"
        isHeld={dieEl.isHeld}
        holded={() => holdedDice(dieEl.id)}
      />
    }
        
      )

  return (
    <div className="conteiner">
      
      {tenzis? <Confetti /> : ""}
      <main className="main-cont">
        <div className="title-hold">
          <h1 className="title-main">Tenzies</h1>
          <p className="title-main-p">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        </div>
        <div className="die-cont">
          {diceElements}
        </div>
        <p className="win">{tenzis ? `You win in ${counter} moves !` : ""}</p>
         <button className="btn" onClick={newRoll}>{tenzis ? "New Game" : "Next Roll"}</button>
      </main>  
    </div>
        
    
  )
}
