import React, {useState} from 'react'
import { Base_Post_Url } from '../../../constants/url/BaseUrl';
import { token } from '../../../constants/url/BaseUrl';


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
        <button onClick={handleClick} type="button" className="btn btn-primary">
            comments <span className="badge bg-secondary">{comments}</span>
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