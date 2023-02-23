import React, { useEffect, useState } from 'react';
import { Base_Post_Url } from "../../../constants/url/BaseUrl";
import ReactToPost from './ReactToPost';
import CommentToPost from './CommentToPost';
import Card from 'react-bootstrap/Card';
import '../../../styles/postStyles/styles.scss';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



const url = Base_Post_Url + "posts";



function Posts() {
  const [results, setResults] =useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(20);

  const auth = localStorage.getItem('auth')
  const token = JSON.parse(auth).accessToken;
  


  
  useEffect(() => {
  const fetchData = async () => {
    try{
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if(!response.ok){
        throw new Error(response.statusText);
      }
      const data = await response.json();
      setResults(data);
      setLoading(false);
      
      console.log(data)
    } catch(error) {
      setError(error);
      setLoading(false);
    }
  }

  fetchData()
}, [token])



  if(loading){
    return <p>loading.....</p>
  }
  if(error){
    return <p>{error.massage}</p>
  }
  


  return (

    <> 
      <div className='pst-title c-white'>
        <h5 className='Post-heading container'>Recent posts</h5>
      </div> 
      <div className='card-container'>
        {results.length > 0 ? (
          results.map((post) => {
            const body = post.body.slice(0, limit);
            const isLongText = post.body.length > limit;
        return(
          <div key={post.id} className='post-card col' >
            <Container>
              <Row >
                <Col>
                  <Card className='card-body '>
                      <Card.Header className='card-header'>
                        <Card.Title className='card-title'>{post.title}</Card.Title>
                      </Card.Header>              
                      <Card.Body>
                        <Card.Text className="card-text">{body}{isLongText &&
                          <span>...
                            <button 
                              className='show-more-text'
                              onClick={() => setLimit(post.body.length)
                            } 
                            >
                            Show more</button>
                          </span>}
                        </Card.Text>
                      </Card.Body>
                      <Link to={`/post/${post.id}`} className='link' >
                        <Card.Img className='card-image' variant="top" src={post.media || "https://images.unsplash.com/photo-1675488676123-ec2e17de304d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"} />
                      </Link>
                      <div className='card-count-container'>
                          <span className='card-count-item'> 👍{post._count.reactions}</span>
                          <span className='card-count-item'>{post._count.comments} comments</span>

                        </div>
                      <div className='comment-card-button'>
                            <ReactToPost id={post.id}  reactions={post._count.reactions} />
                            <CommentToPost id={post.id} comments={post._count.comments} className='comment-button'/>
                          </div>
                    </Card>
                </Col>
              </Row>
            </Container>   
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