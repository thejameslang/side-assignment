import React from "react";
import logo from "./logo.svg";
import "./App.css";
import firebase from "./firebase";
import moment from "moment";

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
  });

  return (
    <div className="App">
      <div className="container">
        <input
          value={searchGitHubUsername}
          onChange={e => setSearchGitHubUsername(e.target.value)}
        />
        <button onClick={onSearch}>Search</button>
        <table className="table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Name</th>
              <th>Public Repos</th>
              <th>Public Gists</th>
              <th>Followers</th>
              <th>Following</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <th>
                  <a href={user.html_url}>{user.login}</a>
                </th>
                <th>{user.name}</th>
                <th>{user.public_repos}</th>
                <th>{user.public_gists}</th>
                <th>{user.followers}</th>
                <th>{user.following}</th>
                <th>{moment(user.created_at).format("MM/DD/YYYY")}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul></ul>
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
