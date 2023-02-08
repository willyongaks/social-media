import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import Layout from '../layout/Layout';



function Navigation() {
    const [auth, setAuth] = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (auth === null) {
            navigate("/");
        }
    }, [auth, navigate])


    function logout() {
    setAuth(null);
    navigate("/");
}
    
    

  return (
        <nav>
			{auth ? (
                <>
                <Layout />
                <button onClick={logout}>Log Out</button>
                </>
                ) : (
                    <Link to="/" />
            )} 
		</nav>

  )
}

export default Navigation;