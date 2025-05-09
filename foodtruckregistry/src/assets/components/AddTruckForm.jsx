import { useState } from "react";

function AddTruckForm({ props }) {
  const setTruckUser = props;
  const [foodTruck, setFoodTruck] = useState({
    name: "",
    description: "This is a food truck!",
    location: {
      lat: "",
      lng: "",
    },
  });
  console.log(foodTruck);

  //Updates the state of the food truck name
  const handleChange = (e) => {
    setFoodTruck((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  //Updates the state of the food truck location
  const handleLocChange = (e) => {
    setFoodTruck((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [e.target.name]: parseFloat(e.target.value),
      },
    }));
  };

  //When the form is submitted, takes the foodTruck object and stores it into the
  //truckUser array, then clears the input values for a new truck
  const handleSubmit = (e) => {
    e.preventDefault();
    setTruckUser((prev) => [...prev, foodTruck]);

    //Also clear the form input values
    setFoodTruck({
      name: "",
      description: "This is a food truck!",
      location: {
        lat: "",
        lng: "",
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={foodTruck.name}
        placeholder="Enter your business name"
        onChange={handleChange}
      />
      <input
        type="text"
        name="lat"
        value={foodTruck.location.lat}
        placeholder="Enter your trucks latitude"
        onChange={handleLocChange}
      />
      <input
        type="text"
        name="lng"
        value={foodTruck.location.lng}
        placeholder="Enter your trucks longitude"
        onChange={handleLocChange}
      />
      <input type="submit" value="Submit Location" />
    </form>
  );
}

export default AddTruckForm;
