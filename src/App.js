import React, {useState} from 'react';

const btnValues = [
  [7, 8, 9, "DEL"],
  [4, 5, 6, "+"],
  [1, 2, 3, "-"],
  [".",0,'/','*'],
  ["RESET",'=']
];

const operators = ["+", "-", "+","/"];
const comma = ".";
const numbers = [1,2,3,4,5,6,7,8,9];


const App = () => {

  /* Use state */
  let [calc, setCalc] = useState({
    backValue: 0,
    value: 0,
    res: 0,
  });

  /* Delete function */
  const deleteHandler = () => {
    setCalc({
      ...calc,
      value: calc.backValue,
    });
  }

  /* Reset function */
  const resetHandler = () => {
    setCalc({
      ...calc,
      value: 0,
      backValue: 0,
    });
  }

  /* Result function */
  const resultHandler = () => {
    setCalc({
      ...calc,
      res: eval(calc.value),
      value: eval(calc.value),
      backValue: eval(calc.value),
    });
  }

 /* Operator function */
  const operatorHandler = (event) => {

    event.preventDefault();
    let operator = event.target.value;


    /* Operator can't follow an other (except + or -) */
    if( operator === '-' && calc.value[calc.value.length - 1] === "-"){
      setCalc({
        ...calc,
        value: calc.value.slice(0,-1) + "+",
        backValue: calc.value.slice(0,-1) + "+",
      });
    }else if(operator === '+' && calc.value[calc.value.length - 1] === "+"){
       setCalc({
        ...calc,
        value: calc.value.slice(0,-1) + "+",
        backValue: calc.value.slice(0,-1) + "+",
      });     
    }else if(operator === "/" && operators.includes(calc.value[calc.value.length -1])){
        setCalc({
          ...calc,
          value: calc.value,
        });
    }else{
      setCalc({
        ...calc,
        value: calc.value + operator,
        backValue: calc.value + operator,

      });
    }
  }

  /* Operator function with ternary - Not finish */
  const operatorHandlerShort = (event) => {

    event.preventDefault();
    let operator = event.target.value;

    setCalc({
      ...calc,
      value: operator === "-" && calc.value[calc.value.length - 1] === "-"
          ? calc.value.slice(0,-1) + "+"
          : calc.value + operator,
      BackValue: operator === "-" && calc.value[calc.value.length - 1] === "-"
          ? calc.value.slice(0,-1) + "+"
          : calc.value + operator,
    });
  }

  /* Number function*/
  const numberHandler = (event) => {
    event.preventDefault();

    let number = event.target.value;

    if(calc.value === 0){
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


  /* Number function with ternary - not finish */
  const numberHandlerShort = (event) => {
    event.preventDefault();

    let number = event.target.value;

    setCalc({
      ...calc,
      value: calc.value === 0 
          ? number
          : calc.value + number,
    });
  }

  /* Comma function - Not finish */
  const commaHandler = () => {

    /* Avoid succesion of commas and multiple comma in the value expression */
    if( calc.value[calc.value.length -1] === "."){
      setCalc({
        ...calc,
        value: calc.value,
      });
    }else if(calc.value.toString().includes(".")){
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

  const screenHandler = () => {

  }

  return (
    <div className="wrapper">
      <form className="calculator-form" name="calculatorForm">

        <div className="screen">
          <input type="text" name="evalresult" value={"result: " + calc.res} className="result" onChange={screenHandler} ></input>
          <span className="expression">Exp: {calc.value}</span>
        </div>

        <div className="button-box">
          {
            btnValues.flat().map((btn, i) => {
              return (
                <button type="button" key={i} value={btn} className={btn === "=" ? "equals" : btn === "RESET" ? "reset" : "button"}

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
                > {btn} </button>
              );
            })}
          </div>
      </form>
    </div>
  )
};

export default App;
