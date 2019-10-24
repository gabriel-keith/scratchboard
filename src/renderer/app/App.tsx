import React from 'react'
import { Sidebar } from './sidebar/Sidebar';
import { Actions } from './actions/Actions';
import { Details } from './details/Details';

export class App extends React.Component {
    render() {
        return <div><Sidebar/><Details/><Actions/></div>;
    }
}