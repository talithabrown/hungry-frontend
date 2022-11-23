import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react"
import Header from '../components/Header'
import Footer from '../components/Footer'
import LoginForm from '../components/LoginForm'
import Alert from '../components/Alert'

const Login = () => {

    let navigate = useNavigate()

    const [alertType, setAlertType] = useState([ 'hideAlert' ])
    const [alertMessage, setAlertMessage] = useState([ '' ])

    const login = async (username, password) => {
      const accountInfo = {
        "username": username,
        "password": password
      }
      //console.log(JSON.stringify(accountInfo))
      const res = await fetch('https://hungry-backend-api.herokuapp.com/auth/jwt/create/', 
      {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(accountInfo)
      }).then(res => res.json()).then((data) => {
        //console.log(data)
        if (data.access && data.refresh) {
          localStorage.setItem('jwtAccess', data.access);
          localStorage.setItem('jwtRefresh', data.refresh)
          navigate('/profile')
        }
        else {
          setAlertType('errorAlert')
          setAlertMessage('Invalid username and/or password')
        }
      })
    }

    const closeAlert = () => {
      setAlertType('hideAlert')
    }

    return (
      <div>
          <Header text="Hungry" link="" imgSrc="" />
          <main className="login-main">
            <Alert message={alertMessage} type={alertType} closeAlert={closeAlert}/>
            <LoginForm onLogin={login}/>
            <div className="create-profile-link-div">
              <Link to='/create-profile'>Create Account</Link>
            </div>
          </main>
          <Footer />
      </div>
    )
  }
  
  export default Login