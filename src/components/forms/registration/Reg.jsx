import { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import axios from "axios";
import { BaseUrl } from "../../../constants/url/BaseUrl";
import AuthContext from '../../../context/AuthContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { RxEnvelopeClosed } from "react-icons/rx";
import { CiLock } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import '../../../styles/loginStyles/styles.scss';


const url = BaseUrl + "register";


let schema = yup.object().shape({
       name: yup.string().required(),
       email: yup.string().required(),
       password: yup.string().required(),
       avatar: yup.string().optional(),
       banner: yup.string().optional(),
   })


function Reg(props) {
    const {register,handleSubmit,formState: { errors },} = useForm({
        resolver: yupResolver( schema ),
    });

    const [setAuth] = useContext(AuthContext);


    const [submitting, setSubmitting] = useState(false);
    const [loginError, setLoginError] = useState(null);


    async function onSubmit(data) {
        setSubmitting(true);
        setLoginError(null);

        try{
            const response = await axios.post(url, data);
            console.log("response", response.data)
            setAuth(response);
        }catch(error){
            console.log(error)
            setLoginError(error.toString())
        }finally{
            setSubmitting(false)
        }
    }

  return (
      <section className='reg-container'>
          <Form onSubmit={handleSubmit(onSubmit)}>
        <div className='form-heading pb-4'>
                <h1>
                    Welcome to your <br/>
                    Proffessional community
                </h1>
        </div>

         {loginError}
         <fieldset disabled={submitting}>
            <InputGroup className="mb-3" controlid="formBasicName">
            <InputGroup.Text>< CgProfile /></InputGroup.Text>
                <Form.Control 
                    type="text"
                    placeholder="Enter Name"
                    {...register("name")}
                />
                
            </InputGroup>
            {errors.email && <p>Name is required </p>}
            <InputGroup className="mb-3" controlid="formBasicEmail">
                <InputGroup.Text>< RxEnvelopeClosed/></InputGroup.Text>
                <Form.Control 
                    type="email"
                    placeholder="Enter email"
                    {...register("email")}
                />
                
            </InputGroup>
            {errors.email && <p>Email is required </p>}
            
            <InputGroup className="mb-3" controlid="formBasicPassword">
                <InputGroup.Text>< CiLock/></InputGroup.Text>
                <Form.Control 
                    type="password" 
                    placeholder="Password"
                    autoComplete='off'
                    {...register("password")} 
                />
                
            </InputGroup>
            {errors.password && <p>Password is required </p>}

            <InputGroup className="mb-3">
                <InputGroup.Text controlid="basic-addon3">Avatar</InputGroup.Text>
                <Form.Control 
                    controlid="basic-url"
                    aria-describedby="basic-addon3" 
                    {...register("avatar")}
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon3">Banner</InputGroup.Text>
                <Form.Control 
                    controlid="basic-url" 
                    aria-describedby="basic-addon3"
                    {...register("banner")}
                />
            </InputGroup>

            <div className='reg-form-btns pb-3'>
                <Button 
                    variant="primary" 
                    type="submit"
                    className='reg-reg-btn'

                >Create account</Button>
                <Button onClick={() => props.onFormSwitch("login")}
                    variant="primary" 
                    type="submit"
                    className='reg-login-btn pt-3'

                >Already signed up? Login here
                </Button>
            </div>
         </fieldset>
        
        
    </Form>
      </section>
  )
}

export default Reg;