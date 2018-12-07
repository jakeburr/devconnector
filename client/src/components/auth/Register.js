import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux"; // Used to connect react component to redux
import { registerUser } from "../../actions/authActions"; // All actions brought in are used with props
import TextFieldGroup from "../common/TextFieldGroup";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }
  componentDidMount = () => {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    console.log(newUser);

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    // Destructuring errors.. pulling it out of state so you can use just errors
    const { errors } = this.state;

    return (
      <div>
        <div className="register">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Sign Up</h1>
                <p className="lead text-center">
                  Create your DevConnector account
                </p>
                <form onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    placeholder="Name"
                    name="name"
                    // Default type is 'text' in TextFieldGroup
                    value={this.state.name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextFieldGroup
                    placeholder="Email Address"
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    error={errors.email}
                    info="Use a Gravatar enabled email for a custom profile image"
                  />
                  <TextFieldGroup
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={errors.password}
                  />
                  <TextFieldGroup
                    placeholder="Confirm Password"
                    name="password2"
                    type="password"
                    value={this.state.password2}
                    onChange={this.onChange}
                    error={errors.password2}
                  />
                  <input
                    type="submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Map prop types with this and importing prop types
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

// Must declare this function with the states you want to use to use as (this.props.auth.name)
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors // auth can be named anything, it's simply a name declared for that component to use...    state.auth comes from rootreducer (index.js) in reducers.
});

export default connect(
  mapStateToProps,
  { registerUser } // Map all actions here
)(withRouter(Register));
