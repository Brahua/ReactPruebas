import React, { Component } from "react";
import Reloj from "./Reloj";
import logo from "./../logo.svg";
import "./Index.css";

const library = <h2 className="react">React JS</h2>;
const user = {
  firstName: "Josue",
  lastName: "Bravo"
};
function formatName(user) {
  return user.firstName + " " + user.lastName;
}
function getGreeting(user) {
  if (user) {
    return <h4>Hola {formatName(user)}</h4>;
  } else {
    return <h4>Hola extraño</h4>;
  }
}

function UserCards(props){
    const users = props.users.map(user => (
      <div className="col-sm-12 col-md-6 col-lg-4" key={user.id}>
        <div
          className="card bg-light mb-3 border-info"
          style={{ marginTop: 10 }}
        >
          <div className="card-header text-info">{user.name}</div>
          <div className="card-body text-dark">
            <h5 className="card-title">{user.username}</h5>
            <p className="card-text">
              {user.address.street} <br />
              {user.address.suite} <br />
              {user.address.city}
            </p>
          </div>
        </div>
      </div>
    ));

    return users;
}

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertClick: false,
      users: []
    };
    this.handleAlertClick = this.handleAlertClick.bind(this);
    this.handleGetPersons = this.handleGetPersons.bind(this);
  }
  handleAlertClick(e) {
    e.preventDefault();
    this.setState({
      alertClick: !this.state.alertClick
    });
  }
  handleGetPersons(){
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(users => 
        this.setState({
          users: users
        })
      );
  }
  componentDidMount() {
    this.handleGetPersons();
  }
  
  render() {
    return (
      <>
        <div className="contenedor text-center">
          {this.state.alertClick && (
            <div
              className="alert alert-primary alert-dismissible fade show"
              role="alert"
            >
              <strong>Manejador de Eventos: </strong> onClick
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
                onClick={this.handleAlertClick}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          )}
          {library}
          {getGreeting(user)}
          <img src={logo} className="app-logo" alt="logo" />
          <Reloj />

          <div className="row p-3">
            <div className="col-12 d-flex justify-content-center flex-wrap">
              <UserCards users={this.state.users} />
            </div>
          </div>

          <button
            type="button"
            className="btn btn-info"
            onClick={this.handleAlertClick}
          >
            {this.state.alertClick === true ? "Ocultar" : "Click me!"}
          </button>
        </div>
      </>
    );
  }
}

export default Index;
