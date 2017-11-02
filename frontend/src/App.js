import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {LinkContainer, IndexLinkContainer} from 'react-router-bootstrap';
import {Nav, NavItem} from 'react-bootstrap';
import HomePage from './containers/HomePage';
import Add from './containers/Add';
import Profile from './containers/Profile';
import Register from './containers/Register';
import Login from './containers/Login';
import './styles/App.css';

const App = () => {
    return (
        <Router>
            <div className="root">
                <Nav bsStyle="pills">
                    <IndexLinkContainer to="/">
                        <NavItem eventKey={1}> Home </NavItem>
                    </IndexLinkContainer>
                    <LinkContainer to="/add">
                        <NavItem eventKey={2}> Add </NavItem>
                    </LinkContainer>
                    <LinkContainer to="/profile">
                        <NavItem eventKey={3}> My Profile </NavItem>
                    </LinkContainer>
                    <LinkContainer to="/register">
                        <NavItem eventKey={4}> Register </NavItem>
                    </LinkContainer>
                    <LinkContainer to="/login">
                        <NavItem eventKey={5}> Login </NavItem>
                    </LinkContainer>
                </Nav>
                <hr/>
                <Route exact path="/" component={HomePage}/>
                <Route path="/add" component={Add}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/register" component={Register}/>
                <Route path="/login" component={Login}/>
            </div>
        </Router>
    );
};
export default App;
