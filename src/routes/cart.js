import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CartItem from "../components/CartItem"
import Price from "../components/Price"
import Alert from '../components/Alert'

function Cart() {

    let navigate = useNavigate()

    const [cart, setCart] = useState([])

    const [alertType, setAlertType] = useState([ 'hideAlert' ])
    const [alertMessage, setAlertMessage] = useState([ '' ])

    useEffect(() => {
        const getCart = async () => {
            const cartFromServer = await fetchCart()
            setCart(cartFromServer)
        }

        getCart()
        //console.log(cart)
    }, [])

    //Fetch cart
    const fetchCart = async () => {
        const res = await fetch(`https://hungry-backend-api.herokuapp.com/main/carts/${localStorage.getItem('cart_id')}/`)
        const data = await res.json()

        //console.log(data)
        return data
    }

    // fetch single post
    const fetchPost = async (id) => {
        const res = await fetch(`https://hungry-backend-api.herokuapp.com/main/posts/${id}/`)
        const data = await res.json()

        //console.log(data)
        return data
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
            setAlertType('errorAlert')
            window.scrollTo(0,0)
        }
    } 

    const updateCartItemQuantityAndPostServings = async (postId, itemId, quantity, increaseOrDecrease) => {
        let message = await updatePostServings(postId, increaseOrDecrease)

        if (message === 'success') {
            updateCartItemQuantity(itemId, quantity, increaseOrDecrease)
        }
        else {
            setAlertMessage(message)
            setAlertType('errorAlert')
            window.scrollTo(0,0)
        }
    }

    const updateCartItemQuantity = async (itemId, quantity, increaseOrDecrease) => {
        if (quantity === 1 && increaseOrDecrease === -1) {
            removeCartItem(itemId)
        } else {
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
                setAlertType('errorAlert')
                setAlertMessage('An error occured while updating cart item quantity, please try again.')
                window.scrollTo(0,0)
            }
        }
    }

    // const updatePostServings = async (id, increaseOrDecrease) => {
    //     const post = await fetchPost(id)
    //     const updatePost = { ...post, servings_available: post.servings_available -= increaseOrDecrease }
    //     const res = await fetch(`https://hungry-backend-api.herokuapp.com/main/posts/${id}/`,
    //     {
    //         method: 'PUT',
    //         headers: {
    //             'Content-type': 'application/json'
    //         },
    //         body: JSON.stringify(updatePost)
    //     })
    //     const data = await res.json()

    //     console.log(data.servings_available)
    // }


    const updatePostServings = async (id, increaseOrDecrease) => {
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

    const navigateToPayment = () => {
        navigate('/payment')
    }


    const closeAlert = () => {
        setAlertType('hideAlert')
    }

    if (cart.items !== undefined && cart.items != null && cart.items.length > 0) {
        return (
            <>
                <Header text="Hungry" link="" imgSrc=""/>
                <main id="home-main">
                    <Alert message={alertMessage} type={alertType} closeAlert={closeAlert}/>
    
                    {cart.items.map((item) => (
                        <CartItem item={item} key={item.id} removeCartItem={removeCartItem} updateCartItemQuantityAndPostServings={updateCartItemQuantityAndPostServings} updatePostseverings={updatePostServings}/>
                    ))}

                    <div className="cart-total-price-and-checkout-button-div">
                        <h3>Total Price: <Price price={cart.total_price} /></h3>
                        <button onClick={navigateToPayment}className="cart-checkout-button">Checkout</button>
                    </div>
        
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

                    <p>There are no items in your cart</p>

                </main>
                <Footer />
            </>
        )
    }

}

export default Cart