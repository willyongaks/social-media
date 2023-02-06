import React, { useContext, useState } from 'react';
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
import { token } from '../../../constants/url/BaseUrl';
import '../../../styles/loginStyles/styles.scss';



const url = BaseUrl + "login";


let schema = yup.object().shape({
       email: yup.string().required(),
       password: yup.string().required(),
   })


const options = {
    headers: {
        Authorization: `Bearer ${token}`,
    },
};



function Login(props) {
    const [auth, setAuth] = useContext(AuthContext);

    const [submitting, setSubmitting] = useState(false);
    const [loginError, setLoginError] = useState(null);
  

    const {register,handleSubmit,formState: { errors },} = useForm({
        resolver: yupResolver( schema ),
    });

    


    async function onSubmit(data) {
        setSubmitting(true);
        setLoginError(null);

        try{
            const response = await axios.post(url, data, options);
            console.log("response", response.data)
            setAuth(response.data);
            console.log(auth)
        }catch(error){
            console.log(error)
            setLoginError(error.toString())
        }finally{
            setSubmitting(false)
        }
       
    }



  return (
      <>
        
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
                {errors.email && <p>Email is required </p>}
                
                <InputGroup className="mb-3" controlid="formBasicPassword">
                    <InputGroup.Text>< CiLock /></InputGroup.Text>
                    <Form.Control 
                        type="password" 
                        placeholder="Password"
                        autoComplete='off'
                        {...register("password")} 
                    />
                    
                </InputGroup>
                {errors.password && <p>Password is required </p>}

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
      </>
    
  )
}

export default Login