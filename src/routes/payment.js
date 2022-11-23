import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react"
import Header from '../components/Header'
import Footer from '../components/Footer'
import LoginForm from '../components/LoginForm'
import Alert from '../components/Alert'

const Payment = () => {

    let navigate = useNavigate()

    const [alertType, setAlertType] = useState([ 'hideAlert' ])
    const [alertMessage, setAlertMessage] = useState([ '' ])

    const placeOrder = () => {
        
    }


    const closeAlert = () => {
      setAlertType('hideAlert')
    }

    return (
      <div>
          <Header text="Hungry" link="" imgSrc="" />
          <main className="login-main">
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

                <input onClick={placeOrder} type="submit" value="Checkout" className="payment-checkout-btn" />
            </form>
          </main>
          <Footer />
      </div>

    )
  }
  
  export default Payment