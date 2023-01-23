import PickUpItem from "./PickUpItem"

const PickUpItems = ({ items }) => {

  return (
    <>
        {items.map((item) => (
            <PickUpItem item={item} key={item.id}/>
        ))}
    </>
  )
}

export default PickUpItems