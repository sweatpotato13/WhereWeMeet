import { Path, Marker } from "../map";
import React from "react";

export function getCenter(locationArray) {
  let result = {
    latitude: 0,
    longitude: 0
  };
  locationArray.forEach(element => {
    result.latitude += element.latitude;
    result.longitude += element.longitude;
  });
  const len = locationArray.length;
  result.latitude /= len;
  result.longitude /= len;
  return result;
}

export function getLinefromCenter(locationArray) {
  if (locationArray.length < 2) return;
  const P = [];
  for (let i = 0; i < locationArray.length; i++) {
    const temp = {
      latitude: locationArray[i].latitude,
      longitude: locationArray[i].longitude
    };
    P.push(temp);
  }
  const center = getCenter(locationArray);
  const path = [];
  for (let i = 0; i < locationArray.length; i++) {
    path.push(<Path coordinates={[center, P[i]]} width={10} />);
  }
  path.push(<Marker coordinate={center} pinColor="blue" />);
  return path;
}
