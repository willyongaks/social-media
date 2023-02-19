import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import { Base_Post_Url } from "../../../constants/url/BaseUrl";

function FollowProfile({ name, followers }) {
	const [following, setFollowing] = useState(false);

	const [auth] = useContext(AuthContext);

	const url = Base_Post_Url + "profiles";

	useEffect(() => {
		const nameIsInFollowersArray = followers.some((follower) => follower.name === auth.name);
		setFollowing(nameIsInFollowersArray);
	}, [followers, name, setFollowing, auth.name]);

	const handleFollow = async () => {
		try {
			if (!following) {
				const follow = await fetch(`${url}/${name}/follow`, {
					method: "PUT",
					headers: {
						Authorization: `Bearer ${auth.accessToken}`,
					},
				});
				if (!follow.ok) {
					throw new Error(follow.statusText);
				}
				setFollowing(true);
			} else {
				const unFollow = await fetch(`${url}/${name}/unfollow`, {
					method: "PUT",
					headers: {
						Authorization: `Bearer ${auth.accessToken}`,
					},
				});
				if (!unFollow.ok) {
					throw new Error(unFollow.statusText);
				}
				setFollowing(false);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return <button onClick={handleFollow}>{following ? "Unfollow" : "+ Follow"}</button>;
}

export default FollowProfile;
