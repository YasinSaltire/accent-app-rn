import Question from "../model/Question";
import pickNRandomIndicesFromArray from "./pickNRandomIndicesFromArray";

const geoToMercator = <T>(lat: number, long: number) => {
  
  const latpos = +lat;
  const longpos = +long
  const MAP_WIDTH: number = 2917 ; //need to change
  const EQUATOR_FROM_BOTTOM: number = 545;
  const LONG_OFFSET: number = 157;

  let x: number = (longpos + LONG_OFFSET) * (MAP_WIDTH / 360);
  let y: number =
    (MAP_WIDTH * Math.log(Math.tan(Math.PI / 4 + (latpos * Math.PI) / 180 / 2))) /
    (2 * Math.PI);
  y += EQUATOR_FROM_BOTTOM;
  return [x,y];
};

export default geoToMercator;
