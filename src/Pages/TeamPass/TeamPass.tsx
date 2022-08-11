import React, { useEffect, useState } from 'react'
import './TeamPass.scss';
import { pass } from '../../data/pass';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { registeruser } from '../../Features/user/userSlice'
import { RootState } from '../../Features/store';
import Login from '../Login';



const TeamPass = () => {
    
    const user = useSelector((state: RootState) => state.user.user)
    const dispatch = useDispatch()
    
    console.log(user)

    const navigate = useNavigate();
    const [teamPassword, setTeamPassword] = useState("");
    const [formData, setFormData] = useState({})
    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('formValues') || "");
            if (items) {
            setFormData(items);
        }

        // dispatch(register())
        // window.addEventListener("popstate", e => {
        //     // Nope, go back to your page
        //     navigate(1);
        // });


    }, []);

    useEffect(() => {
        window.addEventListener("popstate", e => {
            // Nope, go back to your page
            navigate(1);
        });
    }, [])

    // useEffect(() => {
    //       // checking if the user is true
    //       if(user)
    //       dispatch(registeruser());
    // }, [dispatch, user])



    console.log(formData);  //FORM DATA

    const checkTeamPass = (e: any) => {
        e.preventDefault();
        console.log(teamPassword);
        if(pass.includes(teamPassword)){
            navigate('/home')
        }else{
            alert("Please enter team password")
            setTeamPassword("");
        }
    }

    if(!user){
        return(
            <Login /> 
        )
    }

  return (
    <>{user && (
        <React.Fragment>
            <p>Team Pass</p>
            <form onSubmit={checkTeamPass}>
                <div>
                    <label>Team Password</label>
                    <input 
                        required
                        type="text" 
                        value={teamPassword}
                        onChange={(e: any) => setTeamPassword(e.target.value)}
                    />
                </div>

                <button type="submit">SUBMIT</button>
            </form>
        </React.Fragment>)}
    </>
  )
}

export default TeamPass