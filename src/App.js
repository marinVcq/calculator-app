import React, {useState} from 'react';

const btnValues = [
  [7, 8, 9, "DEL"],
  [4, 5, 6, "+"],
  [1, 2, 3, "-"],
  [".",0,'/','*'],
  ["RESET",'=']
];

const operators = ["+", "-", "+","/"];

const App = () => {

  /* Use state */
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
    <div className="wrapper">
      <form className="calculator-form" name="calculatorForm">

        <div className="screen">
          <input type="text" name="evalresult" value={calc.value} className="result"></input>
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
