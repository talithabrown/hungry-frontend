import { useNavigate } from 'react-router-dom'
import ReadyDateTime from "./ReadyDateTime"
import Price from "./Price"
import DeliveryPickUp from "./DeliveryPickUp"
import Ingredients from "./Ingredients"
import PostImages from "./PostImages"
import PostCartButton from "./PostCartButton"
import PostProfileImage from "./PostProfileImage"

const Post = ({ post, onAdd, cart, updateCartItemQuantityAndPostServings }) => {

  let navigate = useNavigate()

  const navigateToViewProfile = () => {
    localStorage.setItem('view_profile_id', post.user)
    navigate('/view-profile')
  }

  
  if (post) {
    return (
      <div className='post-div'>
        <hr></hr>
          <h2>{post.title}</h2>
          <div className="user-posted-div">
            <PostProfileImage onClickFunc={navigateToViewProfile} image={post.user_info.image}/>
            <p onClick={navigateToViewProfile}>{post.user_info.username}</p>
            {/* <div>
              <img className="star" src="/images/star.svg" alt="star"></img>
              <img className="star" src="/images/star.svg" alt="star"></img>
              <img className="star" src="/images/star.svg" alt="star"></img>
              <img className="star" src="/images/star.svg" alt="star"></img>
            </div> */}
          </div>
          <PostImages images={post.images} />
          <div>
            <p>{post.description}</p>
          </div>
          {/* <button className="add-to-cart-button" onClick={() => onAdd(post.id)}>Add to Cart<img src="/images/shopping-cart.svg" alt="shopping cart icon"></img></button> */}
          <PostCartButton post={post} cart={cart} onAdd={onAdd} updateCartItemQuantityAndPostServings={updateCartItemQuantityAndPostServings}/>
          <p><Price price={post.price}/></p>
          <ReadyDateTime datetime={post.ready_date_time}/>
          <p className="serving-left-p">{post.servings_available} servings left</p>
          <p>{Math.round(post.distance * 10) / 10} miles away</p>
          <DeliveryPickUp delivery={post.delivery} pickup={post.pick_up}/>
          <Ingredients ingredients={post.ingredients} />

      </div>
    )
  }
}

export default Post

// 33.448376, and the longitude is -112.074036