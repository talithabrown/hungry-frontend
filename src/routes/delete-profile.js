import { Link, useNavigate } from 'react-router-dom'
import { useState } from "react"
import Header from '../components/Header'
import Alert from '../components/Alert'

function DeleteProfile() {
    
    let navigate = useNavigate()

    const [alertType, setAlertType] = useState([ 'hideAlert' ])
    const [alertMessage, setAlertMessage] = useState([ '' ])

    const deleteProfile = async () => {

        let password = document.getElementById('password-input-to-delete').value

        if (password != null && password !== undefined && password !== '') {
            console.log(password)
            const body = JSON.stringify({"current_passord": password})
            console.log(body)

            const res = await fetch(`https://hungry-backend-api.herokuapp.com/auth/users/me/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'JWT '+ localStorage.getItem('jwtAccess'), 
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({"current_password": password})
            })
            let response = await res
            console.log(response.body)

            if (response.status === 204) {
                navigate('/delete-post-successful')
            }
            else if (response.status === 400) {
                if (response.currrent_passsord) {
                    setAlertType('errorAlert')
                    setAlertMessage(response.currrent_passsord)
                    window.scrollTo(0, 0)
                }
                else {
                    setAlertType('errorAlert')
                    setAlertMessage('Bad Request')
                    window.scrollTo(0, 0)
                }
            }
            else {
                setAlertType('errorAlert')
                setAlertMessage('An error occured, please try again.')
                window.scrollTo(0, 0)
            }

        } else {
            setAlertType('errorAlert')
            setAlertMessage('Please enter password.')
            window.scrollTo(0, 0)
        }
    }

    const closeAlert = () => {
        setAlertType('hideAlert')
    }

    return (
        <>
            <Header text="Hungry" link="" imgSrc=""/>
            <main>
                <Alert message={alertMessage} type={alertType} closeAlert={closeAlert}/>
                <h3>Are you sure you want to delete your profile?</h3>
                <p>After deleting your profile all your posts and info will be lost and can NOT be recovered.</p>
                <div>
                    <label>Enter password to delete your profile:</label>
                    <input type='password' id='password-input-to-delete'></input>
                </div>
                <div className='delete-post-buttons-div'>
                    <button className='cancel-delete-post'><Link to="/profile">Cancel</Link></button>
                    <button onClick={deleteProfile} className='confirm-delete-post'>Delete</button>
                </div>

            </main>
        </>
    )

}

export default DeleteProfile