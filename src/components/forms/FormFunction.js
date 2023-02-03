import { useState } from 'react';
import Login from './Login';
import Register from './Register';

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