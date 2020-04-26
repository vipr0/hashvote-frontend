import React from "react";

const VotingEditor = ({ match }) => {
  return (
    <div className="editor">
      <p>Voting Editor</p>
      <p>Voting id: {match.params.votingId}</p>
    </div>
  );
};

export default VotingEditor;
