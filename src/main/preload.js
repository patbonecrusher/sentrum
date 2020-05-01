/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */

const { remote } = require('electron')

console.log('booboo');



function load_mac_theme () {
    const { nativeTheme, systemPreferences } = remote
    const setOSTheme = () => {
        const theme = nativeTheme.shouldUseDarkColors ? 'dark' : 'light'
        window.localStorage.os_theme = 'material-dark' //theme
        //
        // Defined in index.html, so undefined when launching the app.
        // Will be defined for `systemPreferences.subscribeNotification` callback.
        //
        if ('__setTheme' in window) {
            window.__setTheme()
        }
    }
    systemPreferences.subscribeNotification(
        'AppleInterfaceThemeChangedNotification',
        setOSTheme,
    )
    setOSTheme()
}

function load_linux_theme () {
    const setOSTheme = () => {
        const theme = 'dark'
        window.localStorage.os_theme = theme
        //
        // Defined in index.html, so undefined when launching the app.
        // Will be defined for `systemPreferences.subscribeNotification` callback.
        //
        if ('__setTheme' in window) {
            window.__setTheme()
        }
    }
    setOSTheme()
}

switch (process.platform) {
    case 'darwin': load_mac_theme(); break;
    case 'linux': load_linux_theme(); break;
}

