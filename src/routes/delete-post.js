import { Link, useNavigate } from 'react-router-dom'
import { useState } from "react"
import Header from '../components/Header'
import Footer from '../components/Footer'
import Alert from '../components/Alert'

function DeletePost() {
    
    let navigate = useNavigate()

    const [alertType, setAlertType] = useState([ 'hideAlert' ])
    const [alertMessage, setAlertMessage] = useState([ '' ])

    const deletePost = async () => {
        const res = await fetch(`https://hungry-backend-api.herokuapp.com/main/posts/${localStorage.getItem('post-detail-id')}/`, {
            method: 'DELETE',
        })
        let response = await res

        if (response.status === 204) {
            navigate('/delete-post-successful')
        }
        else {
            setAlertType('errorAlert')
            setAlertMessage('An error occured, please try again.')
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
                <h3>Are you sure you want to delete this post?</h3>
                <p>After deleting a post you can not get it back.</p>
                <div className='delete-post-buttons-div'>
                    <button className='cancel-delete-post'><Link to="/post-detail">Cancel</Link></button>
                    <button onClick={deletePost} className='confirm-delete-post'>Delete</button>
                </div>

            </main>
            <Footer />
        </>
    )

}

export default DeletePost