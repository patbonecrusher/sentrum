import * as React from "react";
import styled from 'styled-components';

const TitleBar: React.FC = () => {

    return (
        <TitleBarContainer>
            SENTRUM
        </TitleBarContainer>
    );
}

const TitleBarContainer = styled.header`
    flex: 0 0 auto;
    position: relative;
    height: var(--darwin-title-bar-height);//34px;
    line-height: 1.5;
    vertical-align: middle;
    text-align: center;
    cursor: default;
    user-select:none;
    -webkit-user-select: none;
    -webkit-app-region: drag;
    flex: 0 0 auto;
`;

export default TitleBar;

// import './titlebar.scss'

// class TitleBar extends React.Component {
// 	constructor() {
// 		super();
// 		this.onHeaderMouseDown = this.onHeaderMouseDown.bind(this);
// 	}

// 	onHeaderMouseDown() {
// 		console.log("foo", this.clicks)
// 		this.headerMouseDownWindowX = window.screenX;
// 		this.headerMouseDownWindowY = window.screenY;

// 		this.clicks = this.clicks || 1;

// 		if (this.clicks++ >= 2) {
// 			if (this.maximized) {
// 				this.rpc.emit('unmaximize');
// 			} else {
// 				this.rpc.emit('maximize');
// 			}
// 			this.clicks = 0;
// 			this.maximized = !this.maximized;
// 		} else {
// 			// http://www.quirksmode.org/dom/events/click.html
// 			// https://en.wikipedia.org/wiki/Double-click
// 			this.clickTimer = setTimeout(() => {
// 				this.clicks = 0;
// 			}, 500);
// 		}
// 	}

// 	componentWillUnmount() {
// 		delete this.clicks;
// 		clearTimeout(this.clickTimer);
// 	}

// 	render() {
// 		const { store } = this.props
// 		return (
// 			<header
// 				onMouseDown={this.onHeaderMouseDown}>
// 				SENTRUM
// 			</header>
// 		);
// 	}
// }

// export default TitleBar;
