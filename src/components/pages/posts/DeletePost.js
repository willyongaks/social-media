import React, { useState } from 'react';
import { Base_Post_Url, token } from '../../../constants/url/BaseUrl';

function DeletePost({ postId }) {
    const [ setDeletedPost] = useState()

    const url = `${Base_Post_Url}posts/${postId}`


    async function deletePost(){
        if (window.confirm('Are you sure you want to delete this post?')) {
            try{
                const response = await fetch(url, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                if(response.ok){
                    const result = await response.json();
                    setDeletedPost(result)
                }

            }catch(error){

            }
        }
        
    }

  return (
    <>
        <button onClick={deletePost}>
            Delete
        </button>
    </>
  )
}

export default DeletePost