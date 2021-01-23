import React from "react";
import { useState } from "react";
import { ActivityIndicator, View, Text, Button } from "react-native";
import { useEffect } from "react/cjs/react.development";

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

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {isLoading ? <ActivityIndicator /> : (
        <View>
          <Text>{dataSource}</Text>
          <Button title='POST' onClick={onClick}>Button</Button>
        </View>
      )}
    </View>
  );
};

// TODO :: 왜 동작하지 않는 것인가!!
const onClick = () => {
  fetch('http://localhost:3000/markers', {
    method: 'POST',
    body: {
      id: 2,
      latitude: 37.5858,
      longitude: 126.7823
    }
  });
}

export default TextScreen;
