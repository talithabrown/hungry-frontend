

const DeliveryPickUp = ({ delivery, pickup }) => {

  let deliveryPickupOptions = ''

  if (delivery === true && pickup === true) {
    deliveryPickupOptions = 'Pick up or Delivery'
  }
  else if (pickup === true) {
    deliveryPickupOptions = 'Pick up Only'
  }
  else if (delivery === true) {
    deliveryPickupOptions = 'Delivery Only'
  }


  return (
    <p>{deliveryPickupOptions}</p>
  )
}

export default DeliveryPickUp