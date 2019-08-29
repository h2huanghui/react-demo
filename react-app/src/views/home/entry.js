import React,{Component} from 'react'
import ReactDOM from 'react-dom'

import '../../index.scss'
class App extends Component {
    render(){
        return <div>
            <h2>Home</h2>
            <a href="/order">To order</a>
            </div>
    }
}

ReactDOM.render(<App />,document.getElementById('root'))