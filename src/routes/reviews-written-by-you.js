import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Alert from '../components/Alert'
import Review from "../components/Review"

function ReviewsWrittenByYou() {

    let navigate = useNavigate()

    const [alertType, setAlertType] = useState([ 'hideAlert' ])
    const [alertMessage, setAlertMessage] = useState([ '' ])

    const [reviews, setReviews] = useState([])

    useEffect(() => {
        const getReviews = async () => {
            const reviewsFromServer = await fetchReviews()
            setReviews(reviewsFromServer)
        }

        getReviews()
        //console.log(reviews)
    }, [])

    //Fetch orders
    const fetchReviews = async () => {
        const res = await fetch(`https://hungry-backend-api.herokuapp.com/main/reviews/?reviewer=${localStorage.getItem('profile_id')}`,
        {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
        const data = await res.json()

        console.log(data)
        return data
    }

    const navigateBack = () => {
        navigate('/profile')
    }


    const closeAlert = () => {
        setAlertType('hideAlert')
    }

    if (reviews !== undefined && reviews != null && reviews.length > 0) {
        return (
            <>
                <Header text="Reviews By You" link="" imgSrc=""/>
                <main id="home-main">
                    <Alert message={alertMessage} type={alertType} closeAlert={closeAlert}/>
                    <Link to='/profile' className="post-detail-back-link"><img src="/images/chevron-left.svg" alt="back icon"/></Link>

                    <hr></hr>
                    {reviews.map((review) => (
                        <Review review={review} key={review.id} edit={true}/>
                    ))}
        
                </main>
            </>
        )
    }
    else {
        return (
            <>
                <Header text="Hungry" link="" imgSrc=""/>
                <main id="home-main">
                <Link to='/profile' className="post-detail-back-link"><img src="/images/chevron-left.svg" alt="back icon"/></Link>

                    <p>You have not written any reviews yet. To give a review go to your purchase history</p>

                </main>
            </>
        )
    }

}

export default ReviewsWrittenByYou