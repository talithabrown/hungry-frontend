const PostProfileImage = ({ image }) => {

    if (image) {
        if (image !== undefined && image !== '') {
            return (
                <img className="post-profile-img" src={image} alt="post profile"></img>
            )
        }
        else {
            return (
                <img className="post-profile-img-placeholder" src='/images/free_fork_icon_grey.svg' alt='placeholder logo' />
            )
        }
    }

  }
  
  export default PostProfileImage