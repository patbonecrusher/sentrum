import * as React from "react";
import styled from 'styled-components';
import { Toolbar } from './Toolbar';

interface PlaceholderProps {
    navToManageProjects(): void;
}

const Placeholder: React.FC<PlaceholderProps> = ({navToManageProjects}) => {
    
    const onClick = (ev: React.MouseEvent): boolean => {
        navToManageProjects();
        return false;
    };

    return (
        <PlaceholderContainer>
            <div>
                You don't have any projects. Use the <a id="myLink" title="Click to do something"
 href="#" onClick={onClick}>manage projects</a> menu to add a new one.
            </div>
        </PlaceholderContainer>
    );
};

export const Projects: React.FC = () => {

    const navToManageProjects = React.useCallback((): void => {
        console.log("BOO")
    }, []);

    const MainContent = (props): JSX.Element => {
        if (props.defaultProject) {
            return (<Baloney>asdsad</Baloney>)
        } else {
            return (<Placeholder navToManageProjects={navToManageProjects} />)
        }
    };

    return (
        <Container2>
            <Toolbar Title="hello" Body="blabla" navToManageProjects={navToManageProjects} />
            <MainContent defaultProject={false} />
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

const PlaceholderContainer = styled.div.attrs(props => ({
}))`
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-grow: 1;
    width: 100vw;
`;
