import * as React from "react";
import styled from 'styled-components';

interface ToolbarProps {
    Title: string;
    Image?: string;
    Body: string;
    navToManageProjects(): void;
}

// export const Card: React.FC<CardProps> =
//     ({ Title, Image, Body }) => (
//         <div className="card">
//             <div className="title">{Title}</div>
//             {Image &&
//                 <div className="image">
//                     <img src={Image} />
//                 </div>
//             }
//             <div className="body">{Body}</div>
//         </div>
//     )



export const Toolbar: React.FC<ToolbarProps> = 
    ({ Title, Image, Body, navToManageProjects }) => (
        <Container >
            <ProjectSelection>
                <option>Coffee</option>
                <option>Tea</option>
                <option>Juice</option>
                <option selected>Cocktail</option>
            </ProjectSelection>
            <div onClick={navToManageProjects}>{Title}</div>
        </Container>
    );


// TODO figure out how to avoid a typescript linting error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Container = styled.div.attrs(props => ({
}))`
    width: 100vw;
    height: 61px;
    border-bottom: 1px solid black;
    display: flex;
    flex-direction: row;
`;

const ProjectSelection = styled.select.attrs(props => ({

}))`
    width: 120px;
    height: 30px;
    border: 1px solid #999;
    font-size: 18px;
    color: #1c87c9;
    background-color: #eee;
    border-radius: 5px;
    box-shadow: 4px 4px #ccc;
`;