 import React, { useState} from 'react'
import { Base_Post_Url, token } from '../../../constants/url/BaseUrl';




function FollowProfile({name}) {
    const [following, setFollowing] = useState(false);
    
    const url = Base_Post_Url + "profiles";

   const handleFollow = async () => {
    try {

        if (!following) {
            const follow = await fetch(`${url}/${name}/follow`,{
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`
                }
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