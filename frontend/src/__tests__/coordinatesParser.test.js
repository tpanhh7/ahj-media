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
});
