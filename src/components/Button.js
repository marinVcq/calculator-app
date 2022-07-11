import React from 'react';
import styled, {ThemeProvider} from 'styled-components/macro';

const Button = ({className, value, onClick}) => {

	if(className === "equals"){
		return(
			<ButtonEquals type="button" className={className} onClick={onClick} value={value}>{value}</ButtonEquals>
		);		
	}else if(className === "reset"){
		return(
			<ButtonReset type="button" className={className} onClick={onClick} value={value}>{value}</ButtonReset>
		);
	}else{
		return(
			<ButtonNum type="button" className={className} onClick={onClick} value={value}>{value}</ButtonNum>
		);		
	}

}

const ButtonNum = styled.button`
	background-color: ${(props) => props.theme.keyBackground3};
	color: ${(props) => props.theme.keypadBackground};
`
const ButtonEquals = styled.button`
	background-color: ${(props) => props.theme.keyBackground2};
`
const ButtonReset = styled.button`
	background-color: ${(props) => props.theme.keyBackground1};
`

export default Button;