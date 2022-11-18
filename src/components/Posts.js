import Post from './Post'

const Posts = ({ posts, onAdd, cart, updateCartItemQuantityAndPostServings }) => {

  //console.log(posts)

  return (
    <>
    {posts.map((post) => (
      <Post key={post.id} post={post} onAdd={onAdd} cart={cart} updateCartItemQuantityAndPostServings={updateCartItemQuantityAndPostServings}/>
    ))}
    </>
  )
}

export default Posts