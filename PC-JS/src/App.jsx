import React, {Component} from 'react'
import {Switch, Route, Redirect } from 'react-router-dom'
import Index from './pages/index'
import './index.less'

export default class App extends Component {
  render () {
    return <div style={{height:'100%'}}>
      <Switch>
        <Route path='/' component={Index}/>
      </Switch>
    </div>
  }
}