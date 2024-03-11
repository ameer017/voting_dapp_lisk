import React from "react";
import "./Login.css";

const Connected = (props) => {
  return (
    <>
      <div className="login__ --100vh --flex-center --dir-column">
        <h1>You're connected to Metamask.</h1>

        <p>Metamask account: {props.account}</p>
        
      </div>
    </>
  );
};

export default Connected;
