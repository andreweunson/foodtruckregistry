// const BASE_URL = "https://maps.googleapis.com/maps/api/geocode/";
const API_KEY = import.meta.env.VITE_FOOD_TRUCK_MAPS_API;

export default async function getAddressLatLng(address) {
  if (!address) return {};
  console.log("Calling getAddressLatLng with address:", address);

  const encodedURI = encodeURIComponent(address);
  const response = await fetch(
    `geocode/json?address=${encodedURI}&key=${API_KEY}`
  );
  const resultJSON = await response.json();
  if (resultJSON.results == undefined) {
    console.error("Invalid results");
    return {};
  }
  let results = resultJSON.results;
  console.log(results);
  let location = results[0].geometry.location;
  let retObj = {
    address: `${results[0].formatted_address}`,
    location: { location },
  };
  return retObj;
}
