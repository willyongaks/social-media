import React, { useContext } from 'react';
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Base_Post_Url } from '../../../constants/url/BaseUrl';
import AuthContext from '../../../context/AuthContext';
import '../../../styles/profile/styles.scss';
import PostByProfile from '../posts/PostByProfile';
import ProfilesPost from './ProfilesPost';




function ProfileDetails() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const auth = useContext(AuthContext)

    let navigate = useNavigate();
    let { name } = useParams();
    


    if(!name){
    navigate("/home");
    }

    const url = `${Base_Post_Url}profiles/${name}`;
    

    useEffect(() => {
        async function fetchData() {
            try{
                const response = await fetch(url, {
                    headers: {
                        Authorization: `Bearer ${auth.accessToken}`,
                    },
                });
                console.log(response)

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
    }, [name, url, auth.accessToken])



     if (loading) {
    return <div>Loading...</div>;
    }

    if (error) {
        return <div>An error occured: {error}</div>;
    }
    if (!profile) {
    return <div>profile not found</div>;
    }
    return (
        <>
        <div key={profile.name} className='profile-details-container'>
            <div className='profile-details-banner'>
                <img src={profile.banner || 'https://images.unsplash.com/photo-1497802176320-541c8e8de98d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1015&q=80'} alt={profile.banner} />
            </div>
            <div className='profile-details-avatar'>
                <img src={profile.avatar || 'https://images.unsplash.com/photo-1628260412297-a3377e45006f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80'} alt={profile.banner} />
            </div>
            <h6>{profile.name}</h6>
            <div className='profile-posts'>
                <PostByProfile />
            </div>
        </div>
        <div>
            <ProfilesPost profName={profile.name}/>
        </div>
        </>
    )
}

export default ProfileDetails;