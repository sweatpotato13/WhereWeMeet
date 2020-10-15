import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
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

const MapViewScreen = ({navigation}) => {
    useEffect(() => {
        requestLocationPermission();
    }, []);

    return <>
        <NaverMapView style={{width: '100%', height: '100%'}}
                      showsMyLocationButton={true}
                      onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
                      onCameraChange={e => console.warn('onCameraChange', JSON.stringify(e))}
                      onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}
                      useTextureView>
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
