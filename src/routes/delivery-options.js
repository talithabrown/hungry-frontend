import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from "../components/Header"
import PickUpItems from "../components/PickUpItems"
import AutoCompleteAddressInput from "../components/AutoCompleteAddressInput"

function DeliveryOptions() {

    let navigate = useNavigate()

    const [displayClassNameSelect, setDisplayClassNameSelect] = useState('select-delivery-option-div')
    const [displayClassNameDeliveryDiv, setDisplayClassNameDeliveryDiv] = useState('displayNone')
    const [displayClassNamePickupDiv, setDisplayClassNamePickupDiv] = useState('displayNone')
    const [displayClassNameButton, setDisplayClassNameButton] = useState('displayNone')
    const [delivery, setDelivery] = useState('')
    const [pickupItems, setPickupItems] = useState([])
    const [deliveryItems, setDeliveryItems] = useState('')
    const [bothItems, setBothItems] = useState('')

    useEffect(() => {

        init()
        concatBothItemsString()
        concatDeliveryItemsString()

    }, [])

    const cart = JSON.parse(localStorage.getItem('cart'))

    const init = () => {
        let pickupItemsArray = []
        let deliveryItemsArray = []
        let bothItemsArray = []

        for (let i = 0; i < cart.items.length; i++) {
            if (cart.items[i].post.delivery === true && cart.items[i].post.pick_up === true) {
                bothItemsArray.push(cart.items[i])
            }
            else if (cart.items[i].post.delivery === true) {
                deliveryItemsArray.push(cart.items[i])
            }
            else if (cart.items[i].post.pick_up === true) {
                pickupItemsArray.push(cart.items[i])
            }
        }

        localStorage.setItem('pickupItemsArray', JSON.stringify(pickupItemsArray))
        localStorage.setItem('deliveryItemsArray', JSON.stringify(deliveryItemsArray))
        localStorage.setItem('bothItemsArray', JSON.stringify(bothItemsArray))


        if (bothItemsArray.length === 0) {
            setDisplayClassNameSelect('displayNone')
            setDisplayClassNameButton('show')
            if (deliveryItemsArray.length > 0) {
                setDisplayClassNameDeliveryDiv('show')
            }
            if (pickupItemsArray.length > 0) {
                setPickupItems(pickupItemsArray)
                setDisplayClassNamePickupDiv('show')
            }
        }

    } 
    // END of init

    const concatDeliveryItemsString = () => {
        let deliveryItemsArray = JSON.parse(localStorage.getItem('deliveryItemsArray'))
        if (deliveryItemsArray.length > 0) {
            let deliveryItemsString = ''
            for (let i = 0; i < deliveryItemsArray.length; i++) {
                if (deliveryItemsArray.length === 1) {
                    deliveryItemsString = deliveryItemsArray[i].post.title + ' is a delivery item, enter delivery address below:'
                } else {
                    if (i === deliveryItemsArray.length - 1) {
                        deliveryItemsString = deliveryItemsString + 'and ' + deliveryItemsArray[i].post.title + ' are delivery items, enter delivery address below:'
                    }
                    else if (deliveryItemsArray.length === 2) {
                        deliveryItemsString = deliveryItemsString + deliveryItemsArray[i].post.title + ' '
                    }
                    else {
                        deliveryItemsString = deliveryItemsString + deliveryItemsArray[i].post.title + ', '
                    }
                }
            }
            localStorage.setItem('deliveryItemsArray', JSON.stringify(deliveryItemsArray))
            setDeliveryItems(deliveryItemsString)
        }
    }

    const concatBothItemsString = () => {
        let bothItemsArray = JSON.parse(localStorage.getItem('bothItemsArray'))
        let bothItemsString = ''
        if (bothItemsArray.length > 0) {
            for (let i = 0; i < bothItemsArray.length; i++) {
                if (bothItemsArray.length === 1) {
                    bothItemsString = bothItemsArray[i].post.title + ' can be delivered or picked up, select one below:'
                } 
                else {
                    if (i === bothItemsArray.length - 1) {
                        bothItemsString = bothItemsString + 'and ' + bothItemsArray[i].post.title + ' can be delivered or picked up, select one below:'
                    }
                    else if (bothItemsArray.length === 2) {
                        bothItemsString = bothItemsString + bothItemsArray[i].post.title + ' '
                    }
                    else {
                        bothItemsString = bothItemsString + bothItemsArray[i].post.title + ', '
                    }
                }
            }
            localStorage.setItem('bothItemsArray', JSON.stringify(bothItemsArray))
            setBothItems(bothItemsString)
        }
    }

    const sortAndShowItems = () => {

        let bothItemsArray = JSON.parse(localStorage.getItem('bothItemsArray'))
        let deliveryItemsArray = JSON.parse(localStorage.getItem('deliveryItemsArray'))
        let pickupItemsArray = JSON.parse(localStorage.getItem('pickupItemsArray'))

        setDisplayClassNameSelect('displayNone')
        if (delivery === 'pickup') {
            for (let i = 0; i < bothItemsArray.length; i++ ) {
                pickupItemsArray.push(bothItemsArray[i])
            }
        }
        if (delivery === 'delivery') {
            for (let i = 0; i < bothItemsArray.length; i++ ) {
                deliveryItemsArray.push(bothItemsArray[i])
            }
        }

        ///////

        let deliveryItemsString = ''
        if (deliveryItemsArray.length > 0) {
            for (let i = 0; i < deliveryItemsArray.length; i++) {
                if (deliveryItemsArray.length === 1) {
                    deliveryItemsString = deliveryItemsArray[i].post.title + ' is a delivery item, enter delivery address below:'
                } else {
                    console.log('here')
                    if (i === deliveryItemsArray.length - 1) {
                        deliveryItemsString = deliveryItemsString + 'and ' + deliveryItemsArray[i].post.title + ' are delivery items, enter delivery address below:'
                    }
                    else if (deliveryItemsArray.length === 2) {
                        deliveryItemsString = deliveryItemsString + deliveryItemsArray[i].post.title + ' '
                    }
                    else {
                        deliveryItemsString = deliveryItemsString + deliveryItemsArray[i].post.title + ', '
                    }
                }
            }
            setDeliveryItems(deliveryItemsString)

            setDisplayClassNameDeliveryDiv('show')
        }

        if (pickupItemsArray.length > 0) {
            setPickupItems(pickupItemsArray)
            setDisplayClassNamePickupDiv('show')
        }
        setDisplayClassNameButton('show')

    }
    // END of sort and show items


    const navigateToPayment = () => {
        navigate('/payment')
    }
  
    return (
        
      <div>
        <Header text="Hungry" link="" imgSrc="" />
            <main className="login-main">

            <div className={displayClassNameSelect}>
            <Link to='/cart' className="post-detail-back-link"><img src="/images/chevron-left.svg" alt="back icon"/></Link>
                <p>{bothItems}</p>

                <div className='form-control'>

                    <input type="radio" required id="pick-up-only" name="delivery-method" value={delivery} onChange={(e) => setDelivery('pickup')}/>
                    <label className='radio-label' htmlFor="pick-up-only">Pick Up</label><br />

                    <input type="radio" required id="delivery-only" name="delivery-method" value={delivery} onChange={(e) => setDelivery('delivery')}/>
                    <label className='radio-label' htmlFor="delivery-only">Delivery</label><br />

                </div>

                <button className='btn' onClick={() => sortAndShowItems()}>Next</button>
            </div>

            <div className={displayClassNameButton}>
                {/* <img onClick={toggleDisplay} src="/images/chevron-left.svg" alt="back icon"/> */}
                <Link to='/cart' className="post-detail-back-link"><img src="/images/chevron-left.svg" alt="back icon"/></Link>
            </div>

            <div className={displayClassNamePickupDiv}>
                <PickUpItems items={pickupItems}/>
            </div>

            <div className={displayClassNameDeliveryDiv}>
                <p>{deliveryItems}</p>
                <AutoCompleteAddressInput />
                <hr></hr>
            </div>

            <div className={displayClassNameButton}>
                <button className='btn' onClick={navigateToPayment}>Continue to Payment</button>
            </div>


        </main>

      </div>
    )
  }
  
  export default DeliveryOptions