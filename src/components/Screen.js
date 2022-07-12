import React from 'react';
import styled, {ThemeProvider} from 'styled-components/macro';


const Screen = ({value}) => {
	return (
    <ScreenInput className="screen" type="text" name="evalresult" value={value}></ScreenInput>
	);
}

const ScreenInput = styled.input`
  background-color: ${(props) => props.theme.screenBackground};
  color: ${(props => props.theme.screenText)};
`

export default Screen;