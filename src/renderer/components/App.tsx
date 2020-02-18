import * as React from "react";
import {hot} from "react-hot-loader/root";

function activateLasers(e: any): void {
    e.preventDefault();
    console.log('The link was clicked.');

    if (window.localStorage.os_theme === 'light')
        window.localStorage.os_theme = 'dark'
    else
        window.localStorage.os_theme = 'light'

    window.__setTheme()
 }


export default hot((): JSX.Element => 
    (
        <div>
          <h1>
            Your Electron App as
          </h1>
          <button onClick={activateLasers}>
            Activate Lasers
          </button>
        </div>
    ));