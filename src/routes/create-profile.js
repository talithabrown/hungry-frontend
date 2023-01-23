import { Link } from 'react-router-dom'
import { useState, useEffect } from "react"
import CreateProfileForm from '../components/CreateProfileForm'
import Header from '../components/Header'
import Alert from '../components/Alert'

const CreateProfile = () => {

  const [alertType, setAlertType] = useState([ 'hideAlert' ])
  const [alertMessage, setAlertMessage] = useState([ '' ])

    const createProfile = async (username, password1, password2, email, firstName, lastName, bio, profileImage) => {

        if (!username || !password1 || !password2 || !email ) {
          window.scrollTo(0,0)
          setAlertType('errorAlert')
          setAlertMessage('Please fill out all required fields!')
          return
        }

        if (password1 !== password2) {
            window.scrollTo(0,0)
            setAlertType('errorAlert')
            setAlertMessage('Passwords do not match')
            return
        }

        const userInfo = {
            "username": username,
            "password": password1,
            "email": email,
            "first_name": firstName,
            "last_name": lastName
        }

        const userProfileInfo = new FormData();
        userProfileInfo.append('bio', bio)
        if (profileImage) {
          userProfileInfo.append('image', profileImage)
        }
        //console.log(userProfileInfo)

          const res1 = await fetch('https://hungry-backend-api.herokuapp.com/auth/users/', 
          {
              method: 'POST',
              headers: {
                'Content-type': 'application/json'
              },
              body: JSON.stringify(userInfo)
          })

          let response1 = await res1

          if (response1.status === 400) {
              const data = await response1.json()
              console.log(data)
              setAlertType('errorAlert')
              if (data.username) {
                setAlertMessage(data.username)
                window.scrollTo(0,0)
                return false
              }
              else if (data.email) {
                setAlertMessage(data.email)
                window.scrollTo(0,0)
                return false
              }
              else if (data.password) {
                setAlertMessage(data.password)
                window.scrollTo(0,0)
                return false
              }
              else {
                setAlertMessage('Invalid data, please try again.')
                window.scrollTo(0,0)
                return false
              }
          } else {
            const data = await response1.json()
            localStorage.setItem("user_id", data.id)
            console.log(`status code is ${response1.status}`)
          }

          const res2 = await fetch(`https://hungry-backend-api.herokuapp.com/main/userprofiles/${localStorage.getItem('user_id')}/`, 
          {
              method: 'PUT',
              body: userProfileInfo
          })

          let response2 = await res2
          if (response2.ok) {
            window.scrollTo(0,0)
            setAlertType('successAlert')
            setAlertMessage('Account created successfully! Now you can go login!')
          }
    }

    const closeAlert = () => {
      setAlertType('hideAlert')
    }

    return (
      <div className="create-profile-div">
          <Header text="Hungry" link="" imgSrc="" />
          {/* <Link to='/'>Go Back Home</Link> */}
          <main className="create-profile-main">
          <Alert message={alertMessage} type={alertType} closeAlert={closeAlert}/>
          <CreateProfileForm onSubmitProfile={createProfile}/>
          </main>
      </div>
    )
  }
  
  export default CreateProfile