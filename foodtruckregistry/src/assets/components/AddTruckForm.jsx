import { useState } from "react";
import PlacesAutocomplete from "./PlacesAutocomplete";
import getAddressLatLng from "../services/Geocoding";

function AddTruckForm({ addTruck }) {
  const [foodTruck, setFoodTruck] = useState({
    name: "",
    place: "",
  });
  const [incompletePlace, setIncompletePlace] = useState({
    string: "",
  });

  //Test message to test the commit
  //Updates the state of the food truck name
  const handleChange = (e) => {
    setFoodTruck((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const clearInput = () => {};

  //When the form is submitted, takes the foodTruck object and stores it into the
  //truckUser array, then clears the input values for a new truck
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting foodtruck", foodTruck);
    try {
      //Geocode lookup to find the latLng of the address
      let geocode = await getAddressLatLng(foodTruck.place);
      console.log("Geocode location", geocode.location.location);

      //Appending the latLng to the foodtruck state object
      const newTruck = {
        ...foodTruck,
        location: {
          lat: geocode.location.location.lat,
          lng: geocode.location.location.lng,
        },
      };

      //Adding the foodtruck state object to the array of concurrent foodtrucks
      addTruck((prev) => [...prev, newTruck]);

      //Clearing the state object values
      setFoodTruck({
        name: "",
        place: "",
      });

      setIncompletePlace({
        string: "",
      });
    } catch (error) {
      console.error("Error occurred:", error);
    } finally {
      console.log("Finished submitting");
      console.log(foodTruck);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={foodTruck.name}
        placeholder="Enter your business's name"
        onChange={handleChange}
      />
      <PlacesAutocomplete
        queryValue={incompletePlace}
        setQueryValue={setIncompletePlace}
        setTruckLoc={setFoodTruck}
      />
      <input type="submit" value="Submit Location" />
    </form>
  );
}

export default AddTruckForm;
