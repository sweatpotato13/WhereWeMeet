import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import NaverMapView, {Circle, Marker, Path, Polyline, Polygon, Align} from "./map";
import {PermissionsAndroid, Platform, Text, TouchableOpacity, View} from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createStackNavigator} from "@react-navigation/stack";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
    return <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="home" component={HomeScreen}/>
            <Stack.Screen name="stack" component={MapViewScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
}

const HomeScreen = () =>
    <Tab.Navigator>
        <Tab.Screen name={"map"} component={MapViewScreen}/>
        <Tab.Screen name={"text"} component={TextScreen}/>
    </Tab.Navigator>

const TextScreen = () => {
    return <Text>text</Text>
}

const makeMarker = (latitude, longitude) => {
    return (
        <Marker coordinate={{latitude, longitude}}
                title='해당 영역 주소'
                description='장소 세부 정보, 저장/삭제 버튼 구현(커스텀 마커)'/>
    );
}

const MapViewScreen = ({navigation}) => {
    useEffect(() => {
        requestLocationPermission();
    }, []);

    const [locaInfo, setLocaInfo] = useState({latitude: 37.5665, longitude: 126.87905});

    return <>
        <NaverMapView style={{width: '100%', height: '100%'}}
                      showsMyLocationButton={true}
                      onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
                      onCameraChange={e => console.warn('onCameraChange', JSON.stringify(e))}
                      onMapClick={e => {
                          console.warn('onMapClick', JSON.stringify(e))
                          setLocaInfo({latitude: e.latitude, longitude: e.longitude});
                        //   console.warn('asgashjkadshlksadh', JSON.stringify(locaInfo));
                        }}
                      useTextureView>
            {/* 클릭 시 마커 표현, 조건에 따라 마커 저장 
                handleOnMapClick -> 위, 경도 정보 저장
            */}
            {/* {makeMarker(37.5665, 126.97905)} */}
            {makeMarker(locaInfo.latitude, locaInfo.longitude)}
        </NaverMapView>
        <TouchableOpacity style={{position: 'absolute', bottom: '10%', right: 8}} onPress={() => navigation.navigate('stack')}>
            <View style={{backgroundColor: 'gray', padding: 4}}>
                <Text style={{color: 'white'}}>open stack</Text>
            </View>
        </TouchableOpacity>
        <Text style={{position: 'absolute', top: '95%', width: '100%', textAlign: 'center'}}>Icon made by Pixel perfect from www.flaticon.com</Text>
    </>
};

async function requestLocationPermission() {
    if (Platform.OS !== 'android') return;
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Location Permission',
                message: 'show my location need Location permission',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the location');
        } else {
            console.log('Location permission denied');
        }
    } catch (err) {
        console.warn(err);
    }
}


export default App;