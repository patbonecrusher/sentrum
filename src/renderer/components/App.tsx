/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import { hot } from "react-hot-loader/root";
import Draggeable from "./Draggeable";
import styled from 'styled-components';
import Bezier from './Bezier';
import TitleBar from "./TitleBar";
//import { ipcRenderer } from 'electron';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Settings from "./Settings";

/*eslint @typescript-eslint/camelcase: ["error", {allow: ["os_theme"]}]*/
function activateLasers(e: React.MouseEvent<HTMLButtonElement>): void {
  e.preventDefault();
  console.log('The link was clicked.');

  if (window.localStorage.os_theme === 'light')
    window.localStorage.os_theme = 'dark'
  else
    window.localStorage.os_theme = 'light'

  window.__setTheme()
}

interface Position {
  // value: string | null;
  x: number;
  y: number;
}

const path = (
  <path
    d={`
      M 25,25
      C 100,50 25,75 25,100
      C 25,125 300,150 25,175
    `}
    fill="none"
    stroke="hotpink"
    strokeWidth={2}
  />
)

const App: React.FC = () => {
  const [apos, setApos] = React.useState<Position>({ x: 0, y: 0 });
  const [bpos, setBpos] = React.useState<Position>({ x: 0, y: 0 });
  const [mpos, setMpos] = React.useState<Position>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = React.useState<boolean>(false);
  const [settingsVisible, setSettingsVisible] = React.useState<boolean>(false);

  const showPreferences = (e, arg) => {
    console.log("show preferences");
    console.log(settingsVisible);
    setSettingsVisible(!settingsVisible);
  }

  React.useEffect(() => {
    window.ipcRenderer.on('side:preferences', showPreferences);
    return (): void => {
      window.ipcRenderer.off('side:preferences', showPreferences);
    };
  });
  
  const handleDrag = React.useCallback((translation, id): void => {
    setIsDragging(true);
  }, [apos, bpos]);

  const handleDragEnd = React.useCallback((translation, id): void => {
    setIsDragging(false);

    if (id === 1) {
      const position = { x: apos.x + translation.x, y: apos.y + translation.y };
      console.log('pos', apos, translation, 'position', position);
      setApos(position);
    } else {
      const position = { x: bpos.x + translation.x, y: bpos.y + translation.y };
      console.log('pos', bpos, translation, 'position', position);
      setBpos(position);
    }
  }, [apos, bpos]);

  const handleMouseMove = React.useCallback((ev: React.MouseEvent): void => {
    setMpos({ x: ev.clientX, y: ev.clientY })
  }, []);

  const MainContent = (props) => {
    if (props.settingsVisible) {
      return (<Settings />)
    } else {
      return (
        <Container >
          {/* onMouseMove={handleMouseMove} onClick={handleMouseMove}> */}
        <Draggeable id={1}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
        >
          <Goodie top={apos.y} left={apos.x} isDragging={isDragging}>
            {`aaa x: ${mpos.x} y: ${mpos.y}, x: ${apos.x} y: ${apos.y}`}
          </Goodie>
        </Draggeable>
        <Draggeable
          id={2}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
        >
          <Goodie top={bpos.y} left={bpos.x} isDragging={isDragging}>
            {`bbb x: ${mpos.x} y: ${mpos.y}, x: ${bpos.x} y: ${bpos.y}`}
          </Goodie>
        </Draggeable>
        {/* <Bezier viewBoxWidth={ 250} viewBoxHeight = { 250} /> */}
        <svg
          viewBox="0 0 200 200"
          style={{ maxHeight: 400 }}
        >
          {path}
        </svg>
      </Container>
      )
    }
  }
  return (
    <Wrapper>
      <TitleBar />
      <MainContent settingsVisible={settingsVisible} />
      {/* {!settingsVisible &&

      }
      {settingsVisible &&
        <Settings />
      } */}
    </Wrapper>
  );
};

export default hot((): JSX.Element => (<App />));

const Wrapper = styled.div`
  display:flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

const MainContent = styled.div`
  position: relative;
  flex-grow: 1;
`;

const Container = styled.div`
  ${'' /* background-color: red;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center; */}
`;

const Goodie = styled.div.attrs(props => ({
  style: {
    top: `${props.top}px`,
    left: `${props.left}px`,
    transition: props.isDragging ? 'none' : 'none' //'all 50ms'
  }
}))`
  width: 300px;
  height: 100px;
  user-select: none;
  background: #fff;
  box-shadow: 0 5px 10px rgba(0,0,0,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 15px;
  font-size: 16px;
  color: #777;
`