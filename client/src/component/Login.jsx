import React from "react";
import "./Login.css";

const Login = (props) => {
  return (
    <>
      <div className="login__ --100vh --flex-center --dir-column">
        <h1>Decentralized Voting Application.</h1>

        <div>
          <span className="--text-grey --text-sm">
            {" "}
            Developed on <a href="">Lisk Protocol</a>
          </span>
        </div>

        <button className="--btn --btn-primary" onClick={props.connectWallet}>
          Login to metamask
        </button>
      </div>
    </>
  );
};

export default Login;
