import { useState } from "react"
import Header from '../components/Header'
import Alert from '../components/Alert'
import EditReviewForm from "../components/EditReviewForm"

const EditReview = () => {

    const [alertType, setAlertType] = useState([ 'hideAlert' ])
    const [alertMessage, setAlertMessage] = useState([ '' ])


    const editReview = async (rating, title, text) => {
        
        if (rating < 1 || rating > 5) {
            setAlertType('errorAlert')
            setAlertMessage('rating must be between 1 and 5')
            window.scrollTo(0,0)
            return
        }
        else if (rating % 1 !== 0) {
            setAlertType('errorAlert')
            setAlertMessage('rating must be a whole number')
            window.scrollTo(0,0)
            return
        }

        const reviewInfo = {
            "post": localStorage.getItem('review-post-id'),
            "rating": rating,
            "title": title,
            "text": text,
            "reviewer_user": localStorage.getItem('profile_id')
        }


        const res = await fetch(`https://hungry-backend-api.herokuapp.com/main/reviews/${localStorage.getItem('review-id')}/`, 
        {
            method: 'PUT',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify(reviewInfo)
        })

        let response = await res

        if (response.status === 400) {
            const data = await response.json()
            console.log(data)
            setAlertType('errorAlert')

            if (data.rating) {
              setAlertMessage(data.rating)
              window.scrollTo(0,0)
              return
            }
            else if (data.title) {
              setAlertMessage(data.title)
              window.scrollTo(0,0)
              return
            }
            else if (data.text) {
              setAlertMessage(data.text)
              window.scrollTo(0,0)
              return
            }
            else if (data.post) {
                setAlertMessage(data.post)
                window.scrollTo(0,0)
                return
              }
            else if (data.reviewer_user) {
                setAlertMessage(data.reviewer_user)
                window.scrollTo(0,0)
                return
            }
            else {
              setAlertMessage('Invalid data, please try again. Make sure all required fields are completed')
              window.scrollTo(0,0)
              return
            }
        } else if (response.ok){
          window.scrollTo(0,0)
          setAlertType('successAlert')
          setAlertMessage('Successfully Updated!')
        }


 
    }

    const closeAlert = () => {
      setAlertType('hideAlert')
    }

    return (
      <div>
          <Header text="Hungry" imgSrc="" />
          <main>
            <Alert message={alertMessage} type={alertType} closeAlert={closeAlert}/>
            <EditReviewForm onSubmitReview={editReview}/>
          </main>
      </div>
    )
  }
  
  export default EditReview