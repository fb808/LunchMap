function recommendList() {
    handleRefresh();
}

function handleRefresh() {
    let requestURL = 'http://localhost:8000/data.json';
    $.getJSON(requestURL, setInfo);
}

let list = [];

// JSON 파일에서 필요한 부분만 골라내기
function setInfo(restaurantInfo) {

    let info = restaurantInfo;

    for (var i = 0; i < info.length; i++){
        if (info[i].rate >= 4.0 & info[i].distance <= 500) {
            var obj = {
                title: info[i].name,
                cate_1: info[i].cate_1,
                cate_2: info[i].cate_2,
                cate_3: info[i].cate_3,
                cate_4: info[i].cate_4,
                address: info[i].address,
                latlng: new kakao.maps.LatLng(info[i].lon, info[i].lat),
                rate: info[i].rate,
                distance: info[i].distance,
                address: info[i].address,
                tag: info[i].tag
            };
        
            list.push(obj);
        }
        
        // 거리순으로 정렬
        list = list.sort(function (a, b) {
            return a.distance - b.distance;
        });
    }
    
    recommend();
}

function recommend() {
    const max = Math.floor(list.length);
    const min = Math.ceil(0);
    const root = document.getElementById('list');
    while (root.firstChild) {
        root.removeChild(root.firstChild);
    }
    for (let i = 0; i < 2; i++){
        let randomIndex = Math.floor(Math.random() * (max - min)) + min;
        console.log(list[randomIndex]);
        createListItem(root, list[randomIndex]);
    }
}

function createListItem(root, item) {
    const listItem = document.createElement('div');
    listItem.setAttribute('id', 'list_item');
    listItem.setAttribute('class', 'recommend');
    root.appendChild(listItem);

    const title_area = document.createElement('div');
    title_area.setAttribute('id', 'list_item_title_area');
    title_area.setAttribute('class', 'recommend');
    listItem.appendChild(title_area);

    const title = document.createElement('span');
    title.setAttribute('id', `${item.title}_title`);
    title.setAttribute('class', 'recommend');
    title.innerHTML = item.title;
    title_area.appendChild(title);

    const rate = document.createElement('span');
    rate.setAttribute('id', `${item.title}_rate`);
    rate.setAttribute('class', 'recommend');
    rate.innerHTML = item.rate;
    title_area.appendChild(rate);    
}

export { recommendList };