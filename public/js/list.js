import { get_query } from './getQuery.js';
import { clickBRecommend as clicListItem } from './click.js';

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
            address: info[i].address,
            lating: new kakao.maps.LatLng(info[i].lon, info[i].lat),
            rate: info[i].rate,
            distance: info[i].distance,
            tag: info[i].tag
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
        listItem.setAttribute('id', `${item[i].title}`);
        listItem.setAttribute('class', 'list');
        listItem.onclick = function() { clicListItem(item[i].title, 'list') };
        root.appendChild(listItem);

        const title_area = document.createElement('div');
        title_area.setAttribute('id', 'list_item_title_area');
        title_area.setAttribute('class', 'list');
        listItem.appendChild(title_area);

        const title = document.createElement('span');
        title.setAttribute('id', `${item[i].title}_title`);
        title.setAttribute('class', 'list');
        title.innerHTML = `${item[i].title}`;
        title_area.appendChild(title);

        const rate = document.createElement('span');
        rate.setAttribute('id', `${item[i].title}_rate`);
        rate.setAttribute('class', 'list');
        rate.innerHTML = `&#11088 ${item[i].rate.toFixed(1)}`;
        title_area.appendChild(rate);

        const body_area = document.createElement('div');
        body_area.setAttribute('id', 'list_item_body_area');
        body_area.setAttribute('class', 'list');
        listItem.appendChild(body_area);

        const distance = document.createElement('div');
        distance.setAttribute('id', `${item[i].title}_distance`);
        distance.setAttribute('class', 'recommend');
        distance.innerHTML = `${item[i].distance}m`;
        body_area.appendChild(distance);

        const cate = document.createElement('span');
        cate.setAttribute('id', `${item.title}_cate`);
        cate.setAttribute('class', 'list');
        cate.innerHTML = `#${item[i].cate_4}`;
        body_area.appendChild(cate);
        
        const tag = document.createElement('span');
        tag.setAttribute('id', `${item[i].title}_tag`);
        tag.setAttribute('class', 'list');
        tag.innerHTML = `${item[i].tag}  `;
        body_area.appendChild(tag);

        const address = document.createElement('div');
        address.setAttribute('id', `${item[i].title}_address`);
        address.setAttribute('class', 'list');
        address.innerHTML = `${item[i].address}`;
        body_area.appendChild(address);
    }
}

export { mainList };