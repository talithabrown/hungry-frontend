import { useState } from 'react'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';

const PostLocation = ({ setLocation, setLatitude, setLongitude, location }) => {

  // this script tag is in index.html
  // <script async
  //   src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA8Ft9_0KtBRqn7_QWi06CaxjtMe824ufc&libraries=places&callback=initMap">
  // </script>

  const [address, setAddress] = useState('')
  
  const [coordinates, setCoordinates] = useState({
    lat:null,
    lng:null
  })

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value)
    const ll  = await getLatLng(results[0])
    setLatitude(ll.lat)
    setLongitude(ll.lng)
    setAddress(value)
    setCoordinates(ll)
    setLocation(value)
  }

  return (
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
  )
}

export default PostLocation