import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Panel } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
  <Panel>
    <Panel.Heading>Panel heading without a title</Panel.Heading>
    <Panel.Body>Panel content</Panel.Body>
  </Panel>
  <Panel>
    <Panel.Heading>
      <Panel.Title componentClass="h3">Panel heading with a title</Panel.Title>
    </Panel.Heading>
    <Panel.Body>Panel content</Panel.Body>
  </Panel>
</div>
      </div>
    );
  }
}

export default App;
