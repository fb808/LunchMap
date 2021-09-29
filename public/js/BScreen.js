import { refreshButton, backButton, 
    keywordButton as keywordButtonEvent, plusButton } from "./click.js";
import { recommendList } from "./recommendB.js";
import { get_query } from "./getQuery.js";
import { mainList } from "./list.js";

export function BScreen() {
    // 뒤로가기
    const backDiv = document.getElementById('back_area');

    const back = document.createElement('button');
    back.setAttribute('id', 'back_button');
    back.setAttribute('class', 'back');
    back.onclick = function() { backButton() };
    back.innerHTML = '&#11013';
    backDiv.appendChild(back);

    keyword();
    // 추천
    recommendArea();
    // 리스트
    list();
}

function keyword() {
    // 키워드 영역
    const keywordDiv = document.getElementById('keyword_area');

    // 추천 타이틀 영역
    const titleDiv = document.getElementById('title_area');

    // 추천 타이틀
    const title = document.createElement('span');
    title.setAttribute('class', 'recommend');
    title.setAttribute('id', 'title');
    title.innerHTML = `키워드`
    titleDiv.appendChild(title);

    // 키워드
    const url_keyword = get_query();
    const urlkw = url_keyword['list'].split(',');
    const keyword_list = ['한식', '국/탕', '찌개', '국수', '육류/고기', '곱창/막창/순대', 
        '치킨', '해물/생선', '분식', '패스트푸드', '일식/돈까스', '중식', '양식', '아시아', '기타'];
    let kw = [];
    for (let i = 0; i < urlkw.length; i++){
        if (keyword_list.includes(urlkw[i])) {
            kw.push(urlkw[i]);
        }
    }

    // 키워드
    const keywordWordDiv = document.getElementById('keyword_word_area');
    if (kw.length === 0) {
        keywordWordDiv.innerHTML = '키워드가 없습니다. ';
    } else {
        for (let i = 0; i < kw.length; i++){
            const keywordButton = document.createElement('button');
            keywordButton.setAttribute('id', kw[i]);
            keywordButton.setAttribute('class', 'keyword');
            keywordButton.onclick = function () {keywordButtonEvent(kw, kw[i]);};
            keywordButton.innerHTML = kw[i];
            keywordWordDiv.appendChild(keywordButton);
        }
    }

    // 키워드 추가 버튼
    const plusKeywordButton = document.createElement('button');
    plusKeywordButton.setAttribute('id', 'plus_button');
    plusKeywordButton.setAttribute('class', 'keyword');
    plusKeywordButton.onclick = function() { plusButton() };
    plusKeywordButton.innerHTML = '+';
    keywordDiv.appendChild(plusKeywordButton);
}

function recommendArea() {
    // 추천 영역
    const recommendDiv = document.getElementById('recommend_area');
    
    // 추천 타이틀 영역
    const titleDiv = document.createElement('summary');
    titleDiv.setAttribute('class', 'recommend');
    titleDiv.setAttribute('id', 'title_area');
    recommendDiv.appendChild(titleDiv);

    // 추천 타이틀
    const title = document.createElement('span');
    title.setAttribute('class', 'recommend');
    title.setAttribute('id', 'title');
    title.innerHTML = `추천`
    titleDiv.appendChild(title);

    // 새로고침 버튼
    const refresh = document.createElement('button');
    refresh.setAttribute('class', 'recommend');
    refresh.setAttribute('id', 'refresh_button');
    refresh.onclick = function() { refreshButton('b') };
    refresh.innerHTML = `새로고침`
    titleDiv.appendChild(refresh);

    // 리스트 영역
    const listDiv = document.createElement('div');
    listDiv.setAttribute('class', 'recommend');
    listDiv.setAttribute('id', 'list');
    recommendDiv.appendChild(listDiv);

    recommendList();
}

function list() {
    const root = document.getElementsByClassName('list')[0];

    const titleDiv = document.createElement('div');
    titleDiv.setAttribute('class', 'list');
    titleDiv.setAttribute('id', 'title_area');
    root.appendChild(titleDiv);

    const title = document.createElement('div');
    title.setAttribute('class', 'list');
    title.setAttribute('id', 'title');
    title.innerHTML = '검색 결과'
    titleDiv.appendChild(title);

    const listDiv = document.createElement('div');
    listDiv.setAttribute('class', 'list');
    listDiv.setAttribute('id', 'list_area');
    root.appendChild(listDiv);

    // 리스트 영역
    mainList(listDiv);
}
