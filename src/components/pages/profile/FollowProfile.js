 import React, { useState} from 'react'
import { Base_Post_Url } from '../../../constants/url/BaseUrl';
import { token } from '../../../constants/url/BaseUrl';



 const url = Base_Post_Url + "profiles";
 
function FollowProfile({name}) {
    const [following, setFollowing] = useState(false);
    

   const handleFollow = async () => {
    try {

        if (following) {
            const follow = await fetch(`${url}/${name}/follow`,{
                method: 'PUT',
            });
            if (!follow.ok) {
                throw new Error(follow.statusText);
            }
        } else {
            const unFollow = await fetch(`${url}/${name}/unfollow`,{
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!unFollow.ok) {
                throw new Error(unFollow.statusText);
            }
            console.log(name)
        }
        setFollowing(!following);
    } catch (error) {
        console.log(error);
    }
};


  return (
    <>
        <button onClick={handleFollow}>{following ? 'Unfollow' : 'Follow'}</button>
    </>
  )
}

export default FollowProfile;