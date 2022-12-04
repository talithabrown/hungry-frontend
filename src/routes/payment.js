import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react"
import Header from '../components/Header'
import Footer from '../components/Footer'
import Alert from '../components/Alert'

const Payment = () => {

    let navigate = useNavigate()

    const [alertType, setAlertType] = useState([ 'hideAlert' ])
    const [alertMessage, setAlertMessage] = useState([ '' ])

    const placeOrder = async () => {
        console.log('inside place order function')

        let cartId = localStorage.getItem('cart_id')
        const res = await fetch(`https://hungry-backend-api.herokuapp.com/main/orders/`,
        {
            method: 'POST',
            headers: {
                'Authorization': 'JWT '+ localStorage.getItem('jwtAccess'), 
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ 
                "cart_id": cartId
            })
        })
        const response = await res
        console.log(response.status)
        if (response.ok) {
            console.log('this was a success')
            localStorage.removeItem('cart_id')
            navigateToOrderSuccess()
        } else {
            console.log('There was an error posting order')
            setAlertMessage('There was an error placing order')
            setAlertType('errorAlert')
        }
        const data = await response.json()
        console.log(data)
    }

    const navigateToOrderSuccess = () => {
        navigate('/order-successful')
    }


    const closeAlert = () => {
      setAlertType('hideAlert')
    }

    return (
      <div>
          <Header text="Hungry" link="" imgSrc="" />
          <main className="login-main">
          <Link to='/delivery-options' className="post-detail-back-link"><img src="/images/chevron-left.svg" alt="back icon"/></Link>
            <Alert message={alertMessage} type={alertType} closeAlert={closeAlert}/>
            <form>
                <div>
                    <h2>Payment</h2>
 
                    <label htmlFor="cname">Name on Card</label>
                    <input required type="text" id="cname" name="cardname" placeholder="John More Doe" />
                    <label htmlFor="ccnum">Credit card number</label>
                    <input required type="text" id="ccnum" name="cardnumber" placeholder="1111-2222-3333-4444" />
                    <label htmlFor="expmonth">Exp Month</label>
                    <input required type="text" id="expmonth" name="expmonth" placeholder="September"></input>

                    <div>
                        <div>
                            <label htmlFor="expyear">Exp Year</label>
                            <input required type="text" id="expyear" name="expyear" placeholder="2018" />
                        </div>
                        <div>
                            <label htmlFor="cvv">CVV</label>
                            <input required type="text" id="cvv" name="cvv" placeholder="352" />
                        </div>
                    </div>
                </div>

                {/* <input onClick={placeOrder} type="submit" value="Checkout" className="payment-checkout-btn" /> */}
                <button onClick={placeOrder} className="payment-checkout-btn">Place Order</button>
            </form>
          </main>
          <Footer />
      </div>

    )
  }
  
  export default Payment