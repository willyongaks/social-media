import React, { useEffect, useState } from 'react';
import { Base_Post_Url} from '../../../constants/url/BaseUrl';
import Card from 'react-bootstrap/Card';
import DeletePost from '../posts/DeletePost';
import UpdatePost from '../posts/UpdatePost';
import '../../../styles/profile/profileDash.scss';
import { Col, Row } from 'react-bootstrap';



function AuthPosts() {
    const[post, setPost] = useState([]);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null);
    
    const auth = localStorage.getItem('auth')
    const name = JSON.parse(auth)?.name;
    const token = JSON.parse(auth).accessToken;
    const url = `${Base_Post_Url}profiles/${name}/posts`

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
    },[url, token])

    if(loading){
        return <div>Loading...</div>
    }
    if(error){
        return <div>{error}</div>
    }
  return (
    <>
      <div className='pst-title c-white container'>
        <h5 className='Post-heading'>Recent posts</h5>
      </div>
      <Row xs={1} md={2} lg={3} className='g-4'>
        {post.length > 0 ? (
          post.map((post) => (
            <Col key={post.id}>
              <Card className='card-body'>
                <Card.Header className='card-header'>
                  <Card.Title className='card-title'>{post.title}</Card.Title>
                </Card.Header>
                <Card.Img className='card-image' variant="top" src={post.media || "https://images.unsplash.com/photo-1675488676123-ec2e17de304d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"} />
                <Card.Body>
                  <Card.Text className='card-text'>{post.body}</Card.Text>
                  <div className='auth-card-button'>
                    <UpdatePost postId={post.id}/>
                    <DeletePost postId={post.id}/>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No posts found</p>
        )}
      </Row>
    </>
  )
}

export default AuthPosts