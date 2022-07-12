import React from 'react';
import styled, {ThemeProvider} from 'styled-components/macro';

const Top = () => {
	return(
        <TopContainer className="top" >
          <h1 className="app-title">calc</h1>
          <div className="theme-switcher">
            <span className="label">THEME</span>
            <div className="switch-button-container">
              <div>
                <span>1</span>
                <span>2</span>
                <span>3</span>
              </div>
              <SwitchButton className="switch-button"><SwitchBall className="switch-ball"></SwitchBall></SwitchButton>
            </div>
          </div>
        </TopContainer>
	);
}

const TopContainer = styled.div`
  color: ${(props) => props.theme.topText};
`

const SwitchButton = styled.button`
  background-color: ${(props) => props.theme.toggleBackground};
`

const SwitchBall = styled.div`
  background-color: ${(props) => props.theme.toggle};
`

export default Top;