import React, { useEffect, useState } from 'react';
import { Base_Post_Url, token } from '../../../constants/url/BaseUrl';

const auth = localStorage.getItem('auth')
const name = JSON.parse(auth).name;
const url = `${Base_Post_Url}profiles/${name}/posts`

function AuthPosts() {
    const[post, setPost] = useState([]);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null);

    useEffect(() => {
        async function fetchPost(){
            try{
                const response = await fetch(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if(response.ok){
                    const json = await response.json();
                    setPost(json)
                    console.log(json)
                }
            }catch(error){
                setError("Failed to load posts")
            }finally{
                setLoading(false)
            }
        }
        fetchPost()
    },[])

    if(loading){
        return <div>Loading...</div>
    }
    if(error){
        return <div>{error}</div>
    }
  return (
    <div>{post.id}</div>
  )
}

export default AuthPosts