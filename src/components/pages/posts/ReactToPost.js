import React, { useState } from 'react';
import { Base_Post_Url, token } from '../../../constants/url/BaseUrl';
import { CiHeart } from 'react-icons/ci';
import '../../../App.css';

function ReactToPost({ id, symbol }) {
  const [isReact, setIsReact] = useState(false);
  const [postId, setPostId] = useState(null);

  const urlForReactingToPost = `${Base_Post_Url}posts/${id}/react/❤️`;

  async function onSubmit() {
    try {
      const response = await fetch(urlForReactingToPost, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const results = await response.json();
        if (results.id) {
          setPostId(results.id);
          setIsReact(true);
        }
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.log(`Error: ${error.message}`);
      // Add an error message or some kind of feedback for users
    }
  }

  return (
    <>
      {postId && <p className="post-id">Post ID: {postId}</p>}
      <button onClick={onSubmit} className="Like-button">
        {isReact ? symbol : symbol} <CiHeart />
      </button>
    </>
  );
}

export default ReactToPost;
