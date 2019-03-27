// @flow
import React, { Component } from 'react';
import './App.css';

type Props = {
  something: string
};

type State ={
  count: number
}

class App extends Component<Props, State> {
  state ={
    count: 0,
  }
  render() {
    const { count} = this.state;
    const { something} = this.props;

    return (
      <div className="App">
      {count}{something}
      </div>
    );
  }
}

export default App;
