import { useNavigate } from 'react-router-dom'
import Price from "./Price"

const PurchaseOrderItem = ({ orderItem, datetime }) => {

    let navigate = useNavigate()

    const navigateToReviewForm = (postId) => {
        localStorage.setItem('review-post-id', postId)
        navigate('/new-review')
    }

  
    if (orderItem) {
        return (
            <>
                <div className='order-item-div'>
                    <img src={orderItem.post.images[0].image} alt="order item thumbnail"></img>
                    <div>
                        <h3>{orderItem.post.title}</h3>
                        <p>Quantity: {orderItem.quantity}</p>
                        <p><Price price={orderItem.unit_price}/> each</p>
                        <p>{datetime}</p>
                        <button onClick={() => navigateToReviewForm(orderItem.post.id)}>Review</button>
                    </div>
                </div>
                <hr></hr>
            </>
        )
    }
}

export default PurchaseOrderItem