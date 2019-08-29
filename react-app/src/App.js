import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import HomePage from './view/HomePage'
import DetailPage from './view/DetailPage'
import './index.scss';
class App extends Component {
    render(){
        return <Router>
        <Route path="/" exact component={HomePage}  />
        <Route path="/detail" component={DetailPage} />
    </Router>
    }
}

ReactDOM.render(<App />,document.getElementById('root'))