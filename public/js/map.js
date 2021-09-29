let markers_p = [];
let markers = [];
let id = ''

// 회사 위치
const company = { latitude: 37.50764693316519, longitude: 127.05776158879458 };
let map;

function mMap(listId) {

    // 지도 설정
    let mapContainer = document.getElementById('map'), // 지도를 표시할 div
        mapOption = {
            center: new kakao.maps.LatLng(company.latitude, company.longitude), // 지도의 중심좌표 (회사)
            level: 2 // 지도의 확대 레벨
        };
    // 지도 생성
    map = new kakao.maps.Map(mapContainer, mapOption);

    const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
    const imageSize = new kakao.maps.Size(30, 45); 
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
    const markerPosition = new kakao.maps.LatLng(company.latitude, company.longitude);

    const c_p = {
        title: '회사',
        position: markerPosition,
        image: markerImage
    };

    id = listId;
    
    markers_p.push(c_p);

    handleRefresh();
}

function handleRefresh() {
    let requestURL = 'http://localhost:8000/data.json';
    $.getJSON(requestURL, setInfo);
}

// JSON 파일에서 필요한 부분만 골라내기
function setInfo(info) {
    markers_p.length = 0;
    for (var i = 0; i < info.length; i++){
        var obj = {
            title: info[i].name,
            position: new kakao.maps.LatLng(info[i].lon, info[i].lat),
        };
    
        markers_p.push(obj);
        
        let make = new kakao.maps.Marker(obj);
        markers.push(make);
    }

    for (let i = 0; i < markers_p.length; i++){
        if (markers_p[i].title == id) {
            setMarker(i);
        } else {
            hideMarker(i);
        }
    }
}

function setMarker(i) {
    var moveLatLon = markers_p[i].position;
    map.setCenter(moveLatLon);
    (markers[i]).setMap(map);
}

function hideMarker(i) {
    markers[i].setMap(null);
}

export { mMap };