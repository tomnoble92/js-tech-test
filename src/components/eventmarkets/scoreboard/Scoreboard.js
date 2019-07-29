import React from 'react';
import './scoreboard.css'

function Scoreboard(props) {
  return(
    <div className="scoreboard">
        <div className="scoreboard__team scoreboard__team--home">
            <div className="scoreboard__name">{props.teams[0].name}</div>
            <div className="scoreboard__score">{props.scores.home}</div>
        </div> 
        <div className="scoreboard__team scoreboard__team--away">
            <div className="scoreboard__name">{props.teams[1].name}</div>
            <div className="scoreboard__score">{props.scores.away}</div>
        </div>
    </div> 
  )
}

export default Scoreboard;

