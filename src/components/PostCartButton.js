

const PostCartButton = ({ post, cart, onAdd, updateCartItemQuantityAndPostServings }) => {

    if (cart) {
        if (cart.items) {
            for (let i = 0; i < cart.items.length; i++) {
                if (post.id === cart.items[i].post.id) {
                    return (
                        <div className="post-cart-div">
                            <button className="cart-item-quantity-button" onClick={() => updateCartItemQuantityAndPostServings(post.id, cart.items[i].id, cart.items[i].quantity, -1)}>-</button>
                            <p>{cart.items[i].quantity}</p>
                            <button className="cart-item-quantity-button" onClick={() => updateCartItemQuantityAndPostServings(post.id, cart.items[i].id, cart.items[i].quantity, 1)}>+</button>
                        </div>
                    )
                }
            }

        }
    }

    return (
        <button className="add-to-cart-button" onClick={() => onAdd(post.id)}>Add to Cart<img src="/images/shopping-cart.svg" alt="shopping cart icon"></img></button>
    )

}

export default PostCartButton