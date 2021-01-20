import React from "react";
import { useState } from "react";
import { ActivityIndicator, View, Text } from "react-native";
import { useEffect } from "react/cjs/react.development";


// TODO :: 서버에 저장된 마커 정보를 불러온다.
const TextScreen = () => {
  useEffect(() => {
    fetch('http://localhost:3000/markers')
      .then((response) => response.text())
      .then((responseString) => {
        setIsLoading(false);
        settDataSource(responseString)
      })
      .catch((error) => console.error(error));
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const [dataSource, settDataSource] = useState('');

  if(isLoading) {
    return (
      <View style={{
        flex: 1,
        padding: 20,
      }}>
        <ActivityIndicator />
      </View>
    )
  }

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Text>{dataSource}</Text>
    </View>
  );
};


// const styles_ = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   loader: {
//     flex: 1,
//     padding: 20,
//   }
// });

export default TextScreen;
