import React, { useEffect, useState } from 'react';
import NaverMapView, { Marker } from './map';
import { TextInput, StyleSheet, PermissionsAndroid, Platform, Text, TouchableOpacity, View } from 'react-native';

import { getGeoObj } from './common/geo';

/* TODO ::
    1. Design : 검색 floating button을 눌렀을 때 검색창이 뜨도록
      1.1. --searchBar design--
      1.2. searchActivate button 이미지 파일
    2. Function : 기능 검색
      2.1. geo -> x, y좌표로 이동, 마커 찍기, 해당 좌표 세부 정보창 만들기
      2.2. reverseGeo -> 마커만 찍을 경우 세부 정보창 만들기
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
          console.warn(`marker clicked`);
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
                    //  setSearchFlag(!setSearchFlag);
                    const result = await getGeoObj(addrInfo);
                    const addr = result['addresses'][0]['x'];
                     console.warn(`${addr}`);
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