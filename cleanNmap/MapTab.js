import React, { useEffect, useState } from 'react';
import NaverMapView, { Marker } from './map';
import { StyleSheet, PermissionsAndroid, Platform, Text, TouchableOpacity, View } from 'react-native';

/* TODO ~ 20201114
    1. style 전부 따로 빼서 정리 -> 변수 형태로 작성
    2. 검색을 위한 floating 버튼 위치 조정...! 컴포넌트 위치 어떻게 하냐!
    3. 검색 floating button을 눌렀을 때 검색창이 뜨도록 -> 검색창 style도 지정! css
*/ 

const MapViewScreen = ({navigation}) => {
  
  useEffect(() => {
    requestLocationPermission();
  }, []);

  const [locaInfo, setLocaInfo] = useState({latitude: 37.5665, longitude: 126.87905});
  // const [flag, setFlage] = useState(false);

  // 마커 띄울 때 해당 정보 창도 같이 뜰 수 있게
  // https://yannichoongs.tistory.com/163 -> 참고해서 작성
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
      {/* TouchableOpacity : 눌렀을 때 피드백을 주는 버튼
      Button : 안드로이드와 iOS에서 다르게 보이는 문제 */}
      <TouchableOpacity style={{position: 'absolute', bottom: '10%', right: 8}}
                        onPress={() => navigation.navigate('stack')}>
        {/* <View style={{backgroundColor: 'gray', padding: 4}}>
          <Text style={{color: 'white'}}>open stack</Text>
        </View> */}
        <View>
          <Text onPress={() => console.warn('hello')}>Hello</Text>
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

const styles = StyleSheet.create({
  floatingButtonStyle: {
    position: 'absolute',
    top: '30%',
    left: 10,
    resizeMode: 'contain',
    width: 50,
    height: 50,
  }
});

export default MapViewScreen;