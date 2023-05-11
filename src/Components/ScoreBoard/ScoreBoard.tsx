import React from 'react'
import { NavLink } from 'react-router-dom';
import BoardCount from '../../Molecules/BoardCount/BoardCount';
import './ScoreBoard.scss';

const ScoreBoard = () => {
    return (
        <div className="scoreBoard">

            {/* SCORE-BOARD HEADER */}
            <div className="scoreBoard__header">
                <p className="scoreBoard__headerText">Scoreboard</p>
                <p className="scoreBoard__headerSubText">Registered Team Members</p>
            </div>
            
            <div className="scoreBoard__body">

                <BoardCount 
                    teamName='Jericho'
                    teamNumber={390}
                    backgroundColor='#3212BF'
                    border='0.5px solid lightgrey'
                    percent={80}
                    opacity={70}
                />

                <BoardCount 
                    teamName='Bethany'
                    teamNumber={350}
                    backgroundColor='#3212BF'
                    border='0.5px solid lightgrey'
                    percent={70}
                    opacity={70}
                />             

                <BoardCount 
                    teamName='Nile'
                    teamNumber={330}
                    backgroundColor='#3212BF'
                    border='0.5px solid lightgrey'
                    percent={65}
                    opacity={70}
                />   

                <BoardCount 
                    teamName='Galilee'
                    teamNumber={300}
                    backgroundColor='#3212BF'
                    border='0.5px solid lightgrey'
                    percent={58}
                    opacity={70}
                />   

                <BoardCount 
                    teamName='Carpernaum '
                    teamNumber={280}
                    backgroundColor='#3212BF'
                    border='0.5px solid lightgrey'
                    percent={50}
                    opacity={70}
                />   

                <BoardCount 
                    teamName='Jordan'
                    teamNumber={220}
                    backgroundColor='#3212BF'
                    border='0.5px solid lightgrey'
                    percent={40}
                    opacity={70}
                />   
            </div>
        </div>
    )
  }

export default ScoreBoard

// Header => Serif
// body => san serif