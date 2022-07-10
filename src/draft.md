  const clickHandler = (event) => {
    event.preventDefault();

    let __value = event.target.value;

    if(calc.value === 0){
      console.log('first time');
      setCalc({
        ...calc,
        value: __value,
      })     
    }else{
      setCalc({
        ...calc,
        value:  calc.value + __value,
      })      
    }
  }

  /* Operator function */
  const operatorHandler = (event) => {

    event.preventDefault();
    let operator = event.target.value;

    if( operator === '-' && calc.value[calc.value.length - 1] === "-"){
      setCalc({
        ...calc,
        value: calc.value.slice(0,-1) + "+",
        backValue: calc.value.slice(0,-1) + "+",
      });
    }else{
      setCalc({
        ...calc,
        value: calc.value + operator,
        backValue: calc.value + operator,

      });
    }
  }