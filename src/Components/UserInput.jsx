import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeName } from '../store/slices/userName.slice';
import '../UserInput.css';
import Logo from '../assets/Logo.png'
const UserInput = () => {

    const [userName, setUserName] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const dispatchUserName = () => {
        dispatch(changeName(userName))
        navigate("/Pokedex")
    }

    return (
        <div className='input'>
            <div className='input-box'>
                <img src={Logo} alt="" className='pokeLogo' />
                <h1 className='input-Title'>¡Hello Trainer!</h1>
                <h3 className='input-Message'>To continue, give me your name</h3>
                <input type="text" value={userName} onChange={e => setUserName(e.target.value)} className='userInput' />
                <button type='button' onClick={dispatchUserName} className='userButton'>Send</button>
            </div>
        </div>
    );
};

export default UserInput;