import React, {useState} from 'react';

/* Components */
import Wrapper from './components/Wrapper';
import Top from './components/Top';
import Screen from './components/Screen';
import Keypad from './components/Keypad';
import Key from './components/Key';

/* Themes and Style */
import {theme1,theme2,theme3} from "./abstract/theme.js";
import styled, {ThemeProvider} from "styled-components/macro";

const btnValues = [
  ["7", "8", "9", "DEL"],
  ["4", "5", "6", "+"],
  ["1", "2", "3", "-"],
  [".","0",'/','x'],
  ["RESET",'=']
];

const operators = ["+", "-", "+","/","x"];

const App = () => {

  /* Use state */
  let [theme, setTheme] = useState({active: theme1});
  let [calc, setCalc] = useState({
    value: "0",
  });

  /* Delete function */
  const deleteHandler = (e) => {
    e.preventDefault();
    /* Set value to "0" if delete all the expression */
    if(calc.value.length === 1){
      setCalc({
        ...calc,
        value: "0",
      });     
    }else{
      setCalc({
        ...calc,
        value: calc.value.toString().slice(0,-1),
      });      
    }
  }

  /* Reset function */
  const resetHandler = (e) => {
    e.preventDefault();

    setCalc({
      ...calc,
      value: "0",
    });
  }

  /* Resolve expression function */
  const resolve = (expression) => {
    try{
      return eval(expression);
    }catch(error){
      console.log('ERROR');
      return "0";
    }
  }

  /* Get result function */
  const resultHandler = (e) => {
    e.preventDefault();
    setCalc({
      ...calc,
      value: resolve(calc.value),
    });
  }

 /* Operator function */
  const operatorHandler = (event) => {

    event.preventDefault();
    let operator = event.target.value;

    if( operator === '-' && calc.value[calc.value.length - 1] === "-"){ /* Operator can't follow an other (except + or -) */
      setCalc({
        ...calc,
        value: calc.value.slice(0,-1) + "+",
      });
    }else if(operator === '+' && calc.value[calc.value.length - 1] === "+"){
       setCalc({
        ...calc,
        value: calc.value.slice(0,-1) + "+",
      });     
    }else if(operator === "/" && operators.includes(calc.value[calc.value.length -1])){
        setCalc({
          ...calc,
          value: calc.value,
        });
    }else if(operator === "x"){

      if(calc.value[calc.value.length -1] === "*"){
        setCalc({
          ...calc,
          value: calc.value,
        });         
      }else{
        setCalc({
          ...calc,
          value: calc.value + "*",
        });         
      }
    
    }else{
      setCalc({
        ...calc,
        value: calc.value + operator,
      });
    }
  }

  /* Number function*/
  const numberHandler = (event) => {
    event.preventDefault();

    let number = event.target.value;

    if(calc.value === "0"){
      setCalc({
        ...calc,
        value: number,
      })     
    }else{
      setCalc({
        ...calc,
        value:  calc.value + number,
      })      
    }
  }

  /* Comma function */
  const commaHandler = (e) => {
    e.preventDefault();

    /* Avoid succesion of commas */
    if( calc.value[calc.value.length -1] === "."){
      setCalc({
        ...calc,
        value: calc.value,
      });
    }else{
      setCalc({
        ...calc,
        value: calc.value + ".",
      });
    }
  }

  return (
      <ThemeProvider theme={theme.active}>
        <Wrapper>
          <form className="calculator-form" name="calculatorForm">

            <Top/>

            <Screen value={calc.value}/>

            <Keypad>
              {
                btnValues.flat().map((btn, i) => {
                  return (
                    <Key key={i} value={btn} className={btn === "=" ? "equals" : btn === "RESET" ? "reset" : btn === "DEL" ? "del" : ""}

                    onClick={
                      btn === "DEL"
                      ? deleteHandler
                      : btn === "RESET"
                      ? resetHandler
                      : btn === "="
                      ? resultHandler
                      : operators.includes(btn)
                      ? operatorHandler
                      : btn === "."
                      ? commaHandler
                      : numberHandler
                    }
                    ></Key>
                  );
                })}
              </Keypad>
          </form>
        </Wrapper>
      </ThemeProvider>
  )
};

export default App;
