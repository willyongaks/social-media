import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import Layout from '../layout/Layout';
import Menu from './Menu';



function Navigation() {
    const [auth, setAuth] = useContext(AuthContext);
    const navigate = useNavigate();

    
    if (auth) {
         navigate("/login");
    }
 


    function logout() {
    setAuth(null);
    navigate("/");
}
    
    

  return (
        <nav>
			{auth ? (
                <>

                <Menu />
                </>
                ) : (
                    <Link to="/" />
            )} 
		</nav>

  )
}

export default Navigation;