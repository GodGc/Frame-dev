import React from "react"
import {Switch, Route, Redirect } from "react-router-dom"
import Index from './pages/index/index'
import './index.scss'

class App extends React.Component<any,any> {
  render () {
    return <div>
      <Switch>
        <Route path='/' component={Index}/>
      </Switch>
    </div>
  }
}
export default App;