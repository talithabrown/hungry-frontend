import { useState } from 'react'

const EditProfileForm = ({ onSubmitProfile }) => {
  const [username, setUsername] = useState(localStorage.getItem('username'))
  const [email, setEmail] = useState(localStorage.getItem('email'))
  const [firstName, setFirstName] = useState(localStorage.getItem('firstName'))
  const [lastName, setLastName] = useState(localStorage.getItem('lastName'))
  const [bio, setBio] = useState(localStorage.getItem('bio'))
  const [profileImage, setProfileImage] = useState()

  const onSubmit = (e) => {
    e.preventDefault()
    onSubmitProfile(username, email, firstName, lastName, bio, profileImage)
  }

  return (
    <form className='edit-profile-form' onSubmit={onSubmit}>
        <h2 className='create-profile-h2'>EDIT PROFILE</h2>
        <div className='form-control'>
            <label>*Username:</label>
            <input required type='text' value={username} onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div className='form-control'>
            <label>*Email:</label>
            <input required type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className='form-control'>
            <label>First Name: (optional)</label>
            <input type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
        </div>
        <div className='form-control'>
            <label>Last Name: (optional)</label>
            <input type='text' value={lastName} onChange={(e) => setLastName(e.target.value)}/>
        </div>
        <div className='form-control'>
            <label>Bio: (optional)</label>
            <textarea type='text' value={bio} onChange={(e) => setBio(e.target.value)}/>
        </div>
        <div className='form-control'>
            <label>New Profile Photo: (optional)</label>
            <input type='file' onChange={(e) => setProfileImage(e.target.files[0])}/>
        </div>

        <div className="buttonHolderDiv">
            <input className="submit" type='submit' value='EDIT PROFILE' />
        </div>
    </form>
  )
}

export default EditProfileForm 