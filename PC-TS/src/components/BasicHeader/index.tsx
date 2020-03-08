import React, { Component } from 'react'
import { message, Icon } from 'antd';
import axios from '../../config/server';
import './index.less'

interface userInfoType {
  userInfo?:string
}

export default class BasicHeader extends Component<userInfoType,any> {
  constructor (props:any) {
    super(props)
    this.state = {
      userInfo: ''
    }
  }
  
  componentDidMount () {
    let userInfo = localStorage.getItem('basketball_logined_userName');
    this.setState({
      userInfo
    })
  }

  private handleClickToLogout() {
    localStorage.clear();
    axios.defaults.headers.common['Token'] = '';
    message.success('退出成功，返回登录页中...')
    location.href = '#/user/login'
  }
  render () {
    const {userInfo} = this.state
    return <div className="hupu-basketball-basic-layout-header">
      <div className="hupu-basketball-header-title">
        <div className="hupu-basketball-header-logo"></div><h1>虎扑通用管理后台</h1>
        <div className="hupu-basketball-header-userinfo" onClick={this.handleClickToLogout.bind(this)}>
          <Icon style={{color: 'rgba(255,255,255,.8)'}} type="logout" />   {userInfo}
        </div>
      </div>
    </div>
  }
}