import React from "react";
import logo from "./logo.svg";
import "./App.css";
import firebase from "./firebase";

function App() {
  const [searchGitHubUsername, setSearchGitHubUsername] = React.useState("");
  const [users, setUsers] = React.useState([]);

  const db = firebase.firestore();

  const fetchData = async () => {
    const data = await db.collection("users").get();
    setUsers(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  };

  const onSearch = () => {
    fetch("https://api.github.com/users/" + searchGitHubUsername, {})
      .then(response => {
        if (response.ok) {
          alert("user found!");
          response.json().then(data => {
            console.log(data);
            db.collection("users").add(data);
          });
        } else {
          alert("user not found!");
        }
      })
      .catch(error => alert("connection issue!"));
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <input
        value={searchGitHubUsername}
        onChange={e => setSearchGitHubUsername(e.target.value)}
      />
      <button onClick={onSearch}>Search</button>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.login}</li>
        ))}
      </ul>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
