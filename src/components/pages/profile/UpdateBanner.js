import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Base_Post_Url, token } from '../../../constants/url/BaseUrl';




const schema = yup.object().shape({
  banner: yup.string().required(),
  avatar: yup.string().required(),
});


function UpdateBanner() {
  const [show, setShow] = useState(false);
  const [results, setResults] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  
  
  const auth = localStorage.getItem('auth')
  const name = JSON.parse(auth)?.name;

  const url = `${Base_Post_Url}profiles/${name}/media`
 

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const {register,handleSubmit,formState: { errors },} = useForm({
    resolver: yupResolver( schema ),
  });


  async function onSubmit(data) {
    setSubmitting(true);
    setServerError(null);
    setShowSuccess(false);

    try{
      const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      if(response.ok){
        const jsonData = await response.json()
        setResults([...results, jsonData]);
        setShowSuccess(true);
        console.log(jsonData)
      }else{
        throw new Error()
      }

    }catch(error){
      serverError(error.message);
    }finally{
      setSubmitting(false);
    }
  }






  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        update Banner/avatar
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <Form onSubmit={handleSubmit(onSubmit)}>
            {serverError && <div className="alert alert-danger">{serverError}</div>}
            {showSuccess && <div className="alert alert-success">Media updated successfully!</div>}
            <Form.Label htmlFor="basic-url">Must be a valid url</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon3">
                  Banner
                </InputGroup.Text>
                <Form.Control
                  id="basic-url"
                  aria-describedby="basic-addon3"
                  {...register('banner')}
                />
                {errors.banner && <div className="text-danger">{errors.banner.message}</div>}
              </InputGroup>        
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon3">
                  Avatar
                </InputGroup.Text>
                <Form.Control
                  id="basic-url"
                  aria-describedby="basic-addon3"
                  {...register('avatar')}
                />
                {errors.avatar && <div className="text-danger">{errors.avatar.message}</div>}
              </InputGroup>        
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button 
          onClick={handleSubmit(onSubmit)}
            variant="primary" 
            type='submit'
            disabled={submitting}
          
          >
            {submitting ? 'submitting..' : 'update' }
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default UpdateBanner;