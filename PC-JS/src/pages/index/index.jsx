import React, { Component } from "react";
import { Form, Row, Col, Button, Select, Breadcrumb, Table, Divider, Input,Icon,Pagination, message } from "antd";
import Highlighter from "react-highlight-words";
import axios from "../../config/server";
import "./index.less";
const { Option } = Select;
import { playerList } from '../../config/api.js'


class App extends Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
      pagination: {},
      loading: false,
      data: [],
      current:1,
      pageSize: 50,
      serch:{},
      sortFields:{field:'',order:''},
    };
  }

  componentDidMount() {
  }



  render() {
    
    return (
      <div>
        demo
      </div>
    );
  }
}

const IndexPage = Form.create({ name: "index" })(App);

export default IndexPage;
