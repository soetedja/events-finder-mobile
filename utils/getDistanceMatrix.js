import keys from '../config/keys';

const getDistanceMatrix = async (origin, destination) => {
  try {
    let url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${
      origin.latitude
    },${origin.longitude}&destinations=${destination.latitude},${
      destination.longitude
    }&key=${keys.google.maps_api_key}`;
    let resp = await fetch(url);

    let respJson = await resp.json();
    let result = {
      distance: respJson.rows[0].elements[0].distance.text,
      duration: respJson.rows[0].elements[0].duration.text
    };

    return result;
  } catch (error) {
    return error;
  }
};

export default getDistanceMatrix;
