import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Alert from '../components/Alert'
import Review from "../components/Review"

function ProfileReviews() {

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
        const res = await fetch(`https://hungry-backend-api.herokuapp.com/main/reviews/?profile=${localStorage.getItem('reviews_profile_id')}`,
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
                <Header text="Reviews" link="" imgSrc=""/>
                <main id="home-main">
                    <Alert message={alertMessage} type={alertType} closeAlert={closeAlert}/>
                    <Link to={localStorage.getItem('back-link')} className="post-detail-back-link"><img src="/images/chevron-left.svg" alt="back icon"/></Link>

                    <hr></hr>
                    {reviews.map((review) => (
                        <Review review={review} key={review.id} edit={false}/>
                    ))}
        
                </main>
                <Footer />
            </>
        )
    }
    else {
        return (
            <>
                <Header text="Hungry" link="" imgSrc=""/>
                <main id="home-main">
                <Link to={localStorage.getItem('back-link')} className="post-detail-back-link"><img src="/images/chevron-left.svg" alt="back icon"/></Link>

                    <p>No reviews yet.</p>

                </main>
                <Footer />
            </>
        )
    }

}

export default ProfileReviews