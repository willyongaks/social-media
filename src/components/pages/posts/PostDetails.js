import React, {useEffect, useState, } from 'react';
import { Base_Post_Url } from '../../../constants/url/BaseUrl';
import { useParams, useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import ReactToPost from './ReactToPost';





function PostDetails() {
    const [results, setResults] =useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const auth = localStorage.getItem('auth')
    const token = JSON.parse(auth).accessToken;

    let navigate = useNavigate();
    let { id } = useParams();

    if(!id){
        navigate('/home')
    }
    
    const url = `${Base_Post_Url}posts/${id}`;

    useEffect(() => {
        const fetchPost = async () =>{
            try{
                const response = await fetch(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response)
                if(response.ok){
                    const json = await response.json();
                    setResults(json);
                }

            }catch(error){
                setError(error.message)
            }finally{
                setLoading(false)
            }
        }
        fetchPost()   
    })



    if(loading){
        return <p>Loading...</p>
    }
    if(error){
        return <p>{error.message}</p>
    }
  return (
    <div>
        <Card className='card-body m-3'>
                            <Card.Header className='card-header'>
                               <Card.Title>{results.title}</Card.Title>
                            </Card.Header>
                            <Card.Img className='card-image' variant="top" src={results.media || "https://images.unsplash.com/photo-1675488676123-ec2e17de304d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"} />
                            <Card.Body>
                                <Card.Text>{results.body}</Card.Text>
                                <div className='card-button'>
                                  <ReactToPost id={results.id}  reactions={results._count.reactions} className='Like-button'/>
                                  {/* <CommentToPost id={post.id} comments={post._count.comments} className='comment-button'/> */}
                                </div>
                                
                                
                            </Card.Body>
                        </Card>
    </div>
  )
}

export default PostDetails