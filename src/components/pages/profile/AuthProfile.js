import { useState, useEffect } from 'react';
import { Base_Post_Url } from '../../../constants/url/BaseUrl';



const auth = JSON.parse(localStorage.getItem('auth'))
const token = (auth).accessToken
const name = (auth).name
const profileUrl = `${Base_Post_Url}profiles/${name}`;
const options = {
    headers: {
        Authorization: `Bearer ${token}`,
        
    },
};

console.log(token)

 export const fetchData = async (setAuthProfile, setLoading,setError) => {
      try {
        const response = await fetch(profileUrl, options);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        setAuthProfile(data);
        setLoading(false);
        // console.log(data)
      } catch (error) {
        setError(error);
        setLoading(false);
      }
};


function AuthProfile() {
    const [authProfile, setAuthProfile] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);




    
  useEffect(() => {
    fetchData(setAuthProfile, setLoading,setError);
  }, []);

 

  if (loading) {
    return <p>loading.....</p>
  }
  if (error) {
    return <p>{error.massage}</p>
  }



  return (
    <div>
        <div className=''>
            <div className='authProf'>
                <h4>Welcome {authProfile.name}</h4>
                <p>Create a new post</p>
            </div>
            
        </div>
    </div>
  )
}

export default AuthProfile