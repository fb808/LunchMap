import {
    refreshButton, backButton, keywordButton as keywordButtonEvent,
    plusKeyword, okButton } from "./click.js";
import { recommendList } from "./recommendB.js";
import { get_query } from "./getQuery.js";
import { mainList } from "./list.js";

const keyword_list = ['한식', '국/탕', '찌개', '국수', '육류/고기', '곱창/막창/순대', 
    '치킨', '해물/생선', '분식', '패스트푸드', '일식/돈까스', '중식', '양식', '아시아', '기타'];
        
export function BScreen() {
    // 뒤로가기
    const backDiv = document.getElementById('back_area');

    const back = document.createElement('button');
    back.setAttribute('id', 'back_button');
    back.setAttribute('class', 'back');
    back.onclick = function() { backButton() };
    back.innerHTML = '&#11013';
    backDiv.appendChild(back);

    popupWindow();
    keyword();
    recommendArea();
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
    plusKeywordButton.onclick = function() { plusKeyword() };
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

function popupWindow() {

    const url_keyword = get_query();
    const urlkw = url_keyword['list'].split(',');
    let kw = [];
    for (let i = 0; i < urlkw.length; i++){
        if (keyword_list.includes(urlkw[i])) {
            kw.push(urlkw[i]);
        }
    }

    const contentArea = document.getElementsByClassName('modal-content')[0];

    const titleDiv = document.createElement('div');
    titleDiv.setAttribute('id', 'title_area');
    contentArea.appendChild(titleDiv);
    
    const title = document.createElement('span');
    title.setAttribute('id', 'title');
    title.innerHTML = '키워드 추가'
    titleDiv.appendChild(title);

    const closeButton = document.createElement('span');
    closeButton.setAttribute('id', 'close_button');
    closeButton.setAttribute('class', 'model-content');
    closeButton.innerHTML = 'X';
    titleDiv.appendChild(closeButton);

    const bodyDiv = document.createElement('div');
    bodyDiv.setAttribute('id', 'body_area');
    contentArea.appendChild(bodyDiv);

    let list = kw;

    for (let i = 0; i < keyword_list.length; i++){
        if (!kw.includes(keyword_list[i])) {
            const keywordButton = document.createElement('button');
            keywordButton.setAttribute('id', keyword_list[i]);
            keywordButton.setAttribute('class', 'keyword');
            keywordButton.onclick = function () {
                let index = list.indexOf(this.id);
                    if (index < 0) {
                        list.push(this.id);
                        document.getElementById(keyword_list[i]).style.backgroundColor = 'lightgreen';
                    } else {
                        list.splice(index, 1);
                        document.getElementById(keyword_list[i]).style.backgroundColor = 'white';
                    }
                console.log(list);
            };
            keywordButton.innerHTML = keyword_list[i];
            bodyDiv.appendChild(keywordButton);
        }
    }

    const ok = document.createElement('button');
    ok.setAttribute('id', 'ok_button');
    ok.setAttribute('class', 'model-content');
    ok.onclick = function () { okButton(list); };
    ok.innerHTML = '확인';
    bodyDiv.appendChild(ok);
}