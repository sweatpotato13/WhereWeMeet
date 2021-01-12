import React, { useEffect, useState } from "react";
import NaverMapView, { Marker } from "./map";
import {
  TextInput,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Text,
  Alert,
  Button,
  View,
  TouchableOpacity
} from "react-native";

/* TODO ::
    추가와 삭제 기능이 구현은 되어 있으나 제대로 동작하지 않는다.
    markerList에 저장하는 객체의 형태를 변경 -> 구조 수정
    makeMarker 렌더링 하는 방법을 개선해야 한다. -> 현재 무조건 뜨게 되어 있음.
*/

import { getGeoObj, getReverseGeoObj } from "./common/geo";
import { getCenter } from "./common/common";

/* NOTICE :: 
  makrerList에 저장되는 데이터 형태
  `{
    idx,
    latitude,
    longitude,
    marker
  }`
 */
const markerList = [];

const MapViewScreen = ({ navigation }) => {
  useEffect(() => {
    requestLocationPermission();
  }, [addrInfo]);

  const [localInfo, setLocalInfo] = useState({
    latitude: 37.5665,
    longitude: 126.87905
  });
  const [markerFlag, setMarkerFlag] = useState(false);
  const [addrInfo, setAddrInfo] = useState("");
  const [infoFlag, setInfoFlag] = useState(false);

  const makeMarker = (latitude, longitude, idx) => {
    return (
      <Marker
        coordinate={{ latitude, longitude }}
        key={idx}
        title="해당 영역의 주소"
        description="장소 세부 정보"
        onClick={async () => {
          const reverseGeoObj = await getReverseGeoObj(longitude, latitude);
          const addr = reverseGeoObj[2];
          const roadAddr = reverseGeoObj[3];

          if (typeof roadAddr == "undefined") {
            Alert.alert("주소 오류", "해당 주소에 대한 정보가 없습니다.");
          } else {
            const area1 = roadAddr["region"]["area1"]["name"]; // e.g) 경기도
            const area2 = roadAddr["region"]["area2"]["name"]; // e.g) 성남시 분당구
            const area3 = roadAddr["region"]["area3"]["name"]; // e.g) 정자동
            const area4 = roadAddr["region"]["area4"]["name"]; // NOTICE :: 용도 확인 필요!!
            const landRoad = roadAddr["land"]["name"]; // e.g) 불정로
            const landRoadNum1 = roadAddr["land"]["number1"]; // e.g) 6
            const landRaodNum2 = roadAddr["land"]["number2"]; // e.g) 없을 수도 있음, 있을 때도 있음. 21-14에서 14에 해당
            const addition0 = roadAddr["land"]["addition0"]["value"]; // e.g) NAVER그린팩토리

            const landAddrNum1 = addr["land"]["number1"];
            const landAddrNum2 = addr["land"]["number2"];

            let detailAddr = "";
            if (addition0 != "") {
              if (landRaodNum2 != "") {
                detailAddr = `${addition0}\n${area1} ${area2} ${area3} ${area4} ${landRoad} ${landRoadNum1} ${landRaodNum2}\n${area3} ${landAddrNum1}-${landAddrNum2}`;
              } else {
                detailAddr = `${addition0}\n${area1} ${area2} ${area3} ${area4} ${landRoad} ${landRoadNum1} ${landRaodNum2}\n${area3} ${landAddrNum1}`;
              }
            } else {
              if (landRaodNum2 != "") {
                detailAddr = `${area1} ${area2} ${area3} ${area4} ${landRoad} ${landRoadNum1} ${landRaodNum2}\n${area3} ${landAddrNum1}-${landAddrNum2}`;
              } else {
                detailAddr = `${area1} ${area2} ${area3} ${area4} ${landRoad} ${landRoadNum1} ${landRaodNum2}\n${area3} ${landAddrNum1}`;
              }
            }

            setLocalInfo({ latitude, longitude });
            setAddrInfo(detailAddr);
            setInfoFlag(!infoFlag);
            console.log(getCenter(markerList));
          }
        }}
      />
    );
  };

  const searchBar = () => {
    return (
      <TextInput
        style={styles.searchBarStyle}
        placeholder={"지번, 도로명 주소 입력"}
        onSubmitEditing={async () => {
          const result = await getGeoObj(addrInfo);

          if (result.length != 0) {
            const addr_x = Number(result[0]["x"]);
            const addr_y = Number(result[0]["y"]);
            console.warn(`latitude : ${addr_x}, longitude : ${addr_y}`);
            setLocalInfo({ latitude: addr_y, longitude: addr_x });
            setMarkerFlag(true);
            makeMarker(addr_y, addr_x);
          } else {
            Alert.alert("주소 오류", "해당 주소에 대한 정보가 없습니다.");
          }
        }}
        onChangeText={text => {
          setAddrInfo(text);
        }}
      />
    );
  };

  const infoItem = () => {
    return (
      <View style={styles.infoItemStyle}>
        <Text>{addrInfo}</Text>
        <View style="flexDirection: column">
          <Button
            title="Add"
            onPress={() => {
              Alert.alert(`${addrInfo}`, '추가됨');
              const len = markerList.length;
              let isExist = false;
              for (let i = 0; i < len; i++) {
                if (
                  markerList[i].latitude == localInfo.latitude &&
                  markerList[i].longitude == localInfo.longitude
                ) {
                  isExist = true;
                  console.log("Already Exist");
                  break;
                }
              }
              if (!isExist) {
                console.log(len);
                markerList.push({
                  idx: len,
                  latitude: localInfo.latitude,
                  longitude: localInfo.longitude,
                });
              }
            }}
          />
          <Button
            title="Remove"
            onPress={() => {
              Alert.alert(`${addrInfo}`, '제거합니다.');
              const len = markerList.length;
              let idx = -1;
              // TODO :: markerList의 idx 값을 활용하여 삭제할 수 있도록 수정
              for (let i = 0; i < len; i++) {
                console.log(`${i + 1} marker locainfo : ${markerList[i].latitude}, ${markerList[i].longitude}`);
                console.log(`current locainfo : ${localInfo.latitude}, ${localInfo.longitude}`);
                if (
                  markerList[i].latitude === localInfo.latitude &&
                  markerList[i].longitude === localInfo.longitude
                ) {
                  idx = i;
                  break;
                }
              }

              if (idx != -1) {
                // ISSUE :: 제거는 되는데 렌더링이 다음 마커가 진행되는 시점임.
                //          이 부분에 대한 문제 해결이 필요함.
                markerList.splice(0, idx).concat(idx + 1, len);
              }
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <>
      <NaverMapView
        style={styles.naverMapViewStyle}
        showsMyLocationButton={true}
        center={{ ...localInfo, zoom: 14 }} // DISCUSS :: 수정 필요
        onTouch={e => {
          setInfoFlag(false);
        }}
        onCameraChange={e => {
          setInfoFlag(false);
        }}
        onMapClick={e => {
          // markerflag로 초기 마커를 찍고, add 눌렀을 때 마커를 추가하도록
          setLocalInfo({
            latitude: e.latitude,
            longitude: e.longitude
          });
          setMarkerFlag(true);
          setInfoFlag(false);
        }}
        useTextureView
      >
        {markerFlag ? makeMarker(localInfo.latitude, localInfo.longitude) : <></>}
        {markerList.map(location => makeMarker(location.latitude, location.longitude, location.idx))}
      </NaverMapView>
      {searchBar()}
      {infoFlag ? infoItem() : <></>}
    </>
  );
};

const requestLocationPermission = async () => {
  if (Platform.OS !== "android") return;
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location Permission",
        message: "show my location need Location permission",
        buttonNeutral: "Ask me later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the location");
    } else {
      console.log("Locdation permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};

const styles = StyleSheet.create({
  naverMapViewStyle: {
    width: "100%",
    height: "100%"
  },
  touchableOpacityStyle: {
    position: "absolute",
    top: "2%",
    right: "4%",
    height: "5%"
  },
  searchBarStyle: {
    position: "absolute",
    top: "2%",
    alignSelf: "center",
    width: "85%",
    height: "5%",
    borderRadius: 15,
    backgroundColor: "white",
    padding: 10
  },
  infoItemStyle: {
    flexDirection: "row",
    bottom: "20%",
    alignSelf: "center",
    width: "80%",
    height: "15%",
    backgroundColor: "white",
    padding: 5
  }
});

export default MapViewScreen;
