/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

// import 'react-native-gesture-handler';
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import TextScreen from "./TextTab";
import MapViewScreen from "./MapTab";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="stack" component={MapViewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeScreen = () => (
  <Tab.Navigator>
    <Tab.Screen name={"map"} component={MapViewScreen} />
    <Tab.Screen name={"text"} component={TextScreen} />
  </Tab.Navigator>
);

export default App;
