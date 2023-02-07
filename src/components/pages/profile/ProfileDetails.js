import React from 'react';
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Base_Post_Url } from '../../../constants/url/BaseUrl';




function ProfileDetails() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    let navigate = useNavigate();
    const { id } = useParams();
    const url = Base_Post_Url(id);

    useEffect(() => {
        async function fetchData() {
            try{

            }catch(error){
                setError(error);
            }finally{
                setLoading(false);
            }
        }
    })



     if (loading) {
    return <div>Loading...</div>;
    }

    if (error) {
        return <div>An error occured: {error}</div>;
    }
    if (!profile) {
    return <div>Game not found</div>;
    }
    return (
        <div>ProfileDetails</div>
    )
}

export default ProfileDetails