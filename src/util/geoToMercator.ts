import * as Device from 'expo-device';

const geoToMercator =  async <T>(lat: number, long: number) => {
  const deviceType = await Device.getDeviceTypeAsync()

  const latpos = +lat;
  const longpos = +long
  const MAP_WIDTH: number = 2917 ; //need to change
  let EQUATOR_FROM_BOTTOM = 0; //phine: 545, tablet 558
  let LONG_OFFSET = 0; // tablet" 157, tablet 163
  
  //conditionals to check device type and set offsets accordingly. Don't know what original offsets are calculated from (pulled from cocos codebase)
  
  //if device is phone
  if (deviceType == 1) {
    EQUATOR_FROM_BOTTOM = 547
    LONG_OFFSET = 139
  //if device is tablet
  }else if (deviceType == 2){
    EQUATOR_FROM_BOTTOM = 545
    LONG_OFFSET = 140
  //if on web
  }else{
    //placeholder values. need to update
    EQUATOR_FROM_BOTTOM = 545
    LONG_OFFSET = 139
  }
  

  let x: number = (longpos + LONG_OFFSET) * (MAP_WIDTH / 360);
  let y: number =
    (MAP_WIDTH * Math.log(Math.tan(Math.PI / 4 + (latpos * Math.PI) / 180 / 2))) /
    (2 * Math.PI);
  y += EQUATOR_FROM_BOTTOM;
  return [x,y];
};

export default geoToMercator;
