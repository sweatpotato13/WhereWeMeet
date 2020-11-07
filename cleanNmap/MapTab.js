import React, { useEffect, useState } from 'react';
import NaverMapView, { Marker } from './map';
import { PermissionsAndroid, Platform, Text, TouchableOpacity, View } from 'react-native';

const MapViewScreen = ({navigation}) => {
  
  useEffect(() => {
    requestLocationPermission();
  }, []);

  const [locaInfo, setLocaInfo] = useState({latitude: 37.5665, longitude: 126.87905});
  // const [flag, setFlage] = useState(false);

  const makeMarker = (latitude, longitude) => {
    return (<Marker coordinate={{latitude, longitude}}
            title='해당 영역의 주소'
            description='장소 세부 정보'
            onClick= {() => {
              console.warn(`marker clicked`);
              // setFlage(!flag);
            }}
    />);
  }

  return (
    <>
      <NaverMapView style={{width: '100%', height: '100%'}}
                    showsMyLocationButton={true}
                    onTouch = {e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
                    onCameraChange = {e => console.warn('onCameraChange', JSON.stringify(e))}
                    onMapClick = {e => {
                      console.warn('onMapClick', JSON.stringify(e));
                      setLocaInfo({latitude: e.latitude, longitude: e.longitude});
                    }}
                    useTextureView>
        {makeMarker(locaInfo.latitude, locaInfo.longitude)}
        {/* {flag ? <Text style={{position: 'absolute', bottom: '20%', right: 8}}>test</Text> : <></>} */}
      </NaverMapView>
      <TouchableOpacity style={{position: 'absolute', bottom: '10%', right: 8}}
                        onPress={() => navigation.navigate('stack')}>
        <View style={{backgroundColor: 'gray', padding: 4}}>
          <Text style={{color: 'white'}}>open stack</Text>
        </View>
      </TouchableOpacity>
    </>
  );
}

const requestLocationPermission = async () => {
  if(Platform.OS !== 'android') return;
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'show my location need Location permission',
        buttonNeutral: 'Ask me later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK'
      }
    );
    if(granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the location');
    } else {
      console.log('Locdation permission denied');
    }
  } catch(err) {
    console.warn(err);
  }
}

export default MapViewScreen;