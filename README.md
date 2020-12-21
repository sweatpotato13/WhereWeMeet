# some_project

## Geo Url results
```json
{"addresses": 
  [
    {
      "addressElements": [Array],
      "distance": 0,
      "englishAddress": "", // 영어 주소
      "jibunAddress": "", // 지번
      "roadAddress": "", // 도로명 주소
      "x": "", // longitude
      "y": "" // latitude
    }
  ],
  "errorMessage": "",
  "meta": {"count": 1, "page": 1, "totalCount": 1},
  "status": "OK"
}
```
- 필요한 정보 : addresses-x-y
- 유사한 주소가 있는 경우 addresses가 여러 개의 json을 가질 수 있음
```js
const result = getGeoObj(addrInfo);
const addrX = result['addresses'][0]['x'] // 해당 주소와 가장 유사한 x 좌표
const addrY = result['addresses'[0]['y'] // 해당 주소와 가장 유사한 y 좌표
```