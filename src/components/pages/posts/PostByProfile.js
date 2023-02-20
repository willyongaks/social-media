import React from 'react';
import { useState, useEffect } from "react";
import { Base_Post_Url } from '../../../constants/url/BaseUrl';
import ReactToPost from './ReactToPost';
import CommentToPost from './CommentToPost';
import Card from 'react-bootstrap/Card';
import '../../../styles/postStyles/styles.scss';







function PostByProfile() {
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null);

   
    const auth = localStorage.getItem('auth')
    const name = JSON.parse(auth)?.name;
    const token = JSON.parse(auth).accessToken;
    console.log(auth)
    
    const url = `${Base_Post_Url}profiles/${name}/posts`;

    useEffect(() => {
        async function fetchPosts(){
            try{
                const response = await fetch(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

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
    },[name, url, token])



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
                    <Card className='card-body m-3'>
                            <Card.Header className='card-header'>
                               <Card.Title>{posts.title}</Card.Title>
                            </Card.Header>
                            <Card.Img className='card-image' variant="top" src={posts.media || "https://images.unsplash.com/photo-1675488676123-ec2e17de304d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"} />
                            <Card.Body>
                                <Card.Text>{posts.body}</Card.Text>
                                <ReactToPost id={posts.id}  reactions={post._count.reactions} className='Like-button'/>
                                <CommentToPost id={posts.id} comments={post._count.comments} className='comment-button'/>
                                
                            </Card.Body>
                        </Card>
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