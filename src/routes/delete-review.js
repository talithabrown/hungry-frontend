import { Link, useNavigate } from 'react-router-dom'
import { useState } from "react"
import Header from '../components/Header'
import Alert from '../components/Alert'

function DeleteReview() {
    
    let navigate = useNavigate()

    const [alertType, setAlertType] = useState([ 'hideAlert' ])
    const [alertMessage, setAlertMessage] = useState([ '' ])

    const deleteReview = async () => {
        const res = await fetch(`https://hungry-backend-api.herokuapp.com/main/reviews/${localStorage.getItem('review-id')}/`, {
            method: 'DELETE',
        })
        let response = await res

        if (response.status === 204) {
            navigate('/delete-post-successful')
        }
        else {
            setAlertType('errorAlert')
            setAlertMessage('An error occured, please try again.')
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
                <h3>Are you sure you want to delete this review?</h3>
                <p>After deleting a review you can not get it back.</p>
                <div className='delete-post-buttons-div'>
                    <button className='cancel-delete-post'><Link to="/reviews-written-by-you">Cancel</Link></button>
                    <button onClick={deleteReview} className='confirm-delete-post'>Delete</button>
                </div>

            </main>
        </>
    )

}

export default DeleteReview