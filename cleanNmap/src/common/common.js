export function getCenter(locationArray) {
    let result = {
        latitude: 0,
        longitude: 0
    }
    locationArray.forEach(element => {
        result.latitude += element.latitude;
        result.longitude += element.longitude;
    });
    const len = locationArray.length;
    result.latitude /= len;
    result.longitude /= len;
    return result;
}