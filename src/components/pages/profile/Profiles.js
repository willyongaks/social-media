import { useState, useEffect } from 'react'
import { Base_Post_Url } from '../../../constants/url/BaseUrl';
import { token } from '../../../constants/url/BaseUrl';
import '../../../styles/profile/styles.scss'
import { Link } from 'react-router-dom';
import FollowProfile from './FollowProfile';

const url = Base_Post_Url + "profiles";

const options = {
    headers: {
        Authorization: `Bearer ${token}`,
    },
};

function Profiles() {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  
    const [displayedProfiles, setDisplayedProfiles] = useState(profiles);


    useEffect(() => {
         async function fetchProfiles() {
             try{
                 const response = await fetch(url, options);
                 if(!response.ok) {
                     throw new Error(response.statusText)
                 }
                 const data = await response.json();
                 setProfiles(data);
                 setLoading(false);
                 setDisplayedProfiles(data.slice(0, 5));
                  console.log(data)

             }catch(error){
                setError(error);
                setLoading(false);
                 
             }
         }
         fetchProfiles();
    }, []);

    const handleShowMore = () => {
        const nextFiveProf = profiles.slice(displayedProfiles.length,displayedProfiles.length + 5);
        setDisplayedProfiles(displayedProfiles.concat(nextFiveProf))
    }

    if(loading){
        return <p>Loading....</p>
    }
    if(error){
        return <p>{error.message}</p>
    }
    
  return (
    <div className='container profile-section'>
        <div>
            <h6 className='text-center p-4 fw-bold'>Make connections</h6>
        </div>
        
            {profiles.length > 0 ? (
            displayedProfiles.map((profile) => {
                return (
                    <div className='profile-card-container' key={profile.name}>
                        <div className='container profile-card-info' >
                            <Link to={`/details/${profile.name}`} className='link'>
                                <div className='profile-card-left'>
                                    <div className='profile-card-media'>
                                        <img src={profile.avatar || 'https://images.unsplash.com/photo-1628260412297-a3377e45006f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80'} alt={profile.avatar} />
                                    </div>
                                    <div className="profile-title">
                                        <h6>{profile.name}</h6>
                                    </div>
                                </div>
                            </Link>
                            <div className='profile-button'>
                                <FollowProfile name={profile.name} isFollowing={false} />
                            </div>
                        </div>
                   </div>
                    
                )
            }) 
        ): (<p> No profiles found</p> )} 
        {displayedProfiles.length < profiles.length && (
            <button onClick={handleShowMore} className=''>Show More</button>
        )}
        
    </div>
  )
  
}

export default Profiles