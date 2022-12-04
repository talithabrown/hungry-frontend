import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Alert from '../components/Alert'
import PurchaseOrder from "../components/PurchaseOrder"

function PurchaseHistory() {

    let navigate = useNavigate()

    const [alertType, setAlertType] = useState([ 'hideAlert' ])
    const [alertMessage, setAlertMessage] = useState([ '' ])

    const [orders, setOrders] = useState([])

    useEffect(() => {
        const getOrders = async () => {
            const ordersFromServer = await fetchOrders()
            setOrders(ordersFromServer)
        }

        getOrders()
        //console.log(orders)
    }, [])

    //Fetch orders
    const fetchOrders = async () => {
        const res = await fetch(`https://hungry-backend-api.herokuapp.com/main/orders/`,
        {
            method: 'GET',
            headers: {
                'Authorization': 'JWT '+ localStorage.getItem('jwtAccess'), 
                'Content-type': 'application/json'
            }
        })
        const data = await res.json()

        console.log(data)
        return data
    }

    // fetch single order
    const fetchOrder = async (id) => {
        const res = await fetch(`https://hungry-backend-api.herokuapp.com/main/orders/${id}/`,
        {
            method: 'GET',
            headers: {
                'Authorization': 'JWT '+ localStorage.getItem('jwtAccess'), 
                'Content-type': 'application/json'
            }
        }
        )
        const data = await res.json()

        //console.log(data)
        return data
    }

    const navigateBack = () => {
        navigate('/profile')
    }


    const closeAlert = () => {
        setAlertType('hideAlert')
    }

    if (orders !== undefined && orders != null && orders.length > 0) {
        return (
            <>
                <Header text="Purchase History" link="" imgSrc=""/>
                <main id="home-main">
                    <Alert message={alertMessage} type={alertType} closeAlert={closeAlert}/>
                    <Link to='/profile' className="post-detail-back-link"><img src="/images/chevron-left.svg" alt="back icon"/></Link>

                    <hr></hr>
                    {orders.map((order) => (
                        <PurchaseOrder order={order} key={order.id} />
                    ))}
        
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

                    <p>You have no past orders</p>

                </main>
                <Footer />
            </>
        )
    }

}

export default PurchaseHistory