import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from "axios";
import { RxEnvelopeClosed } from "react-icons/rx";
import { CiLock } from "react-icons/ci";
import { BaseUrl } from "../../../constants/url/BaseUrl";
import AuthContext from '../../../context/AuthContext';
import '../../../styles/loginStyles/styles.scss';



const url = BaseUrl + "login";



let schema = yup.object().shape({
       email: yup.string().required("Email is required").email("Must be a valid email"),
       password: yup.string().required(),
   })




function Login(props) {
    const [auth, setAuth] = useContext(AuthContext);

    const [submitting, setSubmitting] = useState(false);
    const [loginError, setLoginError] = useState(null);

    const authy = localStorage.getItem('auth')
    const token = JSON.parse(authy).accessToken;

    const navigate = useNavigate();

    useEffect(() => {
        if (auth) {
            navigate("/home");
        }
    }, [auth, navigate])


   
  

    const {register,handleSubmit,formState: { errors },} = useForm({
        resolver: yupResolver( schema ),
    });

    


    async function onSubmit(data) {
        setSubmitting(true);
        setLoginError(null);

        try{
            const response = await axios.post(url, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("response", response.data)
            setAuth(response.data);
        }catch(error){
            console.log(error)
            setLoginError("There was an error logging in. Please check your username and password");
        }finally{
            setSubmitting(false)
        }
       
    }


  return (
      <section className='login-container'>
        <Form onSubmit={handleSubmit(onSubmit)}>
            
            <div className='form-heading pb-4'>
                <h1>
                    Welcome to your <br/>
                    Proffessional community
                </h1>
            </div>
            {loginError}
            <fieldset disabled={submitting}>
                    <InputGroup className="mb-3" controlid="formBasicEmail">
                    <InputGroup.Text>< RxEnvelopeClosed /></InputGroup.Text>
                    <Form.Control 
                        type="email"
                        placeholder="Enter email"
                        {...register("email")}
                    />
                    
                </InputGroup>
                {errors.email && <p>{errors.email.message} </p>}
                
                <InputGroup className="mb-3" controlid="formBasicPassword">
                    <InputGroup.Text>< CiLock /></InputGroup.Text>
                    <Form.Control 
                        type="password" 
                        placeholder="Password"
                        autoComplete='off'
                        {...register("password")} 
                    />
                    
                </InputGroup>
                {errors.password && <p>{errors.password.message}</p>}

                <div className='form-btns col-12'>
                    <Button 
                        variant="primary" 
                        type="submit"
                        className='login-btn col-5'
                    >
                        Login
                    </Button>

                    <Button onClick={() => props.onFormSwitch("register")}
                        variant="primary" 
                        type="submit"
                        className='register-btn col-5'
                    >
                        Create account
                    </Button>
                </div>
            </fieldset>
              
        </Form>
      </section>
    
  )
}

export default Login