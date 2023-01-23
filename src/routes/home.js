import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Posts from '../components/Posts'
import CartItemCount from "../components/CartItemCount"
import Alert from "../components/Alert"
import LocationAndDistance from "../components/LocationAndDistance"
import Filter from "../components/Filter"
import Search from "../components/Seach"

function Home() {

    let navigate = useNavigate()

    const [posts, setPosts] = useState([])
    const [cart, setCart] = useState([])

    const [location, setLocation] = useState([ 'Please enter location' ])
    const [distance, setDistance] = useState([ '20' ])

    const [alertType, setAlertType] = useState([ 'hideAlert' ])
    const [alertMessage, setAlertMessage] = useState([ '' ])


    useEffect(() => {

        localStorage.setItem('queryParams', '')
        localStorage.setItem('searchParams', '')

        const getDeviceCoords = () => {
            const lat = localStorage.getItem('lat')
            const lon = localStorage.getItem('lon')
            const locationText = localStorage.getItem('locationText')
            if (lat == null || lon == null) {
                navigator.geolocation.getCurrentPosition(success, setLocationErrorOrDenied)
            }
            else {
                if (locationText != null) {
                    setLocation(locationText)
                }
                else {
                    setLocationText(lat, lon)
                }
            }
        }
        getDeviceCoords()

        ////////////////////
        const getCart = async () => {
            if (localStorage.getItem('cart_id')) {
                const cartFromServer = await fetchCart()
                setCart(cartFromServer)
            }
        }
        getCart()

        getPosts()

    }, [])

    const success = (position) => {
        const { latitude , longitude } = position.coords
        localStorage.setItem('lat', latitude)
        localStorage.setItem('lon', longitude)
        getPosts(latitude, longitude)

        setLocationText(latitude, longitude)
    }

    const setLocationErrorOrDenied = () => {
        setAlertType('errorAlert')
        setAlertMessage('Please enter location')
    }

    const filterPostsByDistance = (latitude, longitude, postsFromServer) => {
        const R = 3959; // earth's mean radius in miles
        const sin = Math.sin, cos=Math.cos, acos = Math.acos;
        const π = Math.PI;

        postsFromServer.forEach(p => { p.distance = acos(sin(p.latitude*π/180)*sin(latitude*π/180) +
        cos(p.latitude*π/180)*cos(latitude*π/180)*cos(p.longitude*π/180-longitude*π/180)) * R })

        // filter for points with distance from bounding circle centre less than distance, and sort
        const postsWithinDistance = postsFromServer.filter(p => p.distance < distance).sort((a, b) => a.d - b.d);

        return postsWithinDistance
    }


    // const getPosts = async (latitude, longitude) => {
    const getPosts = async () => {

            const lat = localStorage.getItem('lat')
            const lon = localStorage.getItem('lon')
    
            const postsFromServer = await fetchPosts(lat, lon)
            const postsWithinDistance = filterPostsByDistance(lat, lon, postsFromServer)
    
            //console.log(postsWithinDistance)
            if (postsWithinDistance.length === 0) {
                document.getElementById('no-posts-to-show-p').classList = 'no-posts-p'
            } 
            else {
                document.getElementById('no-posts-to-show-p').classList = 'displayNone'
            }
    
            setPosts(postsWithinDistance)

    }


    //Fetch Cart
    const fetchCart = async () => {
        const res = await fetch(`https://hungry-backend-api.herokuapp.com/main/carts/${localStorage.getItem('cart_id')}/`)
        const data = await res.json()

        //console.log(data)
        return data
    }

    //Fetch posts
    const fetchPosts = async (latitude, longitude) => {

        //const { latitude, longitude } = position.coords;
        let queryParams = localStorage.getItem('queryParams')
        let searchParams = localStorage.getItem('searchParams')
        let url = `https://hungry-backend-api.herokuapp.com/main/posts/?lat=${latitude}&lon=${longitude}&radius=${distance}`
        if (queryParams !== undefined && queryParams !== null) {
           url = url + queryParams
        }
        if (searchParams !== undefined && searchParams != null && searchParams !== '') {
            url = url + '&' + searchParams
        }

        showLoadingDiv()
        const res = await fetch(url)
        const data = await res.json()
        localStorage.setItem('post-results', JSON.stringify(data.results))
        hideLoadingDiv()
        return data.results
    }

    // fetch single post
    const fetchPost = async (id) => {
        const res = await fetch(`https://hungry-backend-api.herokuapp.com/main/posts/${id}/`)
        const data = await res.json()

        //console.log(data)
        return data
    }

    const updatePostServings = async (id, increaseOrDecrease) => {
        console.log('inside update post servings function')
        let message = ''
        const post = await fetchPost(id)
        if (post.servings_available === 0 && increaseOrDecrease === 1) {
            message = 'Item NOT added to cart because there are 0 servings left'
            console.log(message)
            return message
        }
        const updatePost = { ...post, servings_available: post.servings_available -= increaseOrDecrease }
        const res = await fetch(`https://hungry-backend-api.herokuapp.com/main/posts/${id}/`,
        {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updatePost)
        })
        const response = await res
        if (response.status === 400) {
            message = 'Item NOT added to cart because there are 0 servings left'
            console.log(message)
            return message
        }
        else if (response.status === 200) {
            const data = await response.json()
            console.log(data)
            console.log(data.servings_available)

            setPosts(
                posts.map((post) => 
                    post.id === id ? { ...post, servings_available: data.servings_available} : post
                )
            )

            message = 'success'
            console.log(message)
            return message
        }
        else {
            message = 'Sorry, an error occured'
            console.log(message)
            return message
        }
    }

    const updateCartItemQuantityAndPostServings = async (postId, itemId, quantity, increaseOrDecrease) => {
        let message = await updatePostServings(postId, increaseOrDecrease)

        if (message === 'success') {
            updateCartItemQuantity(itemId, quantity, increaseOrDecrease)
        }
        else {
            setAlertMessage(message)
            setAlertType('errorAlertHome')
        }
    }

    const createCart = async () => {
        const res = await fetch(`https://hungry-backend-api.herokuapp.com/main/carts/`,
        {
            method: 'POST'
        })
        const data = await res.json()
        localStorage.setItem('cart_id', data.id)
        console.log(data)
    }

    const addItemToCart = async (post_id) => {
        const res = await fetch(`https://hungry-backend-api.herokuapp.com/main/carts/${localStorage.getItem('cart_id')}/items/`,
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ 
                "post_id": post_id,
                "quantity": 1
            })
        })
        const response = await res
        console.log(response.status)
        if (response.status === 201) {
            const cartFromServer = await fetchCart()
            setCart(cartFromServer)
        } else {
            console.log('There was an error adding item to cart')
            setAlertMessage('There was an error adding item to cart')
            setAlertType('errorAlertHome')
        }
        //const data = await response.json()
        //console.log(data)
    }

    // Remove cart item
    const removeCartItem = async (itemId) => {
        const res = await fetch(`https://hungry-backend-api.herokuapp.com/main/carts/${localStorage.getItem('cart_id')}/items/${itemId}/`,
        {
            method: 'DELETE',
        })

        let response = await res

        if (response.status === 204) {
            console.log('deleted successfully')
            const cartFromServer = await fetchCart()
            setCart(cartFromServer)
        }
        else {
            console.log('error removing cart item from cart')
            setAlertMessage('There was an error removing item from cart')
            setAlertType('errorAlertHome')
        }
    } 

    //Add post to Cart
    const addPostToCart = async (id) => {
        if (localStorage.getItem('cart_id') === undefined || localStorage.getItem('cart_id') === null) {
            createCart()
            let message = await updatePostServings(id, 1)
            if (message === 'success') {
                addItemToCart(id)
            } else {
                setAlertMessage(message)
                setAlertType('errorAlertHome')
            }
        } else {
            let message = await updatePostServings(id, 1)
            if (message === 'success') {
                addItemToCart(id)
            } else {
                setAlertMessage(message)
                setAlertType('errorAlertHome')
            }
        }
    }

    const navigateToCart = () => {
        navigate('/cart')
    }


    const updateCartItemQuantity = async (itemId, quantity, increaseOrDecrease) => {
        if (quantity === 1 && increaseOrDecrease === -1) {
            removeCartItem(itemId)
        }
        else {
            const res = await fetch(`https://hungry-backend-api.herokuapp.com/main/carts/${localStorage.getItem('cart_id')}/items/${itemId}/`,
            {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({"quantity": quantity + increaseOrDecrease})
            })

            let response = await res
            
            if (response.status === 200) {
                console.log('quantity updated successfully')
                const cartFromServer = await fetchCart()
                setCart(cartFromServer)
            }
            else {
                console.log('there was an error when updating cart item quantity')
            }
        }
    }

    const closeAlert = () => {
        setAlertType('hideAlert')
    }

    const showLoadingDiv = () => {
        let loadingDiv = document.getElementById('loading-div')
        loadingDiv.classList = 'show-loading-div'
    }

    const hideLoadingDiv = () => {
        let loadingDiv = document.getElementById('loading-div')
        loadingDiv.classList = 'displayNone'
    }


    const setLocationText = async (latitude, longitude) => {

            const res = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=dc7eec97ddbf4410b65fc759b653e65b`)
            let response = await res.json()
            if (response.results[0]) {
                if (response.results[0].components.village) {
                    setLocation(`${response.results[0].components.village} ${response.results[0].components.state_code}`)
                    localStorage.setItem('locationText', `${response.results[0].components.village} ${response.results[0].components.state_code}`)
                }
                else if (response.results[0].components.city) {
                    setLocation(`${response.results[0].components.city} ${response.results[0].components.state_code}`)
                    localStorage.setItem('locationText', `${response.results[0].components.city} ${response.results[0].components.state_code}`)
                }
                else if (response.results[0].components.county) {
                    setLocation(`${response.results[0].components.county} ${response.results[0].components.state_code}`)
                    localStorage.setItem('locationText', `${response.results[0].components.county} ${response.results[0].components.state_code}`)
                }
                else {
                    setLocation('Please enter location')
                }
            }
    }

    return (
        <>
            <Header text="Hungry" imgSrc="/images/shopping-cart-white.svg" imgFunction={navigateToCart}/>
            <CartItemCount cart={cart}/>
            <main id="home-main">
                <Alert message={alertMessage} type={alertType} closeAlert={closeAlert}/>

                <Search getPosts={getPosts}/>
                <LocationAndDistance setDistance={setDistance} setLocation={setLocation} distance={distance} location={location} getPosts={getPosts}/>
                <Filter getPosts={getPosts}/>

                <div id="loading-div" class="displayNone">
                    <p>Loading...</p>
                    <div class="loader"></div>
                </div>

                <Posts posts={posts} onAdd={addPostToCart} cart={cart} updateCartItemQuantityAndPostServings={updateCartItemQuantityAndPostServings}/>

                <p id="no-posts-to-show-p" className="displayNone">No posts to show. Try different search or different filters. Try different location.</p>

            </main>
        </>
    )

}

export default Home