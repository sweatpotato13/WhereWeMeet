# some_project

## Geo Url results
`query=연사리 93`
```json
{
    "status": "OK",
    "meta": {
        "totalCount": 1,
        "page": 1,
        "count": 1
    },
    "addresses": [
        {
        "roadAddress": "경상남도 거제시 연초면 효촌1길 10-1",
        "jibunAddress": "경상남도 거제시 연초면 연사리 93",
        "englishAddress": "10-1, Hyochon 1-gil, Yeoncho-myeon, Geoje-si, Gyeongsangnam-do, Republic of Korea",
        "addressElements": [
            {
            "types": ["SIDO"],
            "longName": "경상남도",
            "shortName": "경상남도",
            "code": ""
            },
            {
            "types": ["SIGUGUN"],
            "longName": "거제시",
            "shortName": "거제시",
            "code": ""
            },
            {
            "types": ["DONGMYUN"],
            "longName": "연초면",
            "shortName": "연초면",
            "code": ""
            },
            {
            "types": ["RI"],
            "longName": "연사리",
            "shortName": "연사리",
            "code": ""
            },
            {
            "types": ["ROAD_NAME"],
            "longName": "효촌1길",
            "shortName": "효촌1길",
            "code": ""
            },
            {
            "types": ["BUILDING_NUMBER"],
            "longName": "10-1",
            "shortName": "10-1",
            "code": ""
            },
            {
            "types": ["BUILDING_NAME"],
            "longName": "",
            "shortName": "",
            "code": ""
            },
            {
            "types": ["LAND_NUMBER"],
            "longName": "93",
            "shortName": "93",
            "code": ""
            },
            {
            "types": ["POSTAL_CODE"],
            "longName": "53209",
            "shortName": "53209",
            "code": ""
            }
        ],
        "x": "128.6521583",
        "y": "34.9070498",
        "distance": 0
        }
    ],
    "errorMessage": ""
}
```
- 필요한 정보 : addresses-x-y
- 유사한 주소가 있는 경우 addresses가 여러 개의 json을 가질 수 있음

## Reverse Geo Url results
`request=coordsToaddr&coords=127.1054065,37.3595669&orders=legalcode,admcode,addr,roadaddr&output=json`
- orders
  1. legalcode : 법정동
  2. admcode : 행정동
  3. addr : 지번주소
  4. roadaddr : ehfhaud wnth
