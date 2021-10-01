import { get_query } from './getQuery.js';
import { makingList } from './makingList.js';
import { mMap } from './map.js';

let keyword = [];
let root = '';

function mainList(listRoot) {
    const url_keyword = get_query();
    const urlkw = url_keyword['list'].split(',');
    const keyword_list = ['한식', '국/탕', '찌개', '국수', '육류/고기', '곱창/막창/순대', 
        '치킨', '해물/생선', '분식', '패스트푸드', '일식/돈까스', '중식', '양식', '아시아', '기타'];
    for (let i = 0; i < urlkw.length; i++){
        if (keyword_list.includes(urlkw[i])) {
            keyword.push(urlkw[i]);
        }
    }

    root = listRoot;
    handleRefresh();
}

function handleRefresh() {
    let requestURL = 'http://localhost:8000/data.json';
    $.getJSON(requestURL, setInfo);
}

let list = [];
let list_match = [];

// JSON 파일에서 필요한 부분만 골라내기
function setInfo(info) {
    list.length = 0;
    for (let i = 0; i < info.length; i++){
        let obj = {
            title: info[i].name,
            cate_4: info[i].cate_4,
            area: info[i].area,
            address: info[i].address,
            lating: new kakao.maps.LatLng(info[i].lon, info[i].lat),
            rate: info[i].rate,
            distance: info[i].distance,
            tag: info[i].tag,
            link: info[i].link
        };
    
        list.push(obj);

        list = list.sort(function (a, b) {
            return a.distance - b.distance;
        });
    }
    
    if (keyword.length == 0) {
        createListItem(list);
    } else {
        list_match.length = 0;
        for (let i = 0; i < list.length; i++){
            for (let j = 0; j < keyword.length; j++){
                if (keyword[j] == list[i].cate_4) {
                    list_match.push(list[i]);
                    break;
                }
            }
        }
        createListItem(list_match);
    }
}

function createListItem(item) {
    for (let i = 0; i < item.length; i++){
        const listItem = document.createElement('div');
        listItem.setAttribute('id', 'list_item');
        listItem.setAttribute('class', 'list');
        root.appendChild(listItem);
        
        const listArea = document.createElement('span');
        listArea.setAttribute('id', `${item[i].title}`);
        listArea.setAttribute('class', 'list');
        listArea.onclick = function () { mMap(item[i].title, item[i].address) };
        listItem.appendChild(listArea);

        makingList(listArea, item[i], 'list');
        
    }
}

export { mainList };