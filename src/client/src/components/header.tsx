import axios from 'axios';
import { stat } from 'fs';
import React, { useEffect, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../scripts/auth-scripts';

import { RootState } from '../store/root-store';
import { logout } from '../store/user-store';

const Header: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const { isLogged, email, username, role } = user;
    
    useEffect(() => {}, [user]);

    const logoutClickHandler = async(e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const req = await axios.get("/api/auth/logout");
        
        if(req.data){
            dispatch(logout());
        }
    }

    if(!isLogged){
        return (
            <div>
                <a href={"http://localhost:4000/api/auth/login/google"}>Join with google</a>
            </div>
        );
    }
    
    return (
        <div>
            <p>{username} {email} {role}</p>
            <button onClick={logoutClickHandler}>LOGOUT</button>
        </div>
    );
}

export default Header;