import { useState } from "react";
import Combobox from "./Combobox";
import { useMap } from "@vis.gl/react-google-maps";

export default function SearchBar({ truckList }) {
  const [searchQuery, setSearchQuery] = useState("");
  const map = useMap();

  const handleSelectTruck = (ev) => {
    if (!map) {
      console.log("No map found");
    }
    console.log("Search query:", searchQuery);
    const foundMarker = truckList.filter(
      (foodtruck) => foodtruck.name == searchQuery
    );
    if (foundMarker.length < 1) {
      console.error("No marker matching name");
      return;
    }
    console.log("Found marker:", foundMarker);
    map.panTo(foundMarker[0].location);
  };

  return (
    <>
      <Combobox
        query={searchQuery}
        setQuery={setSearchQuery}
        list={truckList}
        placeholderText={"Search current foodtrucks..."}
        handleSelect={handleSelectTruck}
      />
    </>
  );
}
