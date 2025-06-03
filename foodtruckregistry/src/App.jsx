import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { useState } from "react";
import AddTruckForm from "./assets/components/AddTruckForm";
import DeleteTruckForm from "./assets/components/DeleteTruckForm";
import MarkerWithInfoWindow from "./assets/components/MarkerWithInfoWindow";
import "./App.css";
import NavBar from "./assets/components/NavBar";
const API_KEY = import.meta.env.VITE_FOOD_TRUCK_MAPS_API;

function App() {
  const [foodTruckUsers, setFoodTruckUsers] = useState([]);
  const [userView, setUserView] = useState(false);
  console.log("Current foodtrucks:", foodTruckUsers);

  const toggleUserView = (event) => {
    event.preventDefault();
    console.log("Navbar has been clicked");
    console.log("Userview:", userView);
    setUserView((prev) => !prev);
  };

  return (
    <>
      <APIProvider
        apiKey={API_KEY}
        onLoad={() => console.log("Maps API has loaded.")}
      >
        <Map
          defaultZoom={13}
          defaultCenter={{ lat: 47.5984, lng: 237.6501 }}
          onCameraChanged={(ev) => {
            console.log(
              "Camera changed:",
              ev.detail.center,
              "Zoom:",
              ev.detail.zoom
            );
          }}
          mapId="715b5253316d4dd7"
        >
          <MarkerWithInfoWindow points={foodTruckUsers} />
        </Map>
        <div className="navbar">
          <NavBar handleClick={toggleUserView} />
          <div
            className={`form-flex-container ${userView ? "user-view" : null}`}
          >
            <AddTruckForm addTruck={setFoodTruckUsers} />
            <DeleteTruckForm
              deleteTruck={setFoodTruckUsers}
              trucks={foodTruckUsers}
            />
          </div>
        </div>
      </APIProvider>
    </>
  );
}

export default App;
