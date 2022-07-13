import React from 'react';
import styled, {ThemeProvider} from 'styled-components/macro';

const Top = ({onClick}) => {
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
              <SwitchButton className="switch-button"><Toggle className="switch-ball" onClick={onClick}></Toggle></SwitchButton>
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

const Toggle = styled.div`
  background-color: ${(props) => props.theme.toggle};
  transform: translateX( ${(props) => props.theme.togglePosition});
`

export default Top;