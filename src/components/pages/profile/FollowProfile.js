import React, { useState, useEffect } from 'react';
import { Base_Post_Url, token } from '../../../constants/url/BaseUrl';

function FollowProfile({ name }) {
  const [following, setFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  const url = Base_Post_Url + 'profiles';

  const handleFollow = async () => {
  try {
    if (!following) {
      const follow = await fetch(`${url}/${name}/follow`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
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
          Authorization: `Bearer ${token}`,
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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${url}/${name}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        if (data.profile) {
            const storedFollowing = localStorage.getItem(`following_${name}`);
            setFollowing(storedFollowing === 'true');
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchProfile();
  }, [url, name]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <button onClick={handleFollow}>
        {following ? 'Unfollow' : 'Follow'}
      </button>
    </>
  );
}

export default FollowProfile;
