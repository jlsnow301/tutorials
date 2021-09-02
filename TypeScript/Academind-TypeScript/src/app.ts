import axios from "axios";

const form = document.querySelector("form")! as HTMLFormElement;
const addressInput = document.getElementById("address")! as HTMLInputElement;

/** This will be deleted by the time you see it */
const GOOGLE_API_KEY = "AIzaSyCUwgTkH4vCbwsqZXxREMWgrdxUPIqWiCQ";

type GeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "NO RESULTS";
};

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress: string = addressInput.value.toString();

  axios
    .get<GeocodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${GOOGLE_API_KEY}`
    )
    .then((response) => {
      if (response.data.status !== "OK") {
        throw new Error("Could not fetch location.");
      }
      const coordinates = response.data.results[0].geometry.location;
      const map = new google.maps.Map(
        document.getElementById("map")! as HTMLElement,
        {
          center: coordinates,
          zoom: 8,
        }
      );
      new google.maps.Marker({ position: coordinates, map: map });
    })
    .catch((err) => {
      alert(err.message);
      console.log(err);
    });
}

form.addEventListener("submit", searchAddressHandler);
