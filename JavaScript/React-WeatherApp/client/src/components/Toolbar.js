import React, { Component } from "react";

const toolbarStyle = {
  display: "flex",
  alignself: "stretch",
  backgroundColor: "#FE2E2E",
  padding: "6px 8px",
  height: "75px",
};

const headerStyle = {
  color: "white",
  alignself: "stretch",
  fontSize: "40px",
  paddingLeft: "30px",
  margin: "auto",
  fontFamily: "Fira Sans",
};

class Toolbar extends Component {
  render() {
    return (
      <div style={toolbarStyle}>
        <img
          className="icon"
          src="this_is_fine.png"
          alt="Logo"
          height="70"
          width="70"
        />
        <p style={headerStyle}>Slogan</p>
        <div style={{ flex: 1 }}></div>
        <button>Login</button>
        <button>About</button>
        <button>Contact</button>
      </div>
    );
  }
}

export default Toolbar;
