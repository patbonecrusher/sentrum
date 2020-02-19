import { app } from "electron"
import { createSharedMenuItems } from "./shared-menu"
import * as isDev from "electron-is-dev"

export function createMacMenu(
    window: Electron.BrowserWindow,
): Electron.MenuItemConstructorOptions[] {
    const shared = createSharedMenuItems(window)
    const name: string = app.name

    const about: Electron.MenuItemConstructorOptions = { label: `About ${name}`, role: "about" };
    const separator: Electron.MenuItemConstructorOptions = { type: "separator" };
    const hide: Electron.MenuItemConstructorOptions = { label: `Hide ${name}`, accelerator: "Command+H", role: "hide" };
    const hideOthers: Electron.MenuItemConstructorOptions = { label: "Hide Others", accelerator: "Command+Option+H", role: "hideOthers" };
    const showAll: Electron.MenuItemConstructorOptions = { label: "Show All", role: "unhide" };
    const quit = { ...shared.quit, accelerator: "Command+Q" };

    const appMenu: Electron.MenuItemConstructorOptions = {
        label: name,
        submenu: [ about, separator, hide, hideOthers, showAll, separator, quit],
    }

    const viewMenu: Electron.MenuItemConstructorOptions = {
        label: "View",
        submenu: isDev
            ? [
                { ...shared.reload, accelerator: "Command+R" },
                { ...shared.storybook, accelerator: "Command+Shift+S" },
                { ...shared.toggleDevTools, accelerator: "Alt+Command+I" },
            ]
            : [{ ...shared.fullScreen, accelerator: "Ctrl+Command+F" }],
    }

    const helpMenu: Electron.MenuItemConstructorOptions = {
        label: "Help",
        submenu: [process.env.HOMEPAGE && shared.visit].filter(Boolean),
    }

    return [appMenu, viewMenu, helpMenu]
}