import { useActionState, useEffect, useState } from "react";
import getPlacesSuggestion from "../services/PlacesAutocomplete";

export default function PlacesAutocomplete() {
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

  //Watch the incompletePlace for state changes, when that happens we need to call the service
  //to get new suggestions
  useEffect(() => {
    if (!incompletePlace) return;
    getPlacesSuggestion(incompletePlace.string).then((suggestions) =>
      setPlaceAutocomplete(suggestions)
    );
    console.log("Autocomplete:", placeAutocomplete);
  }, [incompletePlace]);

  const handleAutocompleteChange = (event) => {
    setIncompletePlace((prev) => ({
      ...prev,
      string: event.target.value,
    }));
  };

  return (
    <>
      <input
        onChange={handleAutocompleteChange}
        value={incompletePlace.string}
        placeholder="Search Location"
      />
    </>
  );
}
