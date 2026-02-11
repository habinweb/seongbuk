const container = document.getElementById("kakaoMap");
const options = {
  center: new kakao.maps.LatLng(37.6027, 127.0139), // 예시: 성북 근처
  level: 3,
};
const map = new kakao.maps.Map(container, options);

// 마커 예시
const marker = new kakao.maps.Marker({ position: options.center });
marker.setMap(map);
