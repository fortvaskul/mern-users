import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import axios from "axios";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "jwtToken"
    );
    axios
      .get("/api/home/users")
      .then(res => {
        this.setState({ users: res.data });
        console.log(this.state.users);
      })
      .catch(error => {
        if (error.response.status === 401) {
          this.props.history.push("/auth/sign_in");
        }
      });
  }

  logout = () => {
    localStorage.removeItem("jwtToken");
    window.location.reload();
  };

  render() {
    return (
      <div>
        {localStorage.getItem("jwtToken") && (
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                  <Link to="/" className="nav-item nav-link">
                    Home
                  </Link>
                </li>
              </ul>
            </div>
            <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
              <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                  <button
                    class="nav-item btn btn-primary"
                    onClick={this.logout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        )}
        <div class="container">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">USERS LIST</h3>
            </div>
            <div class="panel-body">
              <table class="table table-stripe">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Hobby</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.users.map(user => (
                    <tr>
                      <td>
                        <Link to={`/users/${user._id}`}>{user.name}</Link>
                      </td>
                      <td>{user.email}</td>
                      <td>{user.hobby}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Users;
