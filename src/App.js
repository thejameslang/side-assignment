import React from "react";
import firebase from "./firebase";
import moment from "moment";

function App() {
  const [searchGitHubUsername, setSearchGitHubUsername] = React.useState("");
  const [users, setUsers] = React.useState([]);
  const [searchNotification, setSearchNotification] = React.useState("");

  const db = firebase.firestore();

  const fetchData = async () => {
    const data = await db.collection("users").get();
    setUsers(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  };

  const onSearch = e => {
    e.preventDefault();
    fetch("https://api.github.com/users/" + searchGitHubUsername, {})
      .then(response => {
        if (response.ok) {
          // alert("user found!");
          setSearchNotification("success");
          response.json().then(data => {
            console.log(data);
            db.collection("users").add(data);
          });
        } else {
          // alert("user not found!");
          setSearchNotification("failure");
        }
      })
      .catch(error => {
        // alert("connection issue!");
        setSearchNotification("failure");
      });
  };

  React.useEffect(() => {
    fetchData();
    if (searchNotification.length > 0) {
      setTimeout(() => {
        setSearchNotification("");
      }, 2000);
    }
  });

  return (
    <section className="App section">
      <div className="container">
        <div className="columns">
          <div className="column">
            <form onSubmit={onSearch}>
              <div className="field">
                <div className="control">
                  <input
                    className="input is-primary"
                    type="text"
                    placeholder="Enter GitHub username to search here"
                    value={searchGitHubUsername}
                    onChange={e => setSearchGitHubUsername(e.target.value)}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        {searchNotification === "success" && (
          <div className="columns">
            <div className="column">
              <div className="notification is-found">
                Success: user "{searchGitHubUsername}" added to the db.
              </div>
            </div>
          </div>
        )}
        {searchNotification === "failure" && (
          <div className="columns">
            <div className="column">
              <div className="notification is-found">
                Error: Error adding "{searchGitHubUsername}" to the db.
              </div>
            </div>
          </div>
        )}

        <div className="columns">
          <div className="column">
            <table className="table is-striped is-fullwidth is-hoverable">
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
        </div>
      </div>
    </section>
  );
}

export default App;
