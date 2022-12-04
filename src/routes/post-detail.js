import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Post from '../components/Post'

function PostDetail() {

    const [post, setPost] = useState('')

    useEffect(() => {
        const getPost = async () => {
        const postFromServer = await fetchPost()
        setPost(postFromServer)
        }

        getPost()
    }, [])

    //Fetch posts
    const fetchPost = async () => {
        const res = await fetch(`https://hungry-backend-api.herokuapp.com/main/posts/${localStorage.getItem('post-detail-id')}/`)
        const p = await res.json()

        const lat = localStorage.getItem('lat')
        const lon = localStorage.getItem('lon')

        const R = 3959; // earth's mean radius in miles
        const sin = Math.sin, cos=Math.cos, acos = Math.acos;
        const π = Math.PI;

        p.distance = acos(sin(p.latitude*π/180)*sin(lat*π/180) + cos(p.latitude*π/180)*cos(lat*π/180)*cos(p.longitude*π/180-lon*π/180)) * R 

        return p
    }

    // Add post to Cart
    const addPostToCart = (id) => {
        console.log(`Post with id ${id}, added to cart`)
    }


    if (localStorage.getItem('edit-post-detail') === 'true') {
        return (
            <>
                <Header text="Hungry" link="" imgSrc=""/>
                <main id="home-main">

                    <div className="post-detail-back-edit-delete-div">
                        <Link to='/profile' className="post-detail-back-link"><img src="/images/chevron-left.svg" alt="back icon"/></Link>

                        <div className="post-detail-edit-delete-options-div">
                            <Link to='/edit-post' className="edit-post-link">Edit</Link>
                            <Link to='/delete-post' className="delete-post-link">Delete</Link>
                        </div>
                    </div>

                    <Post post={post} onAdd={addPostToCart}/>

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

                    <div className="post-detail-back-edit-delete-div">
                        <Link to='/view-profile' className="post-detail-back-link"><img src="/images/chevron-left.svg" alt="back icon"/></Link>
                    </div>

                    <Post post={post} onAdd={addPostToCart}/>

                </main>
                <Footer />
            </>
        )
    }

}

export default PostDetail