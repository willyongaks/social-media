import React from 'react';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Base_Post_Url } from '../../../constants/url/BaseUrl';
import { token } from '../../../constants/url/BaseUrl';

const options = {
    headers: {
        Authorization: `Bearer ${token}`,
    },
};





function PostByProfile() {
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null);

    const { name } = useParams();
    
    const url = `${Base_Post_Url}profiles/${name}/posts`;

    useEffect(() => {
        async function fetchPosts(){
            try{
                const response = await fetch(url, options);

                if(response.ok){
                    const json = await response.json();
                    setPost(json);
                }
            }catch(error){
                setError(error)
            }finally{
                setLoading(false)
            }
        }
        fetchPosts();
    },[name, url])



    if(loading){
        return <div>Loading...</div>
    }
    if(error){
        return <div>{error}</div>
    }
    if(!post){
        return <div>No posts found</div>
    }
  return (
    <>
    {post.length > 0 ? (
        post.map((posts) => {
            return(
                <div key={posts.id}>
                    <h1>{posts.title}</h1>
                </div>
            )
        })
    ): (
        <p>No posts found</p>
    )}

    </>
  )
}

export default PostByProfile