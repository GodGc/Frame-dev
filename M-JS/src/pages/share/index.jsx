import React, { Component } from 'react';
import './index.scss';
import axios from 'axios'

class Share extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:{},
      source:''
    };
  }


  componentDidMount(){
  
  }

  render() {
    return (
      <div className="">
        <p>demo</p>
      </div>
    )
  }  
}

export default Share;