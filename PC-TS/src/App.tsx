import * as React from 'react'
import {Switch, Route, HashRouter, Redirect } from 'react-router-dom'
import * as ReactDom from 'react-dom'
import Index from './pages/basketball/index'
import './index.less'

export default class App extends  React.Component {
  render () {
    return (
      <div>
        <HashRouter>
          <Switch>
            <Route path='/' component={Index}/>
          </Switch>
        </HashRouter>
      </div>
    )
  }
}