import { useState } from "react"
import EditProfileForm from '../components/EditProfileForm'
import Header from '../components/Header'
import Alert from '../components/Alert'

const EditProfile = () => {

    const [alertType, setAlertType] = useState([ 'hideAlert' ])
    const [alertMessage, setAlertMessage] = useState([ '' ])
  
      const editProfile = async (username, email, firstName, lastName, bio, profileImage) => {
  
          if (!username || !email ) {
            window.scrollTo(0,0)
            setAlertType('errorAlert')
            setAlertMessage('Please fill out all required fields!')
            return
          }
  
          const userInfo = {
              "username": username,
              "email": email,
              "first_name": firstName,
              "last_name": lastName
          }
  
          const userProfileInfo = new FormData();
          userProfileInfo.append('bio', bio)
          if (profileImage) {
            userProfileInfo.append('image', profileImage)
          }
  
            const res1 = await fetch('https://hungry-backend-api.herokuapp.com/auth/users/me/', 
            {
                method: 'PUT',
                headers: {
                    'Authorization': 'JWT '+ localStorage.getItem('jwtAccess'), 
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
                else {
                  setAlertMessage('Invalid data, please try again.')
                  window.scrollTo(0,0)
                  return false
                }
            } else if (response1.ok) {
              const data = await response1.json()
              localStorage.setItem("user_id", data.id)
              localStorage.setItem('username', data.username)
              localStorage.setItem('firstName', data.first_name)
              localStorage.setItem('lastName', data.last_name)
              localStorage.setItem('email', data.email)
              //console.log(`status code is ${response1.status}`)
            }
            else {
                window.scrollTo(0,0)
                setAlertType('errorAlert')
                setAlertMessage('Something went wrong, please try again later.')
            }
  
            const res2 = await fetch(`https://hungry-backend-api.herokuapp.com/main/userprofiles/me/`, 
            {
                method: 'PUT',
                headers: {
                    'Authorization': 'JWT '+ localStorage.getItem('jwtAccess'), 
                },
                body: userProfileInfo
            })
  
            let response2 = await res2
            if (response2.ok) {
              window.scrollTo(0,0)
              setAlertType('successAlert')
              setAlertMessage('Profile updated successfully!')
              const data = await response2.json()
              localStorage.setItem('bio', data.bio)
            }
            else {
                window.scrollTo(0,0)
                setAlertType('errorAlert')
                setAlertMessage('Something went wrong, please try again. Make sure all data is valid')
            }
      }

      const closeAlert = () => {
        setAlertType('hideAlert')
      }
  
      return (
        <div className="edit-profile-div">
            <Header text="Hungry" link="" imgSrc="" />
            <main className="edit-profile-main">
            <Alert message={alertMessage} type={alertType} closeAlert={closeAlert}/>
            <EditProfileForm onSubmitProfile={editProfile}/>
            </main>
        </div>
      )
    }
    
    export default EditProfile