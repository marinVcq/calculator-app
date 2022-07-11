import React from 'react';
import styled, {ThemeProvider} from 'styled-components/macro';


const ButtonContainer = ({children}) => {
	return	<ButtonContainerDiv className="button-container">{children}</ButtonContainerDiv>
};

const ButtonContainerDiv = styled.button`
	background-color: ${(props) => props.theme.toggleBackground};
`

export default ButtonContainer;