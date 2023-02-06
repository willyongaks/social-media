import React, { useState} from 'react';
import { Base_Post_Url} from '../../../constants/url/BaseUrl';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import InputGroup from 'react-bootstrap/InputGroup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
// import { token } from '../../../constants/url/BaseUrl';
import Modal from 'react-bootstrap/Modal';
import AuthProfile from '../profile/AuthProfile';


// const options = {
//     headers: {
//         Authorization: `Bearer ${token}`,
//     },
// };



const url = Base_Post_Url + "posts";

const schema = yup.object().shape({
    title: yup.string().required(),
    body: yup.string(),
    tags: yup.string(),
    media: yup.string(),
})



function CreatePost() {
    const [submitting, setSubmitting] = useState(false);
    const [serverError, setServerError] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [show, setShow] = useState(false);
    const [results, setResults] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


     const {register,handleSubmit,formState: { errors },} = useForm({
        resolver: yupResolver( schema ),
    });

    
    async function onSubmit(data) {
        setSubmitting(true);
        setServerError(null);
        setShowSuccess(false);
        const auth = localStorage.getItem('auth')
        const testToken = JSON.parse(auth).accessToken;
        console.log(testToken,auth)

        try {
            
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${testToken}`
                },  
            });
            console.log(data)
            // console.log("new post is added")
            const jsonData = await response.json();
            if (!response.ok) {
                throw new Error(jsonData.message)
            }
            setResults([...results, jsonData])
            setShowSuccess(true);
        }catch (error) {
            setServerError(error.toString())
        }finally{
            setSubmitting(false);
        }
    }
  

    



  return (
    <>
        
        <div className=''>
            <AuthProfile />
            <Button variant="primary" onClick={handleShow}>
        Create post
      </Button>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
                {serverError && <div className="alert alert-danger">{serverError}</div>}
                {showSuccess && <div className="alert alert-success">Post created successfully!</div>}
                <fieldset disabled={submitting}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="type here..." {...register('title')} />
                        {errors.title && <div className="text-danger">{errors.title.message}</div>}
                    </Form.Group>
                    <FloatingLabel controlId="floatingTextarea2" label="Body">
                        <Form.Control
                        as="textarea"
                        placeholder="Comment"
                        className=''
                        {...register('body')}
                        
                        />
                        {errors.body && <div className="text-danger">{errors.body.message}</div>}
                    </FloatingLabel>

                    {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Tags</Form.Label>
                        <Form.Control type="text" placeholder="[tags]" {...register('tags')} />
                    </Form.Group> */}
                    <Form.Label htmlFor="basic-url">Media</Form.Label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon3">
                            https://
                        </InputGroup.Text>
                        <Form.Control id="basic-url" aria-describedby="basic-addon3" {...register('media')} />
                    </InputGroup>
                </fieldset>
                <Modal.Footer>
                    <Button type="submit" disabled={submitting} className=''>
                            {submitting ? 'Submitting...' : 'Create Post'}
                        </Button>
                </Modal.Footer>
            </Form>
        </Modal.Body>  
    </Modal>
        </div>
        
               
    </>
  )
}

export default CreatePost