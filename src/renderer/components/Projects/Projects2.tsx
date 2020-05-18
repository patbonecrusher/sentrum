import * as React from "react";
import styled from 'styled-components';
import Draggeable from "../Draggeable";
import Store from "electron-store";

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

const Projects: React.FC = () => {
    const [apos, setApos] = React.useState<Position>({ x: 0, y: 0 });
    const [bpos, setBpos] = React.useState<Position>({ x: 0, y: 0 });
    const [mpos, setMpos] = React.useState<Position>({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = React.useState<boolean>(false);

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
    );
}

export default Projects;

const Container = styled.div.attrs(props => ({
    style: {
      hidden: `${props.hidden}`
      //transition: props.hidden ? 'none' : 'none' //'all 50ms'
    }
}))`
    width: 100vw;
    min-height: 100vh;
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
