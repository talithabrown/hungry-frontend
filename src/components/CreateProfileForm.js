import { useState } from 'react'

const CreateProfileForm = ({ onSubmitProfile }) => {
  const [username, setUsername] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [bio, setBio] = useState('')
  const [profileImage, setProfileImage] = useState()

  const onSubmit = (e) => {
    e.preventDefault()
    onSubmitProfile(username, password1, password2, email, firstName, lastName, bio, profileImage)
  }

  return (
    <form className='create-profile-form' onSubmit={onSubmit}>
        <h2 className='create-profile-h2'>CREATE PROFILE</h2>
        <div className='form-control'>
            <label>*Username:</label>
            <input type='text' value={username} onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div className='form-control'>
            <label>*Password:</label>
            <input type='password' value={password1} onChange={(e) => setPassword1(e.target.value)}/>
        </div>
        <div className='form-control'>
            <label>*Confirm Password:</label>
            <input type='password' value={password2} onChange={(e) => setPassword2(e.target.value)}/>
        </div>
        <div className='form-control'>
            <label>*Email:</label>
            <input type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
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
            <label>Profile Photo: (optional)</label>
            <input type='file' onChange={(e) => setProfileImage(e.target.files[0])}/>
        </div>

        <div className="buttonHolderDiv">
            <input className="submit" type='submit' value='CREATE PROFILE' />
        </div>
    </form>
  )
}

export default CreateProfileForm