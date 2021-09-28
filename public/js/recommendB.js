import { clickBRecommend as clickRecommend } from "./click.js";
import { get_query } from './getQuery.js';

let index = [];
let keyword = [];

function recommendList(rc) {
    index.length = 0;
    keyword.length = 0;
    if (rc != '') {
        index.push(rc);
    }
    // 키워드
    const url_keyword = get_query();
    const urlkw = url_keyword['list'].split(',');
    const keyword_list = ['한식', '국/탕', '찌개', '국수', '육류/고기', '곱창/막창/순대', 
        '치킨', '해물/생선', '분식', '패스트푸드', '일식/돈까스', '중식', '양식', '아시아', '기타'];
    for (let i = 0; i < urlkw.length; i++){
        if (keyword_list.includes(urlkw[i])) {
            keyword.push(urlkw[i]);
        }
    }
    console.log(`키워드 : ${keyword}`)
    console.log(`추천 : ${rc}`);
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
        if (info[i].rate >= 3.8 & info[i].distance <= 500) {
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
    recommend();
}

let list_match = [];

function recommend() {
    const max = Math.floor(list.length-1);
    const min = Math.ceil(0);
    const root = document.getElementById('list');
    while (root.firstChild) {
        root.removeChild(root.firstChild);
    }
    if (keyword.length > 0) {
        recommendKeyword();
        let remax = Math.floor(list_match.length-1);
        let randomIndex = Math.floor(Math.random() * (remax - min)) + min;
        createListItem(root, list_match[randomIndex]);
    } else if (keyword.length == 0 && index.length == 0) {
        let randomIndex = Math.floor(Math.random() * (max - min)) + min;
        createListItem(root, list[randomIndex]);
    } else {
        createListItem(root, list[index[0]]);
    }
}

function recommendKeyword() {
    list_match.length = 0;
    for (let i = 0; i < list.length; i++){
        for (let j = 0; j < keyword.length; j++){
            if (keyword[j] == list[i].cate_4) {
                list_match.push(list[i]);
                break;
            }
        }
    }
    if (list_match.length == 0) {
        keyword.length = 0;
        recommend();
    }
}

function createListItem(root, item) {
    const listItem = document.createElement('div');
    listItem.setAttribute('id', 'list_item');
    listItem.setAttribute('class', 'recommend');
    listItem.onclick = function() { clickRecommend(item) };
    root.appendChild(listItem);

    const title_area = document.createElement('div');
    title_area.setAttribute('id', 'list_item_title_area');
    title_area.setAttribute('class', 'recommend');
    listItem.appendChild(title_area);

    const title = document.createElement('span');
    title.setAttribute('id', `${item.title}_title`);
    title.setAttribute('class', 'recommend');
    title.innerHTML = `${item.title}`;
    title_area.appendChild(title);

    const rate = document.createElement('span');
    rate.setAttribute('id', `${item.title}_rate`);
    rate.setAttribute('class', 'recommend');
    rate.innerHTML = `&#11088 ${item.rate.toFixed(1)}`;
    title_area.appendChild(rate);

    const body_area = document.createElement('div');
    body_area.setAttribute('id', 'list_item_body_area');
    body_area.setAttribute('class', 'recommend');
    listItem.appendChild(body_area);

    const distance = document.createElement('span');
    distance.setAttribute('id', `${item.cate_4}_cate`);
    distance.setAttribute('class', 'recommend');
    distance.innerHTML = `${item.distance}m`;
    body_area.appendChild(distance);

    const cate = document.createElement('span');
    cate.setAttribute('id', `${item.cate_4}_cate`);
    cate.setAttribute('class', 'recommend');
    cate.innerHTML = `#${item.cate_4}`;
    body_area.appendChild(cate);
    
    const tag = document.createElement('span');
    tag.setAttribute('id', `${item.tag}_tag`);
    tag.setAttribute('class', 'recommend');
    tag.innerHTML = `${item.tag}  `;
    body_area.appendChild(tag);

    const address = document.createElement('div');
    address.setAttribute('id', `${item.address}_address`);
    address.setAttribute('class', 'recommend');
    address.innerHTML = `${item.address}  `;
    body_area.appendChild(address);
}

export { recommendList };