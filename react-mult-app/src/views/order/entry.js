import React,{Component} from 'react'
import ReactDOM from 'react-dom'

import {BrowserRouter as Router, Route } from 'react-router-dom'
import OrderPage from './HomePage'
import DetailPage from './DetailPage'

import '../../index.scss'
class App extends Component {
    render(){
        return <Router basename="/order" >
        <Route path="/" exact component={OrderPage}  />
        <Route path="/detail" component={DetailPage} />
    </Router>
    }
}

ReactDOM.render(<App />,document.getElementById('root'))