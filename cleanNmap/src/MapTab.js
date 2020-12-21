import React, { useEffect, useState } from 'react';
import NaverMapView, { Marker } from './map';
import { TextInput, StyleSheet, PermissionsAndroid, Platform, Text, TouchableOpacity, View } from 'react-native';

import { getGeoObj } from './common/geo';

/* TODO ::
    1. Design : 검색 floating button을 눌렀을 때 검색창이 뜨도록
      1.2. searchActivate button 이미지 파일(.svg)
    2. Function : 기능 수행
      2.1. geo
        2.1.1. ~~마커 찍기~~
        2.1.2. 마커 좌표로 이동시키기
        2.1.3. 해당 좌표의 세부 정보를 보여주는 창 만들기
*/ 

const MapViewScreen = ({navigation}) => {
  
  useEffect(() => {
    requestLocationPermission();
  }, []);

  const [locaInfo, setLocaInfo] = useState({latitude: 37.5665, longitude: 126.87905});
  const [searchFlag, setSearchFlag] = useState(false); // module 분리 시 state는 어떻게,,,?
  const [addrInfo, setAddrInfo] = useState('');

  // 마커 띄울 때 해당 정보 창도 같이 뜰 수 있게
  // https://yannichoongs.tistory.com/163 -> 참고해서 작성
  const makeMarker = (latitude, longitude) => {
    return (
      <Marker coordinate={{latitude, longitude}}
        title='해당 영역의 주소'
        description='장소 세부 정보'
        onClick= {() => {
          console.warn(`${longitutde}, ${latitude} marker clicked`);
          // setFlage(!flag);
        }
      }/>
    );
  }

  const searchActivateButton = () => {
    return (
      <TouchableOpacity style={styles.touchableOpacityStyle}
                        onPress={() => navigation.navigate('stack')}>
        <View>
          <Text style={styles.floatingButtonStyle}
                onPress={() => {
                  setSearchFlag(!searchFlag);
                  console.warn('searchBar activate');
                }}>
            Search
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  const searchBar = () => {
    return (
      <TextInput style={styles.searchBarStyle}
                 placeholder={"지번, 도로명 주소 입력"}
                 onSubmitEditing={async () => {
                    //  setSearchFlag(!setSearchFlag); 축소시키는 기능도 필요하지 않을까?
                    const result = await getGeoObj(addrInfo);
                    const addr_x = result['addresses'][0]['x'];
                    const addr_y = result['addresses'][0]['y'];
                    console.warn(`${addr_x}, ${addr_y}`);
                    makeMarker(addr_y, addr_x);
                    //  console.warn(`${addrInfo} searchBar deactivate`);
                 }}
                 onChangeText={(text) => {
                   setAddrInfo(text);
                  //  console.warn(addrInfo);
                 }}
      />
    );
  }

  return (
    <>
      <NaverMapView style={styles.naverMapViewStyle}
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
      {!searchFlag ? searchActivateButton() : searchBar()}
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
  naverMapViewStyle: {
    width: '100%',
    height: '100%'
  },
  touchableOpacityStyle: {
    position: 'absolute',
    top: '2%',
    right: '4%', // 단위가 생략되어 있다.
    // width: '5%',
    height: '5%'
  },
  floatingButtonStyle: {
    color: 'white',
    backgroundColor: 'gray',
    textAlign: 'center',
    width: 50,
    height: 50,
  },
  searchBarStyle: {
    position: 'absolute',
    top: '2%',
    alignSelf: 'center',
    width: '85%',
    height: '5%',
    borderRadius: 15,
    backgroundColor: 'white',
    padding: 10,
  }

});

export default MapViewScreen;