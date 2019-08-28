import React, { Component } from 'react'
import {Link} from 'react-router-dom'


export default class HomePage extends Component {
    render() {
        return (
            <div>
                home
                <Link to="/detail">To Detail</Link>
            </div>
        )
    }
}
