# WhereWeMeet

![size](https://img.shields.io/github/repo-size/sweatpotato13/WhereWeMeet)
![contributors](https://img.shields.io/github/contributors/sweatpotato13/WhereWeMeet)
![stars](https://img.shields.io/github/stars/sweatpotato13/WhereWeMeet?style=plastic)

> 2020년 10월 29일 ~ 2021년 1월 30일<br>
> Toy project using `React Native` and `NaverMap API`

## Contents
1. [Technical Stack](#Stack)
2. [How to Run](#How-to-run)
3. [Features](#Features)
   1. [Search address](#1-Search-address)
   2. [Markers](#2-Markers)
   3. [Find intermediate point](#3-Find-intermediate-point)
   4. [API information](#4-API-information)

<h3 align='center'>Preview</h3>
<p align='center'>
  <img src='./cleanNmap/image/ios.gif'/>
</p>

## Stack
<p>
  <img src="https://img.shields.io/static/v1?label=&message=ReactNative&color=61DAFB&logo=react&logoColor=FFFFFF"/>
  <img src="https://img.shields.io/static/v1?label=&message=Javascript&color=F1E05A&logo=javascript&logoColor=FFFFFF"/>
  <img src="https://img.shields.io/static/v1?label=&message=Android&color=brightgreen&logo=android&logoColor=FFFFFF"/>
  <img src="https://img.shields.io/static/v1?label=&message=iOS&color=orange&logo=apple&logoColor=FFFFFF"/>
  <img src="https://img.shields.io/static/v1?label=&message=NaverMapAPI&color=brightgreen&logo=naver&logoColor=FFFFFF"/>
</p>

## How to run

### Install
```
npm install
cd ios
pod install
```

### Run
```
// in react native root dir
// if you want to run android
npm run android

// if you want to run ios
npm run ios
```

## Features

### 1. Search address
   * 네이버 지도 API를 사용해서 주소지 검색 가능
   * 지번, 도로명 주소 모두 가능
   
### 2. Markers
   * 마커 추가 :: 주소지 검색 후 추가 버튼 터치 또는 지도에 직접 터치를 통해
   * 마커 제거 :: 마커 클릭 후 제거 버튼 터치를 통해
   
### 3. Find intermediate point
   * 찍혀있는 마커 정보를 이용해서 중간 지점 표시

### 4. API information
