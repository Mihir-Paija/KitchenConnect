import React, {useEffect} from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';
import LandingNavBar from "../components/LandingNavBar";
import styles from "../styles/landingPage.module.css"

const LandingPage = () =>{
    const { authState, setAuthState } = useAuth();
    const navigate = useNavigate();  
        useEffect(() =>{
            if(authState !== null)
                navigate('/dashboard')
        }, [])

        return (
        <div>
            <LandingNavBar />
            <div className={styles.landingPage}>
            <h1 className={styles.title}>KitchenConnect</h1>
            </div>
        </div>
    )
}

export default LandingPage