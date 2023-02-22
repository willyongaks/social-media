import React, { useState } from 'react';
import { Base_Post_Url } from '../../../constants/url/BaseUrl';
import '../../../styles/postStyles/styles.scss';
import { HiOutlineThumbUp } from "react-icons/hi";

function ReactToPost({ id, reactions }) {
  const [isReact, setIsReact] = useState(false);
 

  const auth = localStorage.getItem('auth')
  const token = JSON.parse(auth).accessToken;

  const url = `${Base_Post_Url}posts/${id}/react/👍`;

  async function onSubmit() {
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const results = await response.json();
        if (results.id) {
          setIsReact(true);
          window.location.reload();
        }console.log(results)
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }

  return (
    <>
      <button
        onClick={onSubmit}
        disabled={isReact}
        className={`react-button ${isReact ? 'is-reacted' : ''}`}
      >
        <HiOutlineThumbUp />
        Like
      </button>
    </>
  );
}

export default ReactToPost;
