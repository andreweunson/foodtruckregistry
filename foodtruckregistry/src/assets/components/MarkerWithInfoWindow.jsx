import { useState, useCallback } from "react";
import {
  useMap,
  AdvancedMarker,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";

//TODO: add a custom HTML element that gets displayed when the advancedmarker is clicked
export default function MarkerWithInfoWindow({ points }) {
  const map = useMap();
  console.log("Rendered the marker component");
  console.log("Current markers:", points);

  const handleMarkerClick = useCallback((ev) => {
    if (!map) return;
    if (!ev.latLng) return;
    console.log("Marker clicked:", ev.latLng.toString());
    map.panTo(ev.latLng);
  });

  return (
    <>
      {points.map((poi) => (
        <AdvancedMarker
          key={poi.name}
          position={poi.location}
          clickable={true}
          onClick={handleMarkerClick}
        >
          <span>🚚</span>
        </AdvancedMarker>
      ))}
    </>
  );
}
