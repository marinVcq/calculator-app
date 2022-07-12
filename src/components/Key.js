import React from 'react';
import styled, {ThemeProvider} from 'styled-components/macro';

const Key = ({className, value, onClick}) => {

	if(className === "equals"){
		return(
			<KeyEquals type="button" className={className} onClick={onClick} value={value}>{value}</KeyEquals>
		);		
	}else if(className === "del"){
		return(
			<KeyDelete type="button" className={className} onClick={onClick} value={value}>{value}</KeyDelete>
		);
	}else if(className === "reset"){
		return(
			<KeyReset type="button" className={className} onClick={onClick} value={value}>{value}</KeyReset>
		);
	}else{
		return(
			<KeyNum type="button" className={className} onClick={onClick} value={value}>{value}</KeyNum>
		);		
	}

}

const KeyNum = styled.button`
	background-color: ${(props) => props.theme.numbersBackground};
	color: ${(props) => props.theme.numbersText};
`
const KeyDelete = styled.button`
	background-color: ${(props) => props.theme.deleteBackground};
	color: ${(props) => props.theme.deleteText};
`
const KeyEquals = styled.button`
	background-color: ${(props) => props.theme.equalsBackground};
	color: ${(props) => props.theme.equalsText};
`
const KeyReset = styled.button`
	background-color: ${(props) => props.theme.resetBackground};
	color: ${(props) => props.theme.resetText};
`

export default Key;