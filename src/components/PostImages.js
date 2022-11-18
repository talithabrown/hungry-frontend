const PostImages = ({ images }) => {

    if (images) {
        if (images[0] !== undefined && images[0] !== '') {
            return (
                <img className="food-img" src={images[0].image} alt="post"></img>
            )
        }
        else {
            return (
                <img className="food-img-placeholder" src='/images/user.svg' alt='placeholder profile icon' />
            )
        }
    }

  }
  
  export default PostImages