import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props){
    super(props);

  }

  render() {
    return (
      <div>Hello World!  From my React.jsx.</div>
    )
  }

}

console.log('My react is being executed/transpiled!');

ReactDOM.render(<App />, document.getElementById('app'));
