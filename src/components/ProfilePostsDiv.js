import { Link, useNavigate } from 'react-router-dom'

const ProfilePostsDiv = ({ posts, edit }) => {

  let navigate = useNavigate()

  let postsArray = []
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].images[0] !== undefined && posts[i].images[0] !== '') {
      postsArray.push({
        image: posts[i].images[0].image,
        id: posts[i].id
      })
    }
    else {
      postsArray.push({
        image: '/images/free_fork_icon_grey.svg',
        id: posts[i].id
      })
    }
  }

  const sendToPostDetail = (postId) => {
    localStorage.setItem('post-detail-id', postId)
    localStorage.setItem('edit-post-detail', edit)
    navigate('/post-detail')
  }



  return (
    <div className="profile-posts-div">

        {postsArray.map((post) => (
            <img src={post.image} alt="post" key={post.id} onClick={() => sendToPostDetail(post.id)}/>
            // <img src={post.image} alt="post" key={post.id}/>
        ))}

    </div>
  )
}

export default ProfilePostsDiv