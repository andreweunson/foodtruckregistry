import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { useState } from "react";
import AddTruckForm from "./assets/components/AddTruckForm";
import DeleteForm from "./assets/components/DeleteFoodTruckForm";
import MarkerWithInfoWindow from "./assets/components/MarkerWithInfoWindow";
import "./App.css";
const API_KEY = import.meta.env.VITE_FOOD_TRUCK_MAPS_API;

function App() {
  const [foodTruckUsers, setFoodTruckUsers] = useState([]);
  console.log("Current food:", foodTruckUsers);

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
        <div className="flex-container">
          <AddTruckForm props={setFoodTruckUsers} />
          <DeleteForm props={[foodTruckUsers, setFoodTruckUsers]} />
        </div>
      </APIProvider>
    </>
  );
}

export default App;
