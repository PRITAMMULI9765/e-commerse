import React, { Component, useState } from "react";

export default class DummyProp extends Component {
  render() {
    let state = 1;
    const handleClck = () => {
      let state1 = state + 1;
      return state1;
    };
    return (
      <>
        <button
          onClick={() => {
            handleClck();
          }}
        >
          Click me
        </button>
        <p>hello {handleClck()}</p>
      </>
    );
  }
}
