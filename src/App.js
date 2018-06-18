import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: {},
      isLoaded: false,
    };
    // this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    fetch("https://localhost:5001/calculates") /*test link*/
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json,
        })
      });
  }

  onClick() {
    var data = { id: this.state.items.id, result: 24 };
    fetch("https://localhost:5001/calculates", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  }
  
  render() {

    var { isLoaded, items } = this.state;

    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Calculate postfix notation</h1>
          </header>
          <div className="App-calc-form">
            <div className="divTable">
              <div className="divTableBody">
                <div className="divTableRow">
                  <div className="divTableCell">{items.id}</div>
                  <div className="divTableCell"> {items.expression}</div>
                  <div className="divTableCell">{items.result}</div>
                </div>
              </div>
            </div>
            <button onClick={this.onClick.bind(this)}>Calculate</button>
          </div>
        </div>
      );
    }
  }
}

export default App;
