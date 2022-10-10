import React, {useState} from 'react';

/* Components */
import Wrapper from './components/Wrapper';
import Top from './components/Top';
import Screen from './components/Screen';
import Keypad from './components/Keypad';
import Key from './components/Key';
import Footer from './components/Footer';

/* Themes and Style */
import {theme1,theme2,theme3} from "./abstract/theme.js";
import styled, {ThemeProvider} from "styled-components/macro";

/* Helmet */
import { Helmet, HelmetProvider } from 'react-helmet-async';

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

  /* Toggle theme function */
  const switchTheme = (event) => {
    event.preventDefault();
    setTheme({
      active: theme.active === theme1
      ? theme2
      : theme.active === theme2
      ? theme3
      : theme1,
    });
  }

  /* Delete function */
  const deleteHandler = (event) => {
    event.preventDefault();
    /* Set value to "0" if delete all the expression */
    setCalc({
      value: calc.value.length === 1 ? "0" : calc.value.toString().slice(0,-1),
    });
  }

  /* Reset function */
  const resetHandler = (event) => {
    event.preventDefault();
    setCalc({
      value: "0",
    });
  }

  /* Resolve expression function */
  const resolve = (expression) => {

    /* Replace commas by decimal point */
    expression = expression.replaceAll(',','.');

    /* Handle errors */
    try{
      return eval(expression).toFixed(3);
    }catch(error){
      return "0";
    }
  }

  /* Get result function */
  const resultHandler = (event) => {
    event.preventDefault();
    setCalc({
      value: resolve(calc.value).replaceAll('.',','),
    });
  }

 /* Operator function */
  const operatorHandler = (event) => {

    event.preventDefault();
    let operator = event.target.value;

    setCalc({
      value: ( operator === '-' && calc.value[calc.value.length - 1] === "-")
        ? calc.value.slice(0,-1) + "+"
        : (operator === '+' && calc.value[calc.value.length - 1] === "+")
        ? calc.value.slice(0,-1) + "+"
        : (operator === "/" && operators.includes(calc.value.replaceAll('*','x')[calc.value.length -1]))
        ? calc.value
        : (operator === "x" && calc.value[calc.value.length -1] === "*")
        ? calc.value
        : (operator === "x" && calc.value[calc.value.length -1] !== "*")
        ? calc.value + "*"
        : calc.value + operator
    });
  }

  /* Number function*/
  const numberHandler = (event) => {
    event.preventDefault();
    let number = event.target.value;
    /* Initial zero replace by first input number */
    setCalc({
      value: calc.value === "0"
        ? number
        : calc.value + number,
    });
  }

  /* Comma function */
  const commaHandler = (event) => {

    event.preventDefault();

    /* Avoid succesion of commas */
    setCalc({
      value: calc.value[calc.value.length -1] === ","
        ? calc.value
        : calc.value + ",",
    });
  }

  return (
    <HelmetProvider>
      <Helmet>
          <meta charSet="utf-8" />
          <title>Calculator App</title>
      </Helmet>
      <ThemeProvider theme={theme.active}>
        <Wrapper >
            <Top onClick={switchTheme}/>
            <Screen value={calc.value}/>
            <Keypad>
              {
                btnValues.flat().map((btn, i) => {
                  return (
                    <Key key={i} value={btn} className={btn === "=" ? "equals" : btn === "RESET" ? "reset" : btn === "DEL" ? "delete" : "number"}

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
        </Wrapper>
        <Footer/>
      </ThemeProvider>
    </HelmetProvider>

  )
};

export default App;
