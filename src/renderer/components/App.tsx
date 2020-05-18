/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import { hot } from "react-hot-loader/root";
import styled from 'styled-components';
import Bezier from './Bezier';
import TitleBar from "./TitleBar";
//import { ipcRenderer } from 'electron';
import Store from 'electron-store'  ;

type StoreType = {
  isRainbow: boolean;
  unicorn?: string;
}

const store = new Store<StoreType>({
  defaults: {
    isRainbow: true
  }
});

console.log(store.get('isRainbow'));

store.set('project.foo', {abc:"def"});

store.set('unicorn', '🦄');
console.log(store.get('unicorn'));

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Settings from "./Settings";
import { Projects } from "./Projects";


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



const App: React.FC = () => {
  const [settingsVisible, setSettingsVisible] = React.useState<boolean>(false);

  const showPreferences = (e, arg): void => {
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


  const MainContent = (props): JSX.Element => {
    if (props.settingsVisible) {
      return (<Settings />)
    } else {
      return (<Projects />)
    }
  }

  return (
    <Wrapper>
        <TitleBar />
      <MainContent settingsVisible={settingsVisible} />
      {/* <Projects/>
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

// const MainContent = styled.div`
//   position: relative;
//   flex-grow: 1;
//   display:flex;
//   flex-direction: column;
// `;
