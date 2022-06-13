import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';

export default function(){
    return (
        <body>
            <div>
                <Link to = '/home'>
                    <button>Login</button>
                </Link>
            </div>
        </body>
    );
};