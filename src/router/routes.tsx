import {createBrowserRouter} from 'react-router-dom';

import {ErrorPage, LoginPage, UnderDevPage} from '../pages';

import { PrivateRoute } from "./PrivateRoute";

import { App } from "App";

const routes = createBrowserRouter([
    {
        path: '/',
        element: 
        <PrivateRoute><App /></PrivateRoute>
        ,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/payments',
                element: <UnderDevPage />
            },
            {
                path: '/transfers',
                element: <UnderDevPage />
            },
            {
                path: '/history',
                element: <UnderDevPage />
            }
        ]
    },
    {
        path: '/signin',
        element:
        <LoginPage />
    }
]);


export {routes};