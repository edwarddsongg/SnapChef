import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from "react-redux"
import {logout, reset} from '../features/auth/authSlice'
import '../styles/header.css'

function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    return (
        <header className='header'>
            <div className='logo'>
                <Link to='/'> SnapChef </Link>

            </div>

            <ul>
                {user ? (
                    <>
                        <li>
                            <Link to='/dashboard'> Dashboard </Link>
                        </li>
                        <li>
                            <Link to='/image'>
                                Image
                            </Link>
                        </li>
                        <li>
                            <Link to='/webcam'>
                                Webcam
                            </Link>
                        </li>
                        <li>
                            <Link to='/history'>
                                History
                            </Link>
                        </li>
                        <li>
                            <Link to='/recipes'>
                                Recipes
                            </Link>
                        </li>
                        <li>
                            <button className='btn' onClick={onLogout}>
                                <FaSignOutAlt /> Logout
                            </button>
                        </li>
                    </>

                ) : (
                    <>
                        <li>
                            <Link to='/login'>
                                <FaSignInAlt /> Login
                            </Link>
                        </li>
                        <li>
                            <Link to='/register'>
                                <FaUser /> Register
                            </Link>
                        </li>
                    </>
                )}

            </ul>
        </header>
    )
}

export default Header