import { Link } from 'react-router-dom'
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProfilePostsDiv from '../components/ProfilePostsDiv'
import RatingStars from '../components/RatingStars'

// /auth/users/me and pass JWT access token in request header or request body
// /main/userprofiles/me/ and pass JWT access token

const ViewProfile = () => {

    let navigate = useNavigate()

    //////////////////////

    const [profile, setProfile] = useState([])
    const [profilePosts, setProfilePosts] = useState([])
    const [profileReviews, setProfileReviews] = useState([])
    const [profileRating, setProfileRating] = useState(0)

    useEffect(() => {

        const getProfileAndPosts = async () => {

            const profileFromServer = await fetchProfile()
            setProfile(profileFromServer)

            const profilePostsFromServer = await fetchProfilePosts()
            setProfilePosts(profilePostsFromServer)

            const profileReviewsFromServer = await fetchProfileReviews()
            setProfileReviews(profileReviewsFromServer)

            if (profileReviewsFromServer.length > 0) {
                const rating = calculateRating(profileReviewsFromServer)
                setProfileRating(rating)
            }

        }
        
        getProfileAndPosts()

    }, [])

    ///////////////////////

    const fetchProfile = async () => {
        const res = await fetch(`https://hungry-backend-api.herokuapp.com/main/userprofiles/${localStorage.getItem('view_profile_id')}/`,
        {
            method: 'GET',
            headers: {
              'Content-type': 'application/json'
            }
        })
        const data = await res.json()

        //console.log(data)

        return data
    }

    //////////////////////////

    const fetchProfilePosts = async () => {
        const res = await fetch(`https://hungry-backend-api.herokuapp.com/main/userprofiles/${localStorage.getItem("view_profile_id")}/posts`,
        {
            method: 'GET',
            headers: {
            'Content-type': 'application/json'
            }
        })
        const data = await res.json()
        //console.log(data)
        return data
    }
    //////////////////////////

    const fetchProfileReviews = async () => {
        const res = await fetch(`https://hungry-backend-api.herokuapp.com/main/reviews/?profile=${localStorage.getItem('view_profile_id')}`,
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
    ////////////////////////////

    const calculateRating = (reviews) => {
        let ratingsList = []
        for (let i = 0; i < reviews.length; i++) {
            ratingsList.push(reviews[i].rating)
        }
        const sum = ratingsList.reduce((partialSum, a) => partialSum + a, 0)
        //console.log(`Sum: ${sum}`)

        const average = sum / ratingsList.length
        //console.log(`Avg: ${average}`)

        const roundedAverage = Math.round(average*2)/2
        //console.log(`Rounded: ${roundedAverage}`)

        return roundedAverage
    }

    //////////////////////////

    const  navigateToProfileReviews = () => {
        localStorage.setItem('reviews_profile_id', profile.id)
        localStorage.setItem('back-link', '/view-profile')
        navigate('/profile-reviews')
    }

    //////////////////////////

    const fullName = `${profile.first_name} ${profile.last_name}`


    return (
        <div>
            <Header text={fullName}/>
            <main className="profile-main">
                <div className="profile-img-and-bio-p">
                    <img className="profile-image" src={profile.image} alt="profile"/>
                    <p className="bio">{profile.bio}</p>
                </div>

                <RatingStars rating={profileRating} />

                <div className="profile-stats-div">
                    <p onClick={navigateToProfileReviews} className='profile-reviews-link'>{profileReviews.length} Reviews</p>
                </div>
                
                <ProfilePostsDiv posts={profilePosts} edit={false}/>

            </main>
            <Footer />
        </div>
    )

}

export default ViewProfile