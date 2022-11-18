import { useState, useEffect } from 'react'
import EditIngredientsForm from './EditIngredientsForm'

const EditPostForm = ({ onSubmitPost }) => {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [servings, setServings] = useState('')
  const [delivery, setDelivery] = useState('')
  const [datetime, setDatetime] = useState('')
  const [location, setLocation] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [originalIngredients, setOriginalIngredients] = useState([])
  const [postImage, setPostImage] = useState()
  const [postImageId, setPostImageId] = useState()

  const [post, setPost] = useState('')

  useEffect(() => {
      const getPost = async () => {
        const postFromServer = await fetchPost()
        setPost(postFromServer)
        setTitle(postFromServer.title)
        setDescription(postFromServer.description)
        setPrice(postFromServer.price)
        setServings(postFromServer.servings_available)
        setIngredients(postFromServer.ingredients)
        setOriginalIngredients(postFromServer.ingredients)
        setPostImageId(postFromServer.images[0].id)

        if (postFromServer.delivery === true && postFromServer.pick_up === true) {
            setDelivery('both')
            document.getElementById("both").checked = true;
        }
        else if (postFromServer.delivery === true) {
            setDelivery('deliveryOnly')
            document.getElementById("delivery-only").checked = true;
        }
        else if (postFromServer.pick_up === true) {
            setDelivery('pickupOnly')
            document.getElementById("pick-up-only").checked = true;
        }
    
        if (postFromServer.ready_date_time) {
            let  formattedDatetime = formatDateTime(postFromServer.ready_date_time)
            document.getElementById("ready-date-time").value = formattedDatetime
            setDatetime(formattedDatetime)
        }
        setLocation(postFromServer.location)
      }

      getPost()
  }, [])

  //Fetch post
  const fetchPost = async () => {
      const res = await fetch(`https://hungry-backend-api.herokuapp.com/main/posts/${localStorage.getItem('post-detail-id')}/`)
      const data = await res.json()

      //console.log(data)
      return data
  }

  const formatDateTime = (datetimeFromServer) => {
    let year = datetimeFromServer.substring(0, 4)
    let month = datetimeFromServer.substring(5, 7)
    let day = datetimeFromServer.substring(8, 10)
    let time = datetimeFromServer.substring(11, 16)
    let formattedDatetime = `${year}-${month}-${day}T${time}`
    return formattedDatetime
  }


  const onSubmit = (e) => {
    e.preventDefault()
    let ingredientElements = document.getElementsByClassName('ingredients')
    Array.from(ingredientElements)

    let ingredientsArray = []
    for (let i = 0; i < ingredientElements.length; i++) {
        if (ingredientElements[i].value !== '' && ingredientElements[i].value !== undefined) {
            ingredientsArray.push(ingredientElements[i].value.trim())
        }
    }

    onSubmitPost(title, description, price, servings, datetime, delivery, location, ingredientsArray, originalIngredients, postImage, postImageId)
  }

  return (
    <form className='new-post-form' onSubmit={onSubmit}>
        <h2>EDIT POST</h2>
        <div className='form-control'>
            <label>*Food Title:</label>
            <input type='text' required value={title} onChange={(e) => setTitle(e.target.value)}/>
        </div>
        <div className='form-control'>
            <label>Description:</label>
            <textarea type='text' required value={description} onChange={(e) => setDescription(e.target.value)}/>
        </div>
        <div className='form-control'>
            <label>*Price:</label>
            <input type='number' required value={price} onChange={(e) => setPrice(e.target.value)}/>
        </div>
        <div className='form-control'>
            <label>*Servings Avalible:</label>
            <input type='number' required value={servings} onChange={(e) => setServings(e.target.value)}/>
        </div>
        <div className='form-control'>
                <label id="delivery-p">Delivery Method:</label>

                <input type="radio" required id="pick-up-only" name="delivery-method" value={delivery} onChange={(e) => setDelivery('pickupOnly')}/>
                <label className='radio-label' htmlFor="pick-up-only">Pick Up Only</label><br />

                <input type="radio" required id="delivery-only" name="delivery-method" value={delivery} onChange={(e) => setDelivery('deliveryOnly')}/>
                <label className='radio-label' htmlFor="delivery-only">Delivery Only</label><br />

                <input type="radio" required id="both" name="delivery-method" value={delivery} onChange={(e) => setDelivery('both')}/>
                <label className='radio-label' htmlFor="both">Both</label>
        </div>
        <div className='form-control'>
            <label>Ready Date & Time:</label>
            <input type='datetime-local' id="ready-date-time" required value={datetime} onChange={(e) => setDatetime(e.target.value)}/>
        </div>
        <div className='form-control'>
            <label>Location:</label>
            <input type='text' required value={location} onChange={(e) => setLocation(e.target.value)}/>
        </div>
        <EditIngredientsForm ingredients={ingredients}/>
        <div className='form-control'>
            <label>New Photo:</label>
            <input type='file' onChange={(e) => setPostImage(e.target.files[0])}/>
        </div>

        <div className="buttonHolderDiv">
            <input className="submit" type='submit' value='UPDATE' />
        </div>
    </form>
  )
}

export default EditPostForm