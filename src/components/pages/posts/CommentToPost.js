import React, {useState} from 'react'
import { Base_Post_Url } from '../../../constants/url/BaseUrl';
import { token } from '../../../constants/url/BaseUrl';
import { CiChat2 } from "react-icons/ci";
import '../../../App.css';


const url = Base_Post_Url + 'posts'

function CommentToPost({id, comments}) {
    const [isOpen, setIsOpen] = useState(false);
    const [post, setPost] = useState("")


    function handleClick(){
        setIsOpen(!isOpen);
    }
    function handleChannge(event){
        setPost(event.target.value)
    }

    async function onSubmit(e){
        e.preventDefault();

        try{
            const response = await fetch(`${url}/${id}/comment`,{
                method: 'POST',
                body: JSON.stringify({body: post}),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            if(response.ok){
                const results = await response.json()
                console.log(results)
            }

        }catch(error){
            console.log(error)
        }
    }




  return (
    <div>
        <button onClick={handleClick} type="button" className="comment-button">
            <CiChat2 /> 
        </button>
        {isOpen && (
            <>
            <textarea value={post} onChange={handleChannge} rows='3'>....</textarea>
            <button onClick={onSubmit}>Post</button>
            </>
            
        )}
    </div>
  )
}

export default CommentToPost