import React, {useState} from 'react'
import { Base_Post_Url } from '../../../constants/url/BaseUrl';
import { token } from '../../../constants/url/BaseUrl';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { CiChat2 } from "react-icons/ci";
import '../../../App.css';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';


const url = Base_Post_Url + 'posts'

const schema = yup.object().shape({
    Comment: yup.string().required(),
})

function CommentToPost({id}) {
    const [isOpen, setIsOpen] = useState(false);
    const [post, setPost] = useState("");


    const {register,handleSubmit,formState: { errors },} = useForm({
        resolver: yupResolver( schema ),
    });


    function handleClick(){
        setIsOpen(!isOpen);
    }
    function handleChannge(event){
        setPost(event.target.value)
    }

    const onSubmit = async (e) =>{
        e.preventDefault();

        console.log("Post submitted!");

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
                setPost('') // clears the textarea
                setIsOpen(false) // closes the form
                const results = await response.json();
                console.log("Comment posted successfully", results);

                console.log(results)
            }

        }catch(error){
            console.log(error)
        }
    };


  return (
    <div>
        <button onClick={handleClick} type="button" className="comment-button">
            <CiChat2 /> 
        </button>
        {isOpen && (
            <>
            <FloatingLabel controlId="floatingTextarea2" label="Comment">
                <Form.Control
                    onChange={handleChannge} 
                    as="textarea"
                    placeholder="Comment"
                    className=''
                    {...register('Comment')}
                        
                />
                {errors.Comment && <div className="text-danger">{errors.Comment.message}</div>}
            </FloatingLabel>
            <button onClick={(e) => handleSubmit(e, onSubmit)}>Post</button>
             
            </>
           
        )}
    </div>
  )
}

export default CommentToPost