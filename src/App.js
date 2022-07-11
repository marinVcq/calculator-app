import React, {useState} from 'react';
import Wrapper from './components/Wrapper';
import Top from './components/Top';
import Screen from './components/Screen';
import ButtonContainer from './components/ButtonContainer';
import Button from './components/Button';

import styled, {ThemeProvider} from "styled-components/macro";

const btnValues = [
  [7, 8, 9, "DEL"],
  [4, 5, 6, "+"],
  [1, 2, 3, "-"],
  [".",0,'/','x'],
  ["RESET",'=']
];

const operators = ["+", "-", "+","/","x"];

const theme1 = {
  mainBackground: 'hsl(222, 26%, 31%)',
  toggleBackground: 'hsl(223, 31%, 20%)',
  keypadBackground: 'hsl(223, 31%, 20%)',
  screenBackground: 'hsl(224, 36%, 15%)',
  keyBackground1: 'hsl(225, 21%, 49%)',
  keyShadow1: 'hsl(224, 28%, 35%)',
  keyBackground2: 'hsl(6, 63%, 50%)',
  keyShadow2: 'hsl(6, 70%, 34%)',
  keyBackground3: 'hsl(30, 25%, 89%)',
  keyShadow3: 'hsl(28, 16%, 65%)',
  toggle: 'hsl(6, 63%, 50%)',

}


const App = () => {

  /* Use state */
  let [theme, setTheme] = useState({active: theme1});
  let [calc, setCalc] = useState({
    value: "0",
  });

  /* Delete function */
  const deleteHandler = () => {
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
  const resetHandler = () => {
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
  const resultHandler = () => {
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
  const commaHandler = () => {

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

            <ButtonContainer>
              {
                btnValues.flat().map((btn, i) => {
                  return (
                    <Button key={i} value={btn} className={btn === "=" ? "equals" : btn === "RESET" ? "reset" : ""}

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
                    ></Button>
                  );
                })}
              </ButtonContainer>
          </form>
        </Wrapper>
      </ThemeProvider>
  )
};

export default App;
