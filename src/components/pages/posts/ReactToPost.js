import React, { useState } from 'react';
import { Base_Post_Url } from '../../../constants/url/BaseUrl';
import '../../../App.css';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

function ReactToPost({ id }) {
  const [isReact, setIsReact] = useState(false);
  const [count, setCount] = useState(0);

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
          setCount(results._count.reactions);
          
        }console.log(results)
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
      <Button
        variant={isReact ? "success" : "primary"}
        onClick={onSubmit}
        disabled={isReact}
      >
        {isReact ? (
          <>
            <FontAwesomeIcon icon={faCheck} /> Reacted
          </>
        ) : (
          <>
            React <Badge bg="secondary">{count}</Badge>
          </>
        )}
        <span className="visually-hidden">{count}</span>
      </Button>
    </>
  );
}

export default ReactToPost;
