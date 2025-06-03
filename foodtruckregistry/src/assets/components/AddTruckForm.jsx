import { useState } from "react";
import PlacesAutocomplete from "./PlacesAutocomplete";

function AddTruckForm({ addTruck }) {
  const [foodTruck, setFoodTruck] = useState({
    name: "",
    description: "This is a food truck!",
    location: {
      lat: "",
      lng: "",
    },
  });
  console.log(foodTruck);

  //TODO: change location selection from latitude longitude to a simple text input box
  //that uses the Places API to autocomplete or suggest a location

  //Updates the state of the food truck name
  const handleChange = (e) => {
    setFoodTruck((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  //Updates the state of the food truck location
  // const handleLocChange = (e) => {
  //   setFoodTruck((prev) => ({
  //     ...prev,
  //     location: {
  //       ...prev.location,
  //       [e.target.name]: parseFloat(e.target.value),
  //     },
  //   }));
  // };

  //When the form is submitted, takes the foodTruck object and stores it into the
  //truckUser array, then clears the input values for a new truck
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting foodtruck", foodTruck);
    // addTruck((prev) => [...prev, foodTruck]);

    // //Also clear the form input values
    // setFoodTruck({
    //   name: "",
    //   description: "This is a food truck!",
    //   location: {
    //     lat: "",
    //     lng: "",
    //   },
    // });
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
      <PlacesAutocomplete />
      <input type="submit" value="Submit Location" />
    </form>
  );
}

export default AddTruckForm;
