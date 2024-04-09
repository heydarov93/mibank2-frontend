import {useNavigate} from 'react-router-dom';
import React, {useEffect, useState} from 'react';

export const PrivateRoute = ({children}: { children: React.ReactNode}) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const checkUserToken = () => {
        const userToken = localStorage.getItem('userName');

        if (!userToken) {
            setIsLoggedIn(false);
            return navigate('/signin');

        }

        setIsLoggedIn(true);
    };

    useEffect(() => {
        checkUserToken();
    }, [isLoggedIn]);

    return <>{isLoggedIn ? children : null}</>;
}

