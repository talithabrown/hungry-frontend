import { Link } from 'react-router-dom'
import { useState, useEffect } from "react"
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProfilePostsDiv from '../components/ProfilePostsDiv'
import Logout from '../components/Logout'

// /auth/users/me and pass JWT access token in request header or request body
// /main/userprofiles/me/ and pass JWT access token

const Profile = () => {

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

    useEffect(() => {

        const getProfileAndPosts = async () => {

            const profileFromServer = await fetchProfile()
            setProfile(profileFromServer)

            const profilePostsFromServer = await fetchProfilePosts()
            setProfilePosts(profilePostsFromServer)
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

    return (
        <div>
            <Header text={fullName} imgSrc="/images/menu.svg" imgFunction={openCloseMenu}/>
            <div className={`profileMenu ${profileMenuClass}`}>
                <img className="closebtn" src='/images/x.svg' alt='exit button' onClick={openCloseMenu}/>
                <Link to='/edit-profile'>Edit Profile</Link>
                <Link to='/'></Link>
                <Logout />
            </div>
            <main className="profile-main">
                {/* <Logout /> */}
                <div className="profile-img-and-bio-p">
                    <img className="profile-image" src={profile.image} alt="profile"/>
                    <p className="bio">{profile.bio}</p>
                </div>

                <div className="stars-div">
                    <img className="star" src="/images/star.svg" alt="star icon"/>
                    <img className="star" src="/images/star.svg" alt="star icon"/>
                    <img className="star" src="/images/star.svg" alt="star icon"/>
                    <img className="star" src="/images/star.svg" alt="star icon"/>
                    <img className="star" src="/images/star.svg" alt="star icon"/>
                </div>

                <div className="profile-stats-div">
                    <p>27<br />followers</p>
                    <p>53<br />following</p>
                    <p>22<br />Sells</p>
                    <p>13<br />Reviews</p>
                </div>
                
                <ProfilePostsDiv posts={profilePosts}/>

            </main>
            <Footer />
        </div>
    )

}

export default Profile