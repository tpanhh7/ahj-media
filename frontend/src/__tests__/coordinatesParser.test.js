import parseCoordinates from "../js/coordinatesParser";

describe("parseCoordinates", () => {
  test("should parse coordinates with space after comma", () => {
    const input = "51.50851, -0.12572";
    const expected = { latitude: 51.50851, longitude: -0.12572 };
    expect(parseCoordinates(input)).toEqual(expected);
  });

  test("should parse coordinates without space after comma", () => {
    const input = "51.50851,-0.12572";
    const expected = { latitude: 51.50851, longitude: -0.12572 };
    expect(parseCoordinates(input)).toEqual(expected);
  });

  test("should parse coordinates with square brackets", () => {
    const input = "[51.50851, -0.12572]";
    const expected = { latitude: 51.50851, longitude: -0.12572 };
    expect(parseCoordinates(input)).toEqual(expected);
  });

  test("should throw error for invalid format", () => {
    const input = "invalid";
    expect(() => parseCoordinates(input)).toThrow();
  });

  test("should parse valid coordinates", () => {
    expect(parseCoordinates("51.50851, -0.12572")).toEqual({
      latitude: 51.50851,
      longitude: -0.12572,
    });
  });

  test("should throw error for invalid latitude (>90)", () => {
    expect(() => parseCoordinates("91, 0")).toThrow(
      "Latitude must be between -90 and 90 degrees"
    );
  });

  test("should throw error for invalid latitude (<-90)", () => {
    expect(() => parseCoordinates("-91, 0")).toThrow(
      "Latitude must be between -90 and 90 degrees"
    );
  });

  test("should throw error for invalid longitude (>180)", () => {
    expect(() => parseCoordinates("0, 181")).toThrow(
      "Longitude must be between -180 and 180 degrees"
    );
  });

  test("should throw error for invalid longitude (<-180)", () => {
    expect(() => parseCoordinates("0, -181")).toThrow(
      "Longitude must be between -180 and 180 degrees"
    );
  });
});