- 상세주소가 없는 경우에 대응하기 위해서 상세주소가 필요하 때는 모든 주소를 받는 것을 api에서느 추천함.
- result : 네이버 그린 팩토리 -> 경기도 성남시 분당구 불정로 6 그린팩토리(정자동 178-1)
```json
{
"status":{
 "code":0,
 "name":"ok",
 "message":"done"
},
"results":[
 {
    "name":"legalcode",
    "code":{
       "id":"4113510300",
       "type":"L",
       "mappingId":"02135103"
    },
    "region":{
       "area0":{
          "name":"kr",
          "coords":{
             "center":{
                "crs":"",
                "x":0.0,
                "y":0.0
             }
          }
       },
       "area1":{
          "name":"경기도",
          "coords":{
             "center":{
                "crs":"EPSG:4326",
                "x":127.550802,
                "y":37.4363177
             }
          },
          "alias":"경기"
       },
       "area2":{
          "name":"성남시 분당구",
          "coords":{
             "center":{
                "crs":"EPSG:4326",
                "x":127.118925,
                "y":37.38282
             }
          }
       },
       "area3":{
          "name":"정자동",
          "coords":{
             "center":{
                "crs":"EPSG:4326",
                "x":127.111533,
                "y":37.361458
             }
          }
       },
       "area4":{
          "name":"",
          "coords":{
             "center":{
                "crs":"",
                "x":0.0,
                "y":0.0
             }
          }
       }
    }
 },
 {
    "name":"admcode",
    "code":{
       "id":"4113555000",
       "type":"A",
       "mappingId":"02135550"
    },
    "region":{
       "area0":{
          "name":"kr",
          "coords":{
             "center":{
                "crs":"",
                "x":0.0,
                "y":0.0
             }
          }
       },
       "area1":{
          "name":"경기도",
          "coords":{
             "center":{
                "crs":"EPSG:4326",
                "x":127.550802,
                "y":37.4363177
             }
          },
          "alias":"경기"
       },
       "area2":{
          "name":"성남시 분당구",
          "coords":{
             "center":{
                "crs":"EPSG:4326",
                "x":127.118925,
                "y":37.38282
             }
          }
       },
       "area3":{
          "name":"정자1동",
          "coords":{
             "center":{
                "crs":"EPSG:4326",
                "x":127.106363,
                "y":37.372799
             }
          }
       },
       "area4":{
          "name":"",
          "coords":{
             "center":{
                "crs":"",
                "x":0.0,
                "y":0.0
             }
          }
       }
    }
 },
 {
    "name":"addr",
    "code":{
       "id":"4113510300",
       "type":"L",
       "mappingId":"02135103"
    },
    "region":{
       "area0":{
          "name":"kr",
          "coords":{
             "center":{
                "crs":"",
                "x":0.0,
                "y":0.0
             }
          }
       },
       "area1":{
          "name":"경기도",
          "coords":{
             "center":{
                "crs":"EPSG:4326",
                "x":127.550802,
                "y":37.4363177
             }
          },
          "alias":"경기"
       },
       "area2":{
          "name":"성남시 분당구",
          "coords":{
             "center":{
                "crs":"EPSG:4326",
                "x":127.118925,
                "y":37.38282
             }
          }
       },
       "area3":{
          "name":"정자동",
          "coords":{
             "center":{
                "crs":"EPSG:4326",
                "x":127.111533,
                "y":37.361458
             }
          }
       },
       "area4":{
          "name":"",
          "coords":{
             "center":{
                "crs":"",
                "x":0.0,
                "y":0.0
             }
          }
       }
    },
    "land":{
       "type":"1",
       "number1":"178",
       "number2":"1",
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
             "x":0.0,
             "y":0.0
          }
       }
    }
 },
 {
    "name":"roadaddr",
    "code":{
       "id":"4113510300",
       "type":"L",
       "mappingId":"02135103"
    },
    "region":{
       "area0":{
          "name":"kr",
          "coords":{
             "center":{
                "crs":"",
                "x":0.0,
                "y":0.0
             }
          }
       },
       "area1":{
          "name":"경기도",
          "coords":{
             "center":{
                "crs":"EPSG:4326",
                "x":127.550802,
                "y":37.4363177
             }
          },
          "alias":"경기"
       },
       "area2":{
          "name":"성남시 분당구",
          "coords":{
             "center":{
                "crs":"EPSG:4326",
                "x":127.118925,
                "y":37.38282
             }
          }
       },
       "area3":{
          "name":"정자동",
          "coords":{
             "center":{
                "crs":"EPSG:4326",
                "x":127.111533,
                "y":37.361458
             }
          }
       },
       "area4":{
          "name":"",
          "coords":{
             "center":{
                "crs":"",
                "x":0.0,
                "y":0.0
             }
          }
       }
    },
    "land":{
       "type":"",
       "number1":"6",
       "number2":"",
       "addition0":{
          "type":"building",
          "value":"NAVER그린팩토리"
       },
       "addition1":{
          "type":"zipcode",
          "value":"463867"
       },
       "addition2":{
          "type":"roadGroupCode",
          "value":"411353180030"
       },
       "addition3":{
          "type":"",
          "value":""
       },
       "addition4":{
          "type":"",
          "value":""
       },
       "name":"불정로",
       "coords":{
          "center":{
             "crs":"",
             "x":0.0,
             "y":0.0
          }
       }
    }
 }
]
}
```
- addr과 roadaddr에서 각 area와 land 정보를 통해 상세 주소를 얻어낼 수 있다.
- 건물이 있는 경우 addition0 키에서 해당 종류의 값을 알아낼 수 있다.
