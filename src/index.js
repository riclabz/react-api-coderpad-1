import React from "react";
import ReactDOM from "react-dom";

import "./style.css";

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch('https://www.anapioficeandfire.com/api/', {
    method: 'GET'
  })
      .then(res => res.json())
      .then(
        (result) => {
          result = {
            "items": [
              { "name": "United States",  "code": "US",  "country": "USA",  "flag": "old glory",  "link": "https://https://en.wikipedia.org/wiki/United_States" },
              { "name": "Canada",  "code": "CA",  "country": "CAN",  "flag": "maple leaf",  "link": "https://https://en.wikipedia.org/wiki/Canada" }
            ] 
          };
          this.setState({
            isLoaded: true,
            items: result.items
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {items.map(item => (
            <li className="base-text" key={item.code}>
              {item.name} {item.code} {item.country} {item.flag} {item.link}
            </li>
          ))}
        </ul>
      );
    }
  }
}


ReactDOM.render(
  <MyComponent />,
  document.getElementById('root')
);