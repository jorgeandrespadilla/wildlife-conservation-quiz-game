/**
 * Gets a random element from an array.
 * @param {T[]} array - Array to get a random element from.
 * @returns {T} - Random element from the array.
 */
export const getRandomElement = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}