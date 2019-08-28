import React,{Component} from 'react'
import ReactDOM from 'react-dom'

import '../../index.scss'
class App extends Component {
    render(){
        return <a href="/order">To order</a>
    }
}

ReactDOM.render(<App />,document.getElementById('root'))