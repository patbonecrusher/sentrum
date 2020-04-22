/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import {hot} from "react-hot-loader/root";
import Draggeable from "./Draggeable";
import styled from 'styled-components';

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

const App: React.FC = () => {
  const [apos, setApos] = React.useState<Position>({x:0,y:0});
  const [bpos, setBpos] = React.useState<Position>({x:0,y:0});
  const [mpos, setMpos] = React.useState<Position>({x:0,y:0});
  const [isDragging, setIsDragging] = React.useState<boolean>(false);

  const handleDrag = React.useCallback((translation, id): void => {
    setIsDragging(true);
  }, [apos,bpos]);

  const handleDragEnd = React.useCallback((translation, id): void => {
    setIsDragging(false);
    
    if (id === 1) {
      const position = {x: apos.x + translation.x, y: apos.y + translation.y};
      console.log('pos', apos, translation, 'position', position);
      setApos(position);
    } else {
      const position = {x: bpos.x + translation.x, y: bpos.y + translation.y};
      console.log('pos', bpos, translation, 'position', position);
      setBpos(position);
    }
  }, [apos, bpos]);

  const handleMouseMove = React.useCallback((ev: React.MouseEvent): void => {
    setMpos({x: ev.clientX, y: ev.clientY})
  }, []);

  return (
    <Container onMouseMove={handleMouseMove} onClick={handleMouseMove}>
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

    </Container>
  );
};

export default hot((): JSX.Element => (<App/>));

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: red;
  ${'' /* background-color: red;
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