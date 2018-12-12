import React, { Component } from 'react';
import './App.css';
import Calendar from './components/Calendar'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className='App-header'>
          <Calendar></Calendar>
        </header>
      </div>
    );
  }
}

export default App;
