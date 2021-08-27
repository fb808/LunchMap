window.onload = function() {
  handleRefresh();
}

// JSON 파일 로드
function handleRefresh() {
    var requestURL = 'http://127.0.0.1:5500/tradingArea.json';
    $.getJSON(requestURL, NearbyRestaurant);
    $.getJSON(requestURL);
}

var mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = { 
        center: new kakao.maps.LatLng(37.50764693316519, 127.05776158879458), // 지도의 중심좌표 (회사)
        level: 1 // 지도의 확대 레벨
    };

// 지도를 표시할 div와 지도 옵션으로 지도를 생성
var map = new kakao.maps.Map(mapContainer, mapOption); 

// 마커가 표시될 위치 - 회사 위치 넣고 시작
let markerPosition = [
    {
        title: '식스티헤르츠',
        latlng: new kakao.maps.LatLng(37.50755819521287, 127.05783050995228)
    }
];

function NearbyRestaurant(restaurantInfo) {
    let restaurantInfoDiv = document.getElementById('list');
    let info = restaurantInfo;
    for (var i = 0; i < info.length; i++){
        // 주변 식당 위치값 markerPosition에 저장하기
        var obj = {
            title: info[i].상호명,
            latlng: new kakao.maps.LatLng(info[i].위도, info[i].경도)
        };
        markerPosition.push(obj);

        // 주변 식당 정보
        var div = document.createElement('div');
        div.setAttribute('class', 'restaurantInfoItem');
        div.setAttribute('id', info[i].상호명);
        div.innerHTML = `<b>${info[i].상호명}</b><br><br>
                            ${info[i].상권업종소분류명}<br>
                            ${info[i].도로명}`;
        restaurantInfoDiv.appendChild(div);
    }

    // 마커 생성
    setTimeout(function () {
        for (var i = 1; i < markerPosition.length; i++) {
            var restaurantMarker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: markerPosition[i].latlng, // 마커를 표시할 위치
                title: markerPosition[i].title // 마커의 타이틀
            });
            // 지도 위에 마커 표시
            restaurantMarker.setMap(map);

        }

    }, 1000);

}

// 마커 이미지 주소
var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
// 마커 이미지 크기
var imageSize = new kakao.maps.Size(30, 45); 
    
// 마커 이미지 생합니다    
var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
    var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: markerPosition[0].latlng, // 마커를 표시할 위치
        title: markerPosition[0].title, // 마커의 타이틀
        image: markerImage // 마커 이미지
    });

marker.setMap(map);
