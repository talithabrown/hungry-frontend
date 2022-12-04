import { useNavigate } from 'react-router-dom'

const Logout = () => {

let navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('jwtAccess')
    localStorage.removeItem('jwtRefresh')
    localStorage.removeItem('profile_id')
    localStorage.removeItem('user_id')
    navigate('/login')
  }

  return (
    <p onClick={logout}>Log out</p>
  )
}

export default Logout