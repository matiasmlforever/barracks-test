import React, { useState, useEffect } from "react";
import logo from "./react-logo.svg";
import nodejsLogo from "./nodejs-logo.svg";
import "./App.css";
import { Form } from "./components/Form"
import {w3cwebsocket as W3CWebSocket} from "websocket";

const client = new W3CWebSocket('ws://localhost:4000');

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then(res => res.json())
      .then(json => setUsers(json.users));

    client.onopen = () => {
      console.log("Websocket client connected");
    }

    // Specify how to clean up after this effect:
    return () => {};
  }, []); // empty 2nd arg - only runs once

  const handleSubmit = data => {
    const json = JSON.stringify(data, null, 4);
    console.clear();
    console.log(json);
  };


  function onButtonClicked(value) {
    client.send(JSON.stringify({
      type: "message",
      msg: value
    }));
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Node Template</h1>
        <button onClick={() => onButtonClicked("HOLA!")}>Enviar mensaje</button>
        <Form onSubmit={handleSubmit} />
        <p>
          <a
            className="App-link"
            href="https://github.com/mattvukas/react-node-template"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://github.com/mattvukas/react-node-template
          </a>
        </p>
        <div className="logo-box">
          <img src={logo} className="App-logo" alt="logo" />
          <img src={nodejsLogo} className="Node-logo" alt="nodejsLogo" />
        </div>
        <p>
          Edit <code>client/src/App.js</code> and save to reload React app.
        </p>
        <p>
          Edit <code>client/server/routes/api.js</code> and save to reload
          Node.js app.
        </p>
        <br />
        <p>
          <code>GET /api/users</code>:{" "}
          {users.length ? users.join(", ") : "loading..."}
        </p>
        <br />
        <p>
          Docs:{" "}
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          {" | "}
          <a
            className="App-link"
            href="https://nodejs.org/en/docs/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Node.js
          </a>
          {" | "}
          <a
            className="App-link"
            href="https://expressjs.com/en/4x/api.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Express.js
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
