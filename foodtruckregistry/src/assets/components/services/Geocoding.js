const BASE_URL = "https://maps.googleapis.com/maps/api/geocode/";
const API_KEY = import.meta.env.VITE_FOOD_TRUCK_MAPS_API;

export function getAddressLatLng(address) {
  const getAddress = async () => {
    const encodedURI = encodeURIComponent(address);

    const response = await fetch(
      `${BASE_URL}/json?${encodedURI}&key=${API_KEY}`
    );
    const addressLatLng = await response.json();
    // console.log(
    //   "Address of:",
    //   address,
    //   "Location:",
    //   addressLatLng.geometry.location
    // );
    return {
      address: "test address",
      location: {
        lat: -1,
        lng: -1,
      },
    };
  };
}
