window.onload = function() {
  handleRefresh();
}

// JSON 파일 로드
function handleRefresh() {
    var requestURL = 'http://127.0.0.1:5500/tradingArea.json';
    $.getJSON(requestURL, NearbyRestaurant);
    $.getJSON(requestURL);
}

var company = { latitude: 37.50764693316519, longitude: 127.05776158879458 };
var mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = { 
        center: new kakao.maps.LatLng(company.latitude, company.longitude), // 지도의 중심좌표 (회사)
        level: 1 // 지도의 확대 레벨
    };

// 지도를 표시할 div와 지도 옵션으로 지도를 생성
var map = new kakao.maps.Map(mapContainer, mapOption); 

// 마커가 표시될 위치 - 회사 위치 넣고 시작
let markerPosition = [
    {
        title: '식스티헤르츠',
        latlng: new kakao.maps.LatLng(company.latitude, company.longitude),
        distance: '0',
        address: '서울특별시 삼성1동 테헤란로 507​',
        classification: ''
    }
];

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

function NearbyRestaurant(restaurantInfo) {
    let info = restaurantInfo;

    for (var i = 0; i < info.length; i++){
        // 주변 식당 위치값 markerPosition에 저장하기
        var obj = {
            title: info[i].상호명,
            latlng: new kakao.maps.LatLng(info[i].위도, info[i].경도),
            distance: computeDistance({latitude: info[i].위도, longitude: info[i].경도}),
            address: info[i].도로명주소,
            classification: info[i].상권업종소분류명
        };
        markerPosition.push(obj);
        markerPosition = markerPosition.sort(function (a, b) {
            return a.distance - b.distance;
        });
    }

    // 마커 생성
    setTimeout(makeMarker(), 300);

    // 리스트 생성
    list();
}

function makeMarker() {
    for (var i = 1; i < markerPosition.length; i++) {
        var restaurantMarker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: markerPosition[i].latlng, // 마커를 표시할 위치
            title: markerPosition[i].title // 마커의 타이틀
        });
        restaurantMarker.id = markerPosition[i].title;
        // 지도 위에 마커 표시
        restaurantMarker.setMap(map);

        kakao.maps.event.addListener(restaurantMarker, 'click', function() {
            alert(this.id);
            document.getElementById(this.id).scrollIntoView();
        });
    }
}

function list() {
    let restaurantInfoDiv = document.getElementById('list');
    for (var i = 1; i < markerPosition.length; i++) {
        var mDistance = markerPosition[i].distance;
        mDistance >= 1000 ? mDistance = mDistance / 1000 + 'km' : mDistance += 'm';
        // 주변 식당 정보
        var div = document.createElement('div');
        div.setAttribute('class', 'restaurantInfoItem');
        div.setAttribute('id', markerPosition[i].title);
        div.innerHTML = `<b>${markerPosition[i].title}</b><br>
                        ${mDistance}<br>
                        ${markerPosition[i].classification}<br>
                        ${markerPosition[i].address}`;
        restaurantInfoDiv.appendChild(div);

        document.getElementById(markerPosition[i].title).onclick = function () {
            var index = markerPosition.findIndex(p => p.title == this.id);
            // 이동할 위도 경도 위치를 생성합니다
            var moveLatLon = markerPosition[index].latlng;
            // 지도 중심을 이동 시킵니다
            map.setCenter(moveLatLon);
            // document.getElementById(markerPosition[index].title).scrollIntoView();
        };
    }
}

// 구면 코사인 법칙(Spherical Law of Cosine) 으로 두 위도/경도 지점의 거리를 구함
// 반환 거리 단위 (m)
function computeDistance(destCoords) {
    var startCoords = company;
    var startLatRads = degreesToRadians(startCoords.latitude);
    var startLongRads = degreesToRadians(startCoords.longitude);
    var destLatRads = degreesToRadians(destCoords.latitude);
    var destLongRads = degreesToRadians(destCoords.longitude);

    var Radius = 6371; //지구의 반경(km)
    var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) + 
                    Math.cos(startLatRads) * Math.cos(destLatRads) *
                    Math.cos(startLongRads - destLongRads)) * Radius;

    return Math.round(distance * 1000);
}

function degreesToRadians(degrees) {
    radians = (degrees * Math.PI)/180;
    return radians;
}

function goHome (){
    // 이동할 위도 경도 위치를 생성합니다
    var moveLatLon = new kakao.maps.LatLng(company.latitude, company.longitude);
    // 지도 중심을 이동 시킵니다
    map.setCenter(moveLatLon);
}