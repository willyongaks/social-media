import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import Login from '../forms/login/Login';


function Nav() {
    const [auth, setAuth] = useContext(AuthContext);

    const navigate = useNavigate();


  return (
    <nav>
        {auth ? (
            <>
                <Link to='/home'>Home</Link>
            </>
        ): (
            <Link to='/'><Login /></Link>
        )}
    </nav>

  )
}

export default Nav