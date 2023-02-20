import React, { useState } from 'react';
import { Base_Post_Url } from '../../../constants/url/BaseUrl';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import '../../../App.css';
import { TfiCommentAlt } from 'react-icons/tfi';

function CommentToPost({ id }) {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(yup.object().shape({
      body: yup.string().required('Comment is required'),
    })),
  });

  const auth = localStorage.getItem('auth');
  const token = JSON.parse(auth).accessToken;
  const url = `${Base_Post_Url}posts/${id}/comment`;

  const handleToggleCommentBox = () => {
    setShowCommentBox(!showCommentBox);
  };


  const handleCommentSubmit = async (data) => {
    setSubmitting(true);

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ body: data.body }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const jsonData = await response.json();
      if (!response.ok) {
        throw new Error(jsonData.message);
      }

      setShowSuccess(true);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="comment-box-container">
      <button type="button" className="comment-button" onClick={handleToggleCommentBox}>
        <TfiCommentAlt />
      </button>
      {showCommentBox && (
        <form onSubmit={handleSubmit(handleCommentSubmit)}>
          {showSuccess && <div className="alert alert-success">Comment created successfully!</div>}
          <fieldset disabled={submitting}>
            <div className="comment-box">
              <textarea
                placeholder="Type your comment here..."
                {...register('body')}
                value={errors.body ? '' : register('body').value} // Clear the textarea if there's an error
              />
              {errors.body && (
                <span className="error-message">{errors.body.message}</span> // Use 'body' instead of 'comment'
              )}
              <button type="submit" disabled={submitting}>Post</button>
            </div>
          </fieldset>
        </form>
      )}
    </div>
  );
}

export default CommentToPost;
