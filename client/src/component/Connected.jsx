import React from "react";
import "./Login.css";

const Connected = (props) => {
  return (
    <>
      <div className="login__ --100vh --flex-center --dir-column">
        <h1>You're connected to Metamask.</h1>

        <p>Metamask account: {props.account}</p>
        <p>Remaining Time: {props.remainingTime}</p>

        <div>
          <input
            type="number"
            placeholder="Enter Candidate Index"
            value={props.number}
            onChange={props.handleNumberChange}
          />
          <button onClick={props.voteFunction}>Vote</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Index</th>
              <th>Candidate Name</th>
              <th>Candidate Votes</th>
            </tr>
          </thead>

          <tbody>
            {props.candidates.map((candidate, index) => (
              <tr key={index}>
                <td>{candidate.index}</td>
                <td>{candidate.name}</td>
                <td>{candidate.voteCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Connected;
