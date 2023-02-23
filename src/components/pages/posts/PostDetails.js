import React, {useEffect, useState, } from 'react';
import { Base_Post_Url } from '../../../constants/url/BaseUrl';
import { useParams, useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import ReactToPost from './ReactToPost';
import CommentToPost from './CommentToPost';
import '../../../styles/postStyles/styles.scss';



function PostCard({ post }) {
  return (
      <div className='card-container'>
           <Card className="card-body">
                <Card.Header className="card-header">
                    <Card.Title>{post.title}</Card.Title>
                </Card.Header>
                <Card.Img
                    className="card-image"
                    variant="top"
                    src={
                    post.media ||
                    'https://images.unsplash.com/photo-1675488676123-ec2e17de304d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
                    }
                />
                <Card.Body>
                    <Card.Text>{post.body}</Card.Text>
                    <div className="card-button">
                    <ReactToPost
                        id={post.id}
                        reactions={post._count.reactions}
                        className="Like-button"
                    />
                    <CommentToPost
                        id={post.id}
                        comments={post._count.comments}
                        className="comment-button"
                    />
                    </div>
                </Card.Body>
            </Card>

      </div>

  );
}



function PostDetails() {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const auth = JSON.parse(localStorage.getItem('auth'));
  const token = auth.accessToken;

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate('/home');
      return;
    }

    const fetchPost = async () => {
      try {
        const response = await fetch(`${Base_Post_Url}posts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const json = await response.json();
          setPost(json);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, navigate, token]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return <PostCard post={post} />;
}

export default PostDetails;