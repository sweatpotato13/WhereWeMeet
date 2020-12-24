# some_project

## Geo Url results
```json
{"addresses": // 유사한 주소를 갖고 있는 여러 선택지들이 저장된다.
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
## Reverse Geo Url results
longitude : 126.8818394974154, latitude : 37.566755124713694
```json
{
  "Result" : {
    "status" : {
      "code":0,
      "name":"ok",
      "message":"done"
    },
    "results" : [
      {
        "name" : "legalcode",
        "code" : {
          "id":"1144012700",
          "type":"L",
          "mappingId":"09440127"
        },
        "region":{ 
          "area0": {
            "name":"kr",
            "coords":{
              "center":{
                "crs":"",
                "x":0,
                "y":0
              }
            }
          },
          "area1":{
            "name":"서울특별시",
            "coords":{
              "center":{
                "crs":"EPSG:4326",
                "x":126.978388,
                "y":37.5666102
              }
            },
            "alias":"서울"
          },
          "area2":{
            "name":"마포구",
            "coords":{
              "center":{
                "crs":"EPSG:4326",
                "x":126.901491,
                "y":37.566324
              }
            }
          },
          "area3":{
            "name":"상암동",
            "coords":{
              "center":{
                "crs":"EPSG:4326",
                "x":126.894688,
                "y":37.578325
              }
            }
          },
          "area4":{
            "name":"",
            "coords":{
              "center":{
                "crs":"",
                "x":0,
                "y":0
              }
            }
          }
        }
      },
      {
        "name":"admcode",
        "code":{
          "id":"1144074000",
          "type":"S",
          "mappingId":"09440127"
        },
        "region":{
          "area0":{
            "name":"kr",
            "coords":{
              "center":{
              "crs":"",
              "x":0,
              "y":0
            }
          }
        },
        "area1":{
          "name":"서울특별시",
          "coords":{
            "center":{
              "crs":"EPSG:4326",
              "x":126.978388,
              "y":37.5666102
            }
          },
          "alias":"서울"
        },
        "area2":{
          "name":"마포구",
          "coords":{
            "center":{
              "crs":"EPSG:4326",
              "x":126.901491,
              "y":37.566324
            }
          }
        },
        "area3":{
          "name":"상암동",
          "coords":{
            "center":{
              "crs":"EPSG:4326",
              "x":126.8946875,
              "y":37.578325
            }
          }
        },
        "area4":{
          "name":"",
          "coords":{
            "center":{
              "crs":"",
              "x":0,
              "y":0
            }
          }
        }
      }
    },
    {
      "name":"addr",
      "code":{
        "id":"1144012700",
        "type":"L",
        "mappingId":"09440127"
      },
      "region":{
        "area0":{
          "name":"kr",
          "coords":{
            "center":{
              "crs":"",
              "x":0,
              "y":0
            }
          }
        },
        "area1":{
          "name":"서울특별시",
          "coords":{
            "center":{
              "crs":"EPSG:4326",
              "x":126.978388,
              "y":37.5666102
            }
          },
          "alias":"서울"
        },
        "area2":{
          "name":"마포구",
          "coords":{
            "center":{
              "crs":"EPSG:4326",
              "x":126.901491,
              "y":37.566324
            }
          }
        },
        "area3":{
          "name":"상암동",
          "coords":{
            "center":{
              "crs":"EPSG:4326",
              "x":126.894688,
              "y":37.578325
            }
          }
        },
        "area4":{
          "name":"",
          "coords":{
            "center":{
              "crs":"",
              "x":0,
              "y":0
            }
          }
        }
      },
      "land":{
        "type":"1",
        "number1":"482",
        "number2":"49",
        "addition0":{
          "type":"",
          "value":""
        },
        "addition1":{
          "type":"",
          "value":""
        },
        "addition2":{
          "type":"",
          "value":""
        },
        "addition3":{
          "type":"",
          "value":""
        },
        "addition4":{
          "type":"",
          "value":""
        },
        "coords":{
          "center":{
            "crs":"",
            "x":0,
            "y":0
          }
        }
      }
    }
  ]
}
```
- 각 area의 name을 사용
