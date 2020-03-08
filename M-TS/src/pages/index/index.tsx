import * as React from "react"
import ClipBoard from "clipboard";
import axios from "axios";
// import { Toast } from "@hupu/kola";
import "./index.scss";


interface indexState {
  info: string,
}

class App extends React.Component<any, indexState> {
  constructor(props:any) {
    super(props);
    this.state = {
      info: 'hello TS'
    };
  }

  componentDidMount() {
    
  }


  render() {
    let { info } = this.state;
    return (
      <div>
        {info}
      </div>
    );
  }
}

export default App;
