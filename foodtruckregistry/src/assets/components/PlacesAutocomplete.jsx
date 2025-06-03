import { useActionState, useEffect, useState } from "react";
import getPlacesSuggestion from "../services/PlacesAutocomplete";

export default function PlacesAutocomplete({ setTruckLoc }) {
  /**
   * General idea:
   * 1. have a textbox that will serve as the input for the placesautocomplete
   * 2. when this textbox is changed, update the state of the string query.
   * 2a watch the state for changes, then call the getPlacesSuggestion service which
   *    will return a list of suggestions
   * 3. create a typedown window that will display the autocomplete suggestions
   *    returned by the service
   * 4. When a typedown window is selected, pass the typedown data to the parent through
   *    a callback function which will update the state of the foodTruckUser array
   */

  //Store state of autocompletion
  const [placeAutocomplete, setPlaceAutocomplete] = useState({});
  const [incompletePlace, setIncompletePlace] = useState({
    string: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [choiceMade, setChoiceMade] = useState(false);

  //Watch the incompletePlace for state changes, when that happens we need to call the service
  //to get new suggestions
  useEffect(() => {
    if (!incompletePlace.string) {
      console.log("Empty string, returning");
      return;
    }
    if (choiceMade) {
      console.log("Choice selected, no more suggestions needed");
      return;
    }
    getPlacesSuggestion(incompletePlace.string).then((suggestions) => {
      setPlaceAutocomplete(suggestions);
    });
  }, [incompletePlace]);

  useEffect(() => {
    //Watch placeAutocomplete and setIsOpen depending on the state
    console.log("Places suggestions:", placeAutocomplete);
    if (!placeAutocomplete) setIsOpen(false);
    setIsOpen(true);
  }, [placeAutocomplete]);

  const handleAutocompleteChange = (event) => {
    setIncompletePlace((prev) => ({
      ...prev,
      string: event.target.value,
    }));
    setTruckLoc((prev) => ({
      ...prev,
      place: event.target.value,
    }));
  };

  const handleSelect = (place) => {
    console.log("User clicked:", place);
    setChoiceMade(true);
    setTruckLoc((prev) => ({
      ...prev,
      place: place,
    }));
    setIncompletePlace((prev) => ({
      ...prev,
      string: place,
    }));
    setTimeout(() => setIsOpen(false), 200);
  };

  return (
    <>
      <input
        onChange={handleAutocompleteChange}
        onFocus={() => {
          console.log("Choice made false");
          setChoiceMade(false);
        }}
        onBlur={(e) => handleSelect(e.target.value)}
        value={incompletePlace.string}
        placeholder="Search Location"
      />

      {isOpen && placeAutocomplete.length > 0 && (
        <ul>
          {placeAutocomplete.map((place) => (
            <li
              key={place}
              onClick={() => handleSelect(place)}
              onMouseDown={(e) => e.preventDefault()}
            >
              {place}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
