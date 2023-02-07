import React from 'react';
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Base_Post_Url } from '../../../constants/url/BaseUrl';
import { token } from '../../../constants/url/BaseUrl';


const options = {
    headers: {
        Authorization: `Bearer ${token}`,
    },
};


function ProfileDetails() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    let navigate = useNavigate();
    const { name } = useParams();
    


    if(!name){
    navigate("/home");
    }

    const url = Base_Post_Url;

    useEffect(() => {
        async function fetchData({name}) {
            try{
                const response = await fetch(`${url}profiles/${name}`, options);

                if(response.ok){
                    const json = await response.json();
                    setProfile(json);
                    console.log(name)
                }

            }catch(error){
                setError(error);
            }finally{
                setLoading(false);
            }
        }
        fetchData();
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
        <div key={profile.name}>
            <h1 >{profile.name}</h1>
        </div>
    )
}

export default ProfileDetails