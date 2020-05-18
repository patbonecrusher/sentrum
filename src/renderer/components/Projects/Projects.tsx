import * as React from "react";
import styled from 'styled-components';
import { Toolbar } from './Toolbar';


export const Projects: React.FC = () => {

    const MainContent = (props): JSX.Element => {
        if (props.defaultProject) {
            return (<Baloney>asdsad</Baloney>)
        } else {
            return (<div />)
        }
    };

    return (
        <Container2>
            <Toolbar />
            <MainContent defaultProject={true} />
        </Container2>
    );
};

// TODO figure out how to avoid a typescript linting error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Container2 = styled.div.attrs(props => ({
}))`
    display:flex;
    flex-direction: column;
    flex-grow: 1;
    width: 100vw;
`;

const Baloney = styled.div`
    position: relative;
    flex-grow: 1;
    background-color: blue;
`;
