import Price from "./Price"

const CartItem = ({ item, removeCartItem, updatePostseverings, updateCartItemQuantityAndPostServings }) => {

  return (
    <>
        <div className='cart-item-div'>
            <img src={item.post.images[0].image} alt="post thumbnail"></img>
            <div className="cart-item-details">
                <h3>{item.post.title}</h3>
                <p><Price price={item.post.price} /> per serving</p>
                <p>Quanity: 
                    <button className="cart-item-quantity-button" onClick={() => updateCartItemQuantityAndPostServings(item.post.id, item.id, item.quantity, -1)}>-</button>
                    {item.quantity} 
                    <button className="cart-item-quantity-button" onClick={() => updateCartItemQuantityAndPostServings(item.post.id, item.id, item.quantity, 1)}>+</button>
                </p>
                <p>Total Price: <Price price={item.total_price} /></p>
                <p className="remove-cart-item-p" onClick={() => {removeCartItem(item.id); updatePostseverings(item.post.id, -item.quantity)}}>Remove Item</p>
            </div>
        </div>
        <hr></hr>
    </>
  )
}

export default CartItem