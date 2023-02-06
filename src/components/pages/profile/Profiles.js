import { useState, useEffect } from 'react'
import { Base_Post_Url } from '../../../constants/url/BaseUrl';
import { token } from '../../../constants/url/BaseUrl';
// import FollowPost from '../post/FollowPost';

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
                    <div className='' key={profile.name}>
                        <div className=''>
                            <div className="card-header">{profile.name}</div>
                            <div className="card-body text-primary d-flex">
                                {/* <ul className={styles.status}>
                                    <li className={styles.statusLi}>
                                        <span className={styles.statusvalue}>{profile._count.followers}</span>
                                        <span className="status-text">Followers</span>
                                    </li>
                                    <li className={styles.statusLi}>
                                        <span className={styles.statusvalue}>{profile._count.following}</span>
                                        <span className="status-text">Following</span>
                                    </li>
                                    <li className={styles.statusLi}>
                                        <span className={styles.statusvalue}>{profile._count.posts}</span>
                                        <span className="status-text">Posts</span>
                                    </li>
                                </ul> */}
                            </div>
                        </div>
                        
                        <div className=''>
                            {/* <FollowPost name={profile.name} /> */}
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