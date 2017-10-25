import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem } from 'react-bootstrap';
import Home from './containers/HomePage';
import Add from './containers/Add';
import Profile from './containers/Profile';
import './styles/App.css';


class App extends Component {

  render() {
    return (<Router>
      <div>
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
        </Nav>
        <hr />
        <Route exact path="/" component={Home} />
        <Route path="/add" component={Add} />
        <Route path="/profile" component={Profile} />
      </div></Router>);
  }
}
export default App;
