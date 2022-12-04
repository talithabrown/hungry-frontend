const PostProfileImage = ({ image, onClickFunc }) => {

    if (image) {
        if (image !== undefined && image !== '') {
            const imgLink = 'https://res.cloudinary.com/heblzeanc/image/upload/v1/' + image;
            return (
                <img className="post-profile-img" onClick={onClickFunc} src={imgLink} alt="post profile"></img>
            )
        }
        else {
            return (
                <img className="post-profile-img-placeholder" onClick={onClickFunc} src='/images/free_fork_icon_grey.svg' alt='placeholder logo' />
            )
        }
    }

  }
  
  export default PostProfileImage