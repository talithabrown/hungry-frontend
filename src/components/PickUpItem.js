const PickUpItem = ({ item }) => {

    return (
    <div className='pick-up-item-div'>
        <p>{item.post.title} is a pick up item, you can pick up at this address:</p>
        <p>{item.post.location}</p>
        <hr></hr>
    </div>
    )

  }
  
  export default PickUpItem