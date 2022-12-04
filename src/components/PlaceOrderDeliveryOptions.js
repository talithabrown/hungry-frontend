import PickUpItems from "./PickUpItems"
import AutoCompleteAddressInput from "./AutoCompleteAddressInput"

const PlaceOrderDeliveryOptions = () => {

    const cart = JSON.parse(localStorage.getItem('cart'))
    //console.log(cart)

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

    let deliveryItemsString = ''
    if (deliveryItemsArray.length > 0) {
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
    }

    let bothItemsString = ''
    if (bothItemsArray.length > 0) {
        for (let i = 0; i < bothItemsArray.length; i++) {
            if (bothItemsArray.length === 1) {
                bothItemsString = bothItemsArray[i].post.title + ' can be delivered or picked up, select one below:'
            } else {
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
        console.log(deliveryItemsString)
    }

    // console.log(pickupItemsArray)
    // console.log(deliveryItemsArray)
    // console.log(bothItemsArray)
  
    return (
      <div className="place-order-delivery-options-div">

        <PickUpItems items={pickupItemsArray}/>

        <hr></hr>

        <p>{deliveryItemsString}</p>

        <AutoCompleteAddressInput />

        <hr></hr>

        <p>{bothItemsString}</p>

        <div className='form-control'>

                <input type="radio" required id="pick-up-only" name="delivery-method" />
                <label className='radio-label' htmlFor="pick-up-only">Pick Up</label><br />

                <input type="radio" required id="delivery-only" name="delivery-method" />
                <label className='radio-label' htmlFor="delivery-only">Delivery</label><br />

        </div>



      </div>
    )
  }
  
  export default PlaceOrderDeliveryOptions