import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Posts from '../components/Posts'
import CartItemCount from "../components/CartItemCount"
import Alert from "../components/Alert"
import LocationAndDistance from "../components/LocationAndDistance"

function Home() {

    let navigate = useNavigate()

    const [posts, setPosts] = useState([])
    const [cart, setCart] = useState([])

    const [location, setLocation] = useState([ 'Please enter location' ])
    const [distance, setDistance] = useState([ '20' ])

    const [alertType, setAlertType] = useState([ 'hideAlert' ])
    const [alertMessage, setAlertMessage] = useState([ '' ])

    useEffect(() => {
        ////////////////////////
        const getPosts = async (position) => {

            console.log(position)
            const { latitude, longitude } = position.coords;
            // const latitude = 33.448376
            // const longitude = -112.074036

            //const postsFromServer = await fetchPosts()
            const postsFromServer = await fetchPosts(latitude, longitude)

            const R = 3959; // earth's mean radius in miles
            const sin = Math.sin, cos=Math.cos, acos = Math.acos;
            const π = Math.PI;
    
            postsFromServer.forEach(p => { p.distance = acos(sin(p.latitude*π/180)*sin(latitude*π/180) +
            cos(p.latitude*π/180)*cos(latitude*π/180)*cos(p.longitude*π/180-longitude*π/180)) * R })
    
            // filter for points with distance from bounding circle centre less than distance, and sort
            const postsWithinDistance = postsFromServer.filter(p => p.distance < distance).sort((a, b) => a.d - b.d);
    
            setPosts(postsWithinDistance)

            setLocationText(latitude, longitude)
        }
        //getPosts()
        ////////////////////
        const getCart = async () => {
            const cartFromServer = await fetchCart()
            setCart(cartFromServer)
        }
        getCart()
        ////////////////////
        const getLocation = async () => {
            navigator.geolocation.getCurrentPosition(getPosts, setLocationErrorOrDenied)
            //const locationFromDevice = userLocation()
            //setLocation(locationFromDevice)
        }
        getLocation()

    }, [])

    //Fetch Cart
    const fetchCart = async () => {
        const res = await fetch(`https://hungry-backend-api.herokuapp.com/main/carts/${localStorage.getItem('cart_id')}/`)
        const data = await res.json()

        console.log(data)
        return data
    }

    //Fetch posts
    const fetchPosts = async (latitude, longitude) => {
        // console.log(position)
        // const { latitude, longitude } = position.coords;

        const res = await fetch(`https://hungry-backend-api.herokuapp.com/main/posts/?lat=${latitude}&lon=${longitude}&radius=${distance}`)
        const data = await res.json()

        //console.log(data)
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


    const setLocationText = async (latitude, longitude) => {

            const res = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=dc7eec97ddbf4410b65fc759b653e65b`)
            let response = await res.json()
            if (response.results[0].components.village) {
                setLocation(`${response.results[0].components.village} ${response.results[0].components.state_code}`)
            }
            else if (response.results[0].components.city) {
                setLocation(`${response.results[0].components.city} ${response.results[0].components.state_code}`)
            }
            else if (response.results[0].components.county) {
                setLocation(`${response.results[0].components.county} ${response.results[0].components.state_code}`)
            }
            else {
                setLocation('Please enter location')
            }
    }


    const setLocationErrorOrDenied = () => {
        setAlertType('errorAlert')
        setAlertMessage('Please enter location')
    }


    return (
        <>
            <Header text="Hungry" imgSrc="/images/shopping-cart-white.svg" imgFunction={navigateToCart}/>
            <CartItemCount cart={cart}/>
            <main id="home-main">
                <Alert message={alertMessage} type={alertType} closeAlert={closeAlert}/>

                <div className="search">
                    <img src="/images/search.svg" alt="search icon"></img>
                    <input type="text"></input>
                </div>
                <div className="location-and-filter-icon-div">
                    {/* <div className="location-div">
                        <img src="/images/map-pin.svg" alt="location icon"></img>
                        <p>{location} - {distance} mi</p>
                    </div> */}
                    <LocationAndDistance setDistance={setDistance} setLocation={setLocation} distance={distance} location={location}/>
                    <img src="/images/filter.svg" alt="filter icon"></img>
                </div>

                <Posts posts={posts} onAdd={addPostToCart} cart={cart} updateCartItemQuantityAndPostServings={updateCartItemQuantityAndPostServings}/>

            </main>
            <Footer />
        </>
    )

}

export default Home