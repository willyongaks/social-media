import React, { useEffect, useState } from 'react';
import { Base_Post_Url } from "../../../constants/url/BaseUrl";
import { token } from '../../../constants/url/BaseUrl';
import ReactToPost from './ReactToPost';
// import CommentToPost from './CommentToPost';
import Card from 'react-bootstrap/Card';
import '../../../styles/postStyles/styles.scss';



const url = Base_Post_Url + "posts";

const options = {
    headers: {
        Authorization: `Bearer ${token}`,
    },
};


function Posts() {
  const [results, setResults] =useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await fetch(url, options);
        if(!response.ok){
          throw new Error(response.statusText);
        }
        const data = await response.json();
        setResults(data);
        setLoading(false);
        console.log(data)
      }catch(error) {
        setError(error);
        setLoading(false);
      }
      
    }

    fetchData()
  }, [])

  if(loading){
    return <p>loading.....</p>
  }
  if(error){
    return <p>{error.massage}</p>
  }
  


  return (

    <> 
           <div className='pst-title c-white'>
                <h5>Recent posts</h5>
            </div> 
      <div className='card-container'>
           
            
            {results.length > 0 ? (
                results.map((post) => {
                return(
                    <div key={post.id}>
                        <Card className='card-body m-3'>
                            <Card.Header className='card-header'>
                               <Card.Title>{post.title}</Card.Title>
                            </Card.Header>
                            <Card.Img className='card-image' variant="top" src={post.media || "https://images.unsplash.com/photo-1675488676123-ec2e17de304d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"} />
                            <Card.Body>
                                <Card.Text>{post.body}</Card.Text>
                                <div className='card-button'>
                                  <ReactToPost id={post.id}  reactions={post._count.reactions} className='Like-button'/>
                                  {/* <CommentToPost id={post.id} comments={post._count.comments} className='comment-button'/> */}
                                </div>
                                
                                
                            </Card.Body>
                        </Card>
                    </div>
                    
                )
                
                })
            ) : (
                <p>No posts found</p>
            )}
      </div> 
    </>

  )
}

export default Posts