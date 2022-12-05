import { Link } from 'react-router-dom'
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProfilePostsDiv from '../components/ProfilePostsDiv'
import Logout from '../components/Logout'
import RatingStars from '../components/RatingStars'

// /auth/users/me and pass JWT access token in request header or request body
// /main/userprofiles/me/ and pass JWT access token

const Profile = () => {

    let navigate = useNavigate()

    const [user, setUser] = useState([])

    useEffect(() => {
        const getUser = async () => {
            const userFromServer = await fetchUser()
            setUser(userFromServer)
        }

        getUser()
    }, [])

    const fetchUser = async () => {
        const res = await fetch('https://hungry-backend-api.herokuapp.com/auth/users/me/',
        {
            method: 'GET',
            headers: {
              'Authorization': 'JWT '+ localStorage.getItem('jwtAccess'), 
              'Content-type': 'application/json'
            }
        })
        const data = await res.json()

        localStorage.setItem('username', data.username)
        localStorage.setItem('firstName', data.first_name)
        localStorage.setItem('lastName', data.last_name)
        localStorage.setItem('email', data.email)
        
        //console.log(data)
        return data
    }

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
        const res = await fetch('https://hungry-backend-api.herokuapp.com/main/userprofiles/me/',
        {
            method: 'GET',
            headers: {
              'Authorization': 'JWT '+ localStorage.getItem('jwtAccess'), 
              'Content-type': 'application/json'
            }
        })
        const data = await res.json()
        localStorage.setItem('profile_id', data.id)
        localStorage.setItem('bio', data.bio)

        //console.log(data)

        return data
    }

    //////////////////////////

    const fetchProfilePosts = async () => {
        const res = await fetch(`https://hungry-backend-api.herokuapp.com/main/userprofiles/${localStorage.getItem("profile_id")}/posts`,
        {
            method: 'GET',
            headers: {
            'Authorization': 'JWT '+ localStorage.getItem('jwtAccess'), 
            'Content-type': 'application/json'
            }
        })
        const data = await res.json()
        //console.log(data)
        return data
    }
    //////////////////////////

    const fetchProfileReviews = async () => {
        const res = await fetch(`https://hungry-backend-api.herokuapp.com/main/reviews/?profile=${localStorage.getItem('profile_id')}`,
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
        localStorage.setItem('back-link', '/profile')
        navigate('/profile-reviews')
    }

    //////////////////////////

    const fullName = `${user.first_name} ${user.last_name}`

    /////////////////////////

    const [profileMenuClass, setprofileMenuClass] = useState('profileMenuClosed')

    const openCloseMenu = () => {

        if (profileMenuClass === 'profileMenuClosed') {
            setprofileMenuClass('profileMenuOpened')
        }

        else if (profileMenuClass === 'profileMenuOpened') {
            setprofileMenuClass('profileMenuClosed')
        }

    }

    ////////////////////////imgFunction={openCloseMenu}

    if (profile && user) {
    return (
        <div>
            <Header text={user.username} imgSrc="/images/menu.svg" imgFunction={openCloseMenu}/>
            <div className={`profileMenu ${profileMenuClass}`}>
                <img className="closebtn" src='/images/x.svg' alt='exit button' onClick={openCloseMenu}/>
                <Link to='/edit-profile'>Edit Profile</Link>
                <Link to='/purchase-history'>Purchase History</Link>
                <Link to='/reviews-written-by-you'>Reviews By You</Link>
                {/* <Link to='/delete-profile'>Delete Profile</Link> */}
                <Logout />
            </div>
            <main className="profile-main">
                {/* <Logout /> */}
                <div className="profile-img-and-bio-p">
                    <img className="profile-image" src={profile.image} alt="profile"/>
                    <p className="bio">{profile.bio}</p>
                </div>

                <RatingStars rating={profileRating} />

                <div className="profile-stats-div">
                    <p onClick={navigateToProfileReviews} className='profile-reviews-link'>{profileReviews.length} Reviews</p>
                </div>
                
                <ProfilePostsDiv posts={profilePosts} edit={true}/>

            </main>
            <Footer />
        </div>
    )
    }

}

export default Profile