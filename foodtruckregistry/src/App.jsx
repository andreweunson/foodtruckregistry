import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { useState } from "react";
import AddTruckForm from "./assets/components/AddTruckForm";
import DeleteForm from "./assets/components/DeleteFoodTruckForm";
import MarkerWithInfoWindow from "./assets/components/MarkerWithInfoWindow";
import "./App.css";

function App() {
  const [foodTruckUsers, setFoodTruckUsers] = useState([]);
  console.log("Current food:", foodTruckUsers);

  return (
    <>
      <APIProvider
        apiKey={"AIzaSyCNLcBN2PLcM29X4oxYL4op7pLhNc4U0jk"}
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
        <div class="flex-container">
          <AddTruckForm props={setFoodTruckUsers} />
          <DeleteForm props={[foodTruckUsers, setFoodTruckUsers]} />
        </div>
      </APIProvider>
    </>
  );
}

export default App;
