import { useState, useCallback } from "react";
import {
  useMap,
  AdvancedMarker,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";

function MarkerWithInfoWindow({ points }) {
  const [infoWindowShown, setInfoWindowShown] = useState(false);
  const map = useMap();
  console.log("Rendered the marker component");
  console.log("Current markers:", points);

  const handleMarkerClick = useCallback((ev) => {
    if (!map) return;
    if (!ev.latLng) return;
    console.log("Marker clicked:", ev.latLng.toString());
    setInfoWindowShown((infoWindowShown) => !infoWindowShown);
    map.panTo(ev.latLng);
  });

  const handleClose = useCallback(() => {
    setInfoWindowShown(false);
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
export default MarkerWithInfoWindow;
