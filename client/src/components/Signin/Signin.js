import React from "react";
import "./Signin.css";
let url = "https://login.uber.com/oauth/v2/authorize?" +
    "response_type=code&client_id=w8BiFEe_pvOo9cg6VFa-oxIs_lpyL_ll&scope=request" +
    "%20profile%20history&redirect_uri=https://project3team2.herokuapp.com/"

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: ""
    };
  }

  onEmailChange = event => {
    this.setState({ signInEmail: event.target.value });
  };

  onPasswordChange = event => {
    this.setState({ signInPassword: event.target.value });
  };

  saveAuthTokenInSessions = token => {
    window.sessionStorage.setItem("token", token);
  };

  onSubmitSignIn = () => {
    fetch("/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data && data.success === "true") {
          this.saveAuthTokenInSessions(data.token);
          this.props.loadUser(data.user);
          this.props.onRouteChange("home");
        }
      })
      .catch(console.log);
  };

  render() {
    const { onRouteChange } = this.props;
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0 bg-lightest-blue">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6 bg-lightest-blue" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="b pa2 input-reset ba bg-black white w-100 autoFill"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6 bg-lightest-blue" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-black white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <a href={url}><input
                onClick={this.onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--black bg-lightest-blue grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
              </a>
            </div>
            <div className="lh-copy mt3">
              <p
                onClick={() => onRouteChange("register")}
                className="f6 link dim black db pointer bg-lightest-blue"
              >
                Register
              </p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Signin;
