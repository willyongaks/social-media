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
    post: yup.string().required(),
})

function CommentToPost({id}) {
    const [isOpen, setIsOpen] = useState(false);
    const [post, setPost] = useState("")


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
    };


  return (
    <div>
        <button onClick={handleClick} type="button" className="comment-button">
            <CiChat2 /> 
        </button>
        {isOpen && (
            <>
            <FloatingLabel controlId="floatingTextarea2" label="Body">
                        <Form.Control
                        as="textarea"
                        placeholder="Comment"
                        className=''
                        {...register('body')}
                        
                        />
                        {errors.body && <div className="text-danger">{errors.body.message}</div>}
                    </FloatingLabel>
            {/* <textarea 
            value={post} 
            onChange={handleChannge} 
            rows='3'
            name='post'
            {...register('post')}
            >....</textarea>
            {errors.title && <div className="text-danger">{errors.title.message}</div>}
            <button onClick={handleSubmit(onSubmit)}>Post</button> */}
             
            </>
           
        )}
    </div>
  )
}

export default CommentToPost