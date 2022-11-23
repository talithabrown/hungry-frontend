import { useState } from 'react'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';

const LocationAndDistance = ({ setDistance, setLocation, distance, location, getPosts }) => {

  // this script tag is in index.html
  // <script async
  //   src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA8Ft9_0KtBRqn7_QWi06CaxjtMe824ufc&libraries=places&callback=initMap">
  // </script>

  const [formDistance, setFormDistance] = useState(distance)
  const [displayClassName, setDisplayClassName] = useState('displayNone')

  const [address, setAddress] = useState('')
  
  const [coordinates, setCoordinates] = useState({
    lat:null,
    lng:null
  })

  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value)
    //console.log(results)
    const ll  = await getLatLng(results[0])
    //console.log(ll)
    setLatitude(ll.lat)
    setLongitude(ll.lng)
    setAddress(value)
    setCoordinates(ll)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    setLocation(address)
    setDistance(formDistance)
    setDisplayClassName('displayNone')
    getPosts(latitude, longitude)
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
                {/* <input id='address-auto-complete' type='text' value={formLocation} onChange={(e) => setFormLocation(e.target.value)}/> */}
                <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                  <div key={suggestions.description}>
                    <input
                      {...getInputProps({
                        placeholder: 'Search Address ...',
                        className: 'location-search-input',
                      })}
                    />
                    <div className="autocomplete-dropdown-container">
                      {loading && <div>Loading...</div>}
                      {suggestions.map(suggestion => {
                        const className = suggestion.active
                          ? 'suggestion-item--active'
                          : 'suggestion-item';
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                          : { backgroundColor: '#ffffff', cursor: 'pointer' };
                        return (
                          <div key={suggestion.description}
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style,
                            })}
                          >
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
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

// AIzaSyA8Ft9_0KtBRqn7_QWi06CaxjtMe824ufc