import { useState } from 'react'

const LocationAndDistance = ({ setDistance, setLocation, distance, location }) => {
  const [formLocation, setFormLocation] = useState(location)
  const [formDistance, setFormDistance] = useState(distance)
  const [displayClassName, setDisplayClassName] = useState('displayNone')

  const onSubmit = (e) => {
    e.preventDefault()
    setLocation(formLocation)
    setDistance(formDistance)
    setDisplayClassName('displayNone')
  }

  return (
    <>
        <div className="location-div" onClick={() => setDisplayClassName('location-and-distance-form')}>
            <img src="/images/map-pin.svg" alt="location icon"></img>
            <p>{location} - {distance} mi</p>
        </div>

        <form className={displayClassName} onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Address:</label>
                <input type='text' value={formLocation} onChange={(e) => setFormLocation(e.target.value)}/>
            </div>
            <div className='form-control'>
                <label>Distance (in miles):</label>
                <input type='number' value={formDistance} onChange={(e) => setFormDistance(e.target.value)}/>
            </div>
            <div className="buttonHolderDiv">
            <input className="submit" type='submit' value='Apply' />
            </div>
        </form>
    </>
  )
}

export default LocationAndDistance