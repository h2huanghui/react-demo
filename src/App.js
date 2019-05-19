import React from 'react';
import './App.css';
import List from './views/List'
// import List from './views/List-immutable'

class App extends React.Component {

  render(){
    return <div className="App">
    <List />
  </div>
  }
  
}


export default App;
