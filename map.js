// 서비스 실행 시...
window.onload = function () {
  handleRefresh();
}

// 회사 위치
let company = { latitude: 37.50764693316519, longitude: 127.05776158879458 };

// 지도 설정
let mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = { 
        center: new kakao.maps.LatLng(company.latitude, company.longitude), // 지도의 중심좌표 (회사)
        level: 1 // 지도의 확대 레벨
    };

// 지도 생성
let map = new kakao.maps.Map(mapContainer, mapOption); 

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
let imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 

// 마커 이미지 크기
let imageSize = new kakao.maps.Size(30, 45); 
    
// 마커 이미지   
let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

// 마커 설정
let marker = new kakao.maps.Marker({
    map: map, // 마커를 표시할 지도
    position: markerPosition[0].latlng, // 마커를 표시할 위치
    title: markerPosition[0].title, // 마커의 타이틀
    image: markerImage // 마커 이미지
});

// 회사 마커 생성
marker.setMap(map);

// 회사 바로가기
function goHome (){
    // 이동할 위치
    let moveLatLon = new kakao.maps.LatLng(company.latitude, company.longitude);
    // 중심 이동
    map.setCenter(moveLatLon);
}

// JSON 파일 로드
function handleRefresh() {
    let requestURL = 'http://127.0.0.1:5500/tradingArea.json';
    $.getJSON(requestURL, NearbyRestaurant);
}

// JSON 파일에서 필요한 부분만 골라내기
function NearbyRestaurant(restaurantInfo) {

    // JSON 파일 받기
    let info = restaurantInfo;

    for (var i = 0; i < info.length; i++){
        // 필요한 정보만
        var obj = {
            title: info[i].상호명,
            latlng: new kakao.maps.LatLng(info[i].위도, info[i].경도), // 위경도로 카카오맵 api 마커 생성에 필요한 객체 생성
            distance: computeDistance({latitude: info[i].위도, longitude: info[i].경도}), // 거리 구하기
            address: info[i].도로명주소,
            classification: info[i].상권업종소분류명
        };
        
        // 주변 식당 정보 markerPosition에 저장하기
        markerPosition.push(obj);

        // 데이터 거리순으로 정렬
        markerPosition = markerPosition.sort(function (a, b) {
            return a.distance - b.distance;
        });
    }

    // 마커 생성
    setTimeout(makeMarker(), 300);
}

// 마커 생성
function makeMarker() {
    for (var i = 1; i < markerPosition.length; i++) {
        // 마커 초기화
        showMarker(i);
        // 리스트 생성
        list(i);
    }
}

// 마커 정보 저장용
let restaurantMarker;

// 마커 초기화
function showMarker(i) {

    // 마커 정보
    restaurantMarker = new kakao.maps.Marker({
        position: markerPosition[i].latlng, // 마커를 표시할 위치
        title: markerPosition[i].title, // 마커의 타이틀
    });

    // 마커 아이디값 지정
    restaurantMarker.id = markerPosition[i].title;

    // 맵 위에 마커 보이게
    setMarker(map);

    // 마커 클릭 이벤트
    kakao.maps.event.addListener(restaurantMarker, 'click', function() {
        alert(this.id);
        document.getElementById(this.id).scrollIntoView();
    });
}

// 맵 위에 마커 보이게
function setMarker(map) {
    restaurantMarker.setMap(map);
}

// 맵 위에 마커 안보이게... 라는데 해본 적 X
function hideMarker(condition) {
    setMarker(null);
}

// 리스트 생성할 위치
let restaurantInfoDiv = document.getElementById('list');

// 리스트 생성
function list(i) {

    // 거리 단위 변환
    let mDistance = markerPosition[i].distance;
    mDistance >= 1000 ? mDistance = mDistance / 1000 + 'km' : mDistance += 'm';
    
    // 리스트 class, id 값 지정
    var div = document.createElement('div');
    div.setAttribute('class', 'restaurantInfoItem');
    div.setAttribute('id', markerPosition[i].title);

    // 리스트 출력
    div.innerHTML = `<b>${markerPosition[i].title}</b><br>
                    ${mDistance}<br>
                    ${markerPosition[i].classification}<br>
                    ${markerPosition[i].address}`;
    
    // 출력 위치
    restaurantInfoDiv.appendChild(div);

    // 리스트 클릭 이벤트
    document.getElementById(markerPosition[i].title).onclick = function () {

        // id 값이 같은 마커 찾기
        var index = markerPosition.findIndex(p => p.title == this.id);

        // 이동
        var moveLatLon = markerPosition[index].latlng;
        map.setCenter(moveLatLon);
    };
}



// 구면 코사인 법칙(Spherical Law of Cosine) 으로 두 위도/경도 지점의 거리를 구함, 반환 거리 단위 (m)
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
