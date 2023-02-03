import { useState } from 'react';
import Login from './login/Login';
import Register from './registration/Reg';

function FormFunction() {

    const [currentForm, setCurrentForm] = useState("login");

    const toggleForms = (formName) => {
        setCurrentForm(formName);
    }
  return (
    <div className='App'>
        {
          currentForm === "login" ? <Login onFormSwitch={toggleForms} /> : <Register onFormSwitch={toggleForms} />
        }
        
      </div>
  )
}

export default FormFunction