import React, { useContext, useState } from 'react';
import { Base_Post_Url } from '../../../constants/url/BaseUrl';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import '../../../App.css';
import AuthContext from '../../../context/AuthContext';
import { TfiCommentAlt } from 'react-icons/tfi';

const schema = yup.object().shape({
  Comment: yup.string().required(),
});

function CommentToPost({ id }) {
  const [isOpen, setIsOpen] = useState(false);
  const [post, setPost] = useState('');

  const auth = useContext(AuthContext);
  const url = `${Base_Post_Url}${id}/comment`;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function CommentButton() {
    const [showCommentBox, setShowCommentBox] = useState(false);

    const handleClick = () => {
      setShowCommentBox(!showCommentBox);
    };
    function handleChannge(event){
        setPost(event.target.value)
    }

    const onSubmit = async (e) => {
      e.preventDefault();

      console.log('Post submitted!');

      try {
        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify({ body: post }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.accessToken}`,
          },
        });
        if (response.ok) {
          setPost(''); // clears the textarea
          setIsOpen(false); // closes the form
          const results = await response.json();
          console.log('Comment posted successfully', results);

          console.log(results);
        }
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <div className="comment-box-container">
        <button onClick={handleClick} type="button" className="comment-button">
          <TfiCommentAlt />
        </button>
        {showCommentBox && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="comment-box">
              <textarea
                placeholder="Type your comment here..."
                {...register('Comment')}
                onChange={handleChannge}
                value={post}
              />
              {errors.Comment && (
                <span className="error-message">{errors.Comment.message}</span>
              )}
              <button type="submit">Post</button>
            </div>
          </form>
        )}
      </div>
    );
  }

  return <CommentButton />;
}

export default CommentToPost;
