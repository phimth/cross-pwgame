import React, { useState, useEffect  } from "react";

const MagicNumber = ({ io,nickname }) => {
    const [number, setNumber] = useState("");

    const [resultat, setResultat] = useState("");
  
    const handleNumber = event => {
        setNumber(event.target.value);
    };
  
    const sendNumber = () => {
      io.emit("event::magicNumber", { number,nickname});
    };

    useEffect(()=>{
        io.on("event::magicNumberState", payload =>{
            setResultat(payload.state)
        })
    },[])

    return (
      <div className="field">
        <div className="control">
          <input className="input" onChange={handleNumber} value={number} />
        </div>
        <div className="control">
          <a className="button is-info" onClick={sendNumber}>
            Guess
          </a>
          <span>The result is {resultat}</span>
        </div>
      </div>
    );
  };

export default MagicNumber;
