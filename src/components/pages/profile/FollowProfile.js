import React, { useState, useEffect, useContext } from 'react';
import { Base_Post_Url } from '../../../constants/url/BaseUrl';
import AuthContext from '../../../context/AuthContext';


function FollowProfile({ name, followers }) {
  const [following, setFollowing] = useState(false);

  const url = Base_Post_Url + 'profiles';

  const auth = useContext(AuthContext)
 

  useEffect(() => {
    const nameInFollowArray = followers.some((follower) => follower.name === auth.name);
    setFollowing(nameInFollowArray);
  },[name,followers,setFollowing,auth.name])

  const handleFollow = async () => {
  try {
    if (!following) {
      const follow = await fetch(`${url}/${name}/follow`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      if (!follow.ok) {
        throw new Error(follow.statusText);
      }
      setFollowing(true);
      localStorage.setItem(`following_${name}`, true);
    } else {
      const unFollow = await fetch(`${url}/${name}/unfollow`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      if (!unFollow.ok) {
        throw new Error(unFollow.statusText);
      }
      setFollowing(false);
      localStorage.removeItem(`following_${name}`);
    }
  } catch (error) {
    console.log(error);
  }
};

  return (
    <>
      <button onClick={handleFollow}>
        {following ? 'Unfollow' : 'Follow'}
      </button>
    </>
  );
}

export default FollowProfile;
