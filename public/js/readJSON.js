const list = [];

// JSON 파일 로드
(function handleRefresh() {
    let requestURL = 'http://localhost:8000/data.json';
    $.getJSON(requestURL, NearbyRestaurant);
});

// JSON 파일에서 필요한 부분만 골라내기
function NearbyRestaurant(info) {
    for (var i = 0; i < info.length; i++){
        var obj = {
            title: info[i].name,
            cate_1: info[i].cate_1,
            cate_2: info[i].cate_2,
            cate_3: info[i].cate_3,
            address: info[i].address,
            latlng: new kakao.maps.LatLng(info[i].lon, info[i].lat),
            rate: info[i].rate,
            distance: info[i].distance,
            address: info[i].address,
            tag: info[i].tag
        };
        
        list.push(obj);

        // 거리순으로 정렬
        list = list.sort(function (a, b) {
            return a.distance - b.distance;
        });
    }
}

export {list};