export default function parseCoordinates(input) {
  const cleanedInput = input.replace(/[[\]]/g, "");
  const parts = cleanedInput.split(",").map((part) => part.trim());

  if (parts.length !== 2) {
    throw new Error("Invalid coordinates format");
  }

  const latitude = parseFloat(parts[0]);
  const longitude = parseFloat(parts[1]);

  if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
    throw new Error("Invalid coordinates values");
  }

  if (latitude < -90 || latitude > 90) {
    throw new Error("Latitude must be between -90 and 90 degrees");
  }

  if (longitude < -180 || longitude > 180) {
    throw new Error("Longitude must be between -180 and 180 degrees");
  }

  return { latitude, longitude };
}
