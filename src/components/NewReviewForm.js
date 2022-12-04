import { useState } from 'react'

const NewReviewForm = ({ onSubmitReview }) => {

  const [title, setTitle] = useState('')
  const [rating, setRating] = useState('')
  const [text, setText] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    onSubmitReview(rating, title, text)
  }


  return (
    <form className='new-review-form' onSubmit={onSubmit}>
        <h2>NEW REVIEW</h2>
        <div className='form-control'>
            <label>*Rating (1-5) :</label>
            <input type='number' required value={rating} onChange={(e) => setRating(e.target.value)}/>
        </div>
        <div className='form-control'>
            <label>*Review Title:</label>
            <input type='text' required value={title} onChange={(e) => setTitle(e.target.value)}/>
        </div>
        <div className='form-control'>
            <label>*Text:</label>
            <textarea type='text' required value={text} onChange={(e) => setText(e.target.value)}/>
        </div>

        <div className="buttonHolderDiv">
            <input className="submit" type='submit' value='Submit' />
        </div>
    </form>
  )
}

export default NewReviewForm