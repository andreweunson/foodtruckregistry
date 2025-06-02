// const BASE_URL = "https://places.googleapis.com/v1/places:autocomplete";
const API_KEY = import.meta.env.VITE_FOOD_TRUCK_MAPS_API;

//Calls the places autocomplete API that returns a response object with place suggestions and query predictions
//TODO: call an aws lambda function which will fetch and return the api data instead, as a workaround
//to deal with the CORS crap

export default async function getPlacesSuggestion(stringInput) {
  console.log("Calling getPlacesSuggestions with input:", stringInput);
  const response = await fetch("/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": API_KEY,
      "X-Goog-FieldMark":
        "suggestions.placePrediction.text.text,suggestions.queryPrediction.text.text",
    },
    body: JSON.stringify({
      input: `${stringInput}`,
      includedRegionCodes: "us",
    }),
  });
  let suggestionJSON = await response.json();

  //Run through suggestions and find all the placePrediction text strings, add them to an array and then return these
  if (suggestionJSON.suggestions == undefined) {
    console.error("No current incomplete query to give suggestions on.");
    return new Array();
  }
  let suggestions = suggestionJSON.suggestions;
  let predictedList = new Array();
  for (let prediction of suggestions) {
    predictedList.push(prediction.placePrediction.text.text);
  }
  console.log("Predicted list:", predictedList);
  return predictedList;
}
