

const CartItemCount = ({ cart }) => {

        if (cart.items) {
            if (cart.items.length > 0) {
                return (
                    <p className="cart-item-count-p">{cart.items.length}</p>
                )
            }
        }

  }
  
  export default CartItemCount