import React, { useState } from "react";

const AskNickname = ({ io,setNickname,nickname }) => {

  const [isLogged, setisLogged] = useState(false);

  const handleNickname = event => {
    setNickname(event.target.value);
  }; 

  const sendNickname = () => {
    io.emit("event::initialize", { nickname });
  };

  io.on("event::connected", () => {
    setisLogged(true);
  });

  return (
    <div className="field">
      <div className="control">
      {!isLogged ?
        <input className="input" onChange={handleNickname} value={nickname} /> :
        <input className="input" value={nickname} disabled/>
      }  
      </div>
      <div className="control">
      {!isLogged ? 
        <a className="button is-info" onClick={sendNickname}>
        <span>Login</span>
        </a>: 
        <a className="button is-info">
          <span>Waiting for oppenent...</span>
        </a>
      }
      </div>
    </div>
  );
};

export default AskNickname;
