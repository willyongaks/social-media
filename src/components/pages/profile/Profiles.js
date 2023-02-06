import { useState, useEffect } from 'react'
import { Base_Post_Url } from '../../../constants/url/BaseUrl';
import { token } from '../../../constants/url/BaseUrl';
import '../../../styles/profile/styles.scss'
import FollowPost from '../posts/FollowPost';

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
    <div className=''>
        <div>
            <h6 className='text-center p-4 fw-bold'>Make connections</h6>
        </div>
        
        {profiles.length > 0 ? (
            displayedProfiles.map((profile) => {
                return (
                    <div className='profile-card-container container' key={profile.name}>
                        
                        <div className="card-info">
                            <div className="info-title">
                                <h6>{profile.name}</h6>
                            </div>
                        </div>
                        
                        <div className=''>
                            <FollowPost name={profile.name} />
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