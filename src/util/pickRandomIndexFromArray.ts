
const pickRandomIndexFromArray = <T>(array: T[]) => {
    const max = array.length;
    return Math.floor(Math.random() * max);
  }
export default pickRandomIndexFromArray