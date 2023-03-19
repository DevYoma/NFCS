import React from 'react'
import { NavLink } from 'react-router-dom';
import BoardCount from '../../Molecules/BoardCount/BoardCount';
import './ScoreBoard.scss';

const ScoreBoard = () => {
    return (
        <div className="scoreBoard">

            <h2 className="scoreBoard__header">Team Scoreboard</h2>
            <p 
                className="scoreBoard__text">You have not registered as a member of your team yet 😑? {" "}
                <NavLink to={"/register"}>tap here to register</NavLink>
            </p>

            {/* BOARD COUNT */}
            <div className="scoreBoard__count">

                <BoardCount 
                    name='Jericho'
                    backgroundColor='#4318FFB2'
                    border='1px solid black'
                    percent={90}
                    opacity={70}
                />
                <BoardCount 
                name='Galilee'
                backgroundColor='#4318FFB2'
                border='1px solid black'
                percent={80}
                opacity={70}
                />

                <BoardCount 
                    name='Jordan'
                    backgroundColor='#4318FFB2'
                    border='1px solid black'
                    percent={70}
                    opacity={70}
                />

                <BoardCount 
                    name='Nile'
                    backgroundColor='#4318FFB2'
                    border='1px solid black'
                    percent={60}
                    opacity={70}
                />

                <BoardCount 
                    name='Bethany'
                    backgroundColor='#4318FFB2'
                    border='1px solid black'
                    percent={50}
                    opacity={70}
                />

                <BoardCount 
                    name='Carpanaum'
                    backgroundColor='#4318FFB2'
                    border='1px solid black'
                    percent={40}
                    opacity={70}
                />
            </div>
            
        </div>
    )
  }

export default ScoreBoard