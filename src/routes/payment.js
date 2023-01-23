import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react"
import Header from '../components/Header'
import Alert from '../components/Alert'

const Payment = () => {

    let navigate = useNavigate()

    const [alertType, setAlertType] = useState([ 'hideAlert' ])
    const [alertMessage, setAlertMessage] = useState([ '' ])

    const [displayClassName, setDisplayClassName] = useState('payment-form')
    const [displaySuccessClassName, setDisplaySuccessClassName] = useState('displayNone')


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
        //navigate('/order-successful')
        setDisplayClassName('displayNone')
        setDisplaySuccessClassName('show')
        document.getElementById('back-link-on-payment-page').style.display = 'none'
    }


    const closeAlert = () => {
      setAlertType('hideAlert')
    }

    return (
      <div>
          <Header text="Hungry" link="" imgSrc="" />
          <main className="login-main">
          <Link to='/delivery-options' id="back-link-on-payment-page" className="post-detail-back-link"><img src="/images/chevron-left.svg" alt="back icon"/></Link>
            <Alert message={alertMessage} type={alertType} closeAlert={closeAlert}/>
            <h3 className={displaySuccessClassName}>Your order has been placed successfully!</h3>
            <div className={displayClassName}>
                <div>
                    <h2>Payment</h2>

                    <p id="fictional-payment-p">This is a fictional payment</p>
 
                    <label htmlFor="name">Name on Card</label>
                    <input required type="text" id="name" name="name" defaultValue="John Doe"/>
                    <label htmlFor="num">Credit card number</label>
                    <input required type="text" id="num" name="number" defaultValue="1111-2222-3333-4444"/>
                    <label htmlFor="exp">Exp Month</label>
                    <input required type="text" id="exp" name="exp" defaultValue="09"></input>

                    <div>
                        <div>
                            <label htmlFor="expy">Exp Year</label>
                            <input required type="text" id="expy" name="expy" defaultValue="2026"/>
                        </div>
                        <div>
                            <label htmlFor="cv">CVV</label>
                            <input required type="text" id="cv" name="cv" defaultValue="111"/>
                        </div>
                    </div>
                </div>

                {/* <input onClick={placeOrder} type="submit" value="Checkout" className="payment-checkout-btn" /> */}
                <button onClick={placeOrder} className="payment-checkout-btn">Place Order</button>
            </div>
          </main>
      </div>

    )
  }
  
  export default Payment