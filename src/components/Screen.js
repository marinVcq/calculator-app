import React from 'react';
import styled, {ThemeProvider} from 'styled-components/macro';


const Screen = ({value}) => {
	return (
        <ScreenDiv className="screen">
          <input type="text" name="evalresult" value={value} className="result"></input>
        </ScreenDiv>		
	);
}

const ScreenDiv = styled.div`
  background-color: ${(props) => props.theme.screenBackground};
`

export default Screen;