import React, {Component} from 'react'
import {Switch, Route, Redirect } from 'react-router-dom'
import Index from './pages/index'
import Share from './pages/share'
import './index.scss'

export default class App extends Component {
  render () {
    return <div>
      <Switch>
        <Route path="/share" component={Share}/>
        <Route path='/' component={Index}/>
      </Switch>
    </div>
  }
}