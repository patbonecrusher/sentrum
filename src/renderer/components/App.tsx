/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import {hot} from "react-hot-loader/root";

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

export default hot((): JSX.Element => (
    <div>
      <h1>
        Your Electron App as
      </h1>
      <button onClick={activateLasers}>
        Activate Lasers
      </button>
    </div>
));