import React from 'react'
import BoardCount from '../../Molecules/BoardCount/BoardCount';
import './ScoreBoard.scss';

type ScoreBoardProps = {
    totalNumber: number;
    bethanyTeamNumber: number;
    capernaumTeamNumber: number;
    galileeTeamNumber: number;
    jerichoTeamNumber: number;
    jordanTeamNumber: number;
    nileTeamNumber: number;
}

const ScoreBoard = (props: ScoreBoardProps) => {
    // console.log(props);
    return (
        <div className="scoreBoard">

            {/* SCORE-BOARD HEADER */}
            <div className="scoreBoard__header">
                <p className="scoreBoard__headerText">Scoreboard</p>
                <p className="scoreBoard__headerSubText">Registered Team Members</p>
            </div>
            
            <div className="scoreBoard__body">

                <BoardCount 
                    teamName='Bethany'
                    teamNumber={props.bethanyTeamNumber}
                    border='0.5px solid lightgrey'
                    percent={(props.bethanyTeamNumber / props.totalNumber) * 100 || 7}
                    opacity={70}
                />

                <BoardCount 
                    teamName='Capernaum'
                    teamNumber={props.capernaumTeamNumber}
                    border='0.5px solid lightgrey'
                    percent={(props.capernaumTeamNumber / props.totalNumber) * 100 || 2}
                    opacity={70}
                />             

                <BoardCount 
                    teamName='Galilee'
                    teamNumber={props.galileeTeamNumber}
                    border='0.5px solid lightgrey'
                    percent={(props.galileeTeamNumber / props.totalNumber) * 100 || 14}
                    opacity={70}
                />   

                <BoardCount 
                    teamName='Jericho'
                    teamNumber={props.jerichoTeamNumber}
                    border='0.5px solid lightgrey'
                    percent={(props.jerichoTeamNumber / props.totalNumber) * 100 || 27}
                    opacity={70}
                />   

                <BoardCount 
                    teamName='Jordan '
                    teamNumber={props.jordanTeamNumber}
                    border='0.5px solid lightgrey'
                    percent={(props.jordanTeamNumber / props.totalNumber) * 100 || 10}
                    opacity={70}
                />   

                <BoardCount 
                    teamName='Nile'
                    teamNumber={props.nileTeamNumber}
                    border='0.5px solid lightgrey'
                    percent={(props.nileTeamNumber / props.totalNumber) * 100 || 10}
                    opacity={70}
                />   
            </div>
        </div>
    )
  }

export default ScoreBoard