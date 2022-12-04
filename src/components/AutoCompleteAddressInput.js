import { useState } from 'react'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';


const AutoCompleteAddressInput = () => {

    const [address, setAddress] = useState('')

    const handleSelect = async (value) => {
        setAddress(value)
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
export default AutoCompleteAddressInput