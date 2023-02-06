import React, { useState} from 'react'
import { Base_Post_Url } from '../../../constants/url/BaseUrl';
import { token } from '../../../constants/url/BaseUrl';



 const url = Base_Post_Url + "profiles";
function FollowPost({name}) {
    const [following, setFollowing] = useState(false);

   const handleFollow = async () => {
    try {
        if (following) {
            const unfollowResponse = await fetch(`${url}/${name}/unfollow`,{
                method: 'PUT',
            });
            if (!unfollowResponse.ok) {
                throw new Error(unfollowResponse.statusText);
            }
        } else {
            const followResponse = await fetch(`${url}/${name}/follow`,{
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!followResponse.ok) {
                throw new Error(followResponse.statusText);
            }
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

export default FollowPost