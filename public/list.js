function recommendList(kw) {
    console.log(kw);
    handleRefresh();
}

function handleRefresh() {
    let requestURL = 'http://localhost:8000/data.json';
    $.getJSON(requestURL, setInfo);
}

let list = [];

// JSON 파일에서 필요한 부분만 골라내기
function setInfo(info) {
    list.length = 0;
    for (var i = 0; i < info.length; i++){
        var obj = {
            title: info[i].name,
            cate_4: info[i].cate_4,
            address: info[i].address,
            lating: new kakao.maps.LatLng(info[i].lon, info[i].lat),
            rate: info[i].rate,
            distance: info[i].distance,
            tag: info[i].tag
        };
    
        list.push(obj);
    }
    
    
}