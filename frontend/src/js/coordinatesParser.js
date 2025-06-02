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

  return { latitude, longitude };
}
