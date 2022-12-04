import PickUpItem from "./PickUpItem"

const PickUpItems = ({ items }) => {

  //console.log(posts)

  return (
    <>
        {items.map((item) => (
            <PickUpItem item={item} key={item.id}/>
        ))}
    </>
  )
}

export default PickUpItems