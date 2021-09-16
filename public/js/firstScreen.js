import { refreshButton, searchButton } from "./click.js";
import { keyword } from "./keyword.js";

export function firstScreen() {
    // 루트
    const rootDiv = document.getElementById('root');

    // A
    const firstScreenDiv = document.createElement('div');
    firstScreenDiv.setAttribute('id', 'first');
    rootDiv.appendChild(firstScreenDiv);

    recommendArea(firstScreenDiv);
    searchArea(firstScreenDiv);
}

function recommendArea(firstScreenDiv) {
    // 추천 영역
    const recommendDiv = document.createElement('div');
    recommendDiv.setAttribute('class', 'recommend_area');
    recommendDiv.setAttribute('id', 'recommend');
    firstScreenDiv.appendChild(recommendDiv);
    
    // 추천 타이틀 영역
    const titleDiv = document.createElement('div');
    titleDiv.setAttribute('class', 'title_area');
    titleDiv.setAttribute('id', 'recommend');
    recommendDiv.appendChild(titleDiv);

    // 추천 타이틀
    const title = document.createElement('span');
    title.setAttribute('class', 'title');
    title.setAttribute('id', 'recommend');
    title.innerHTML = `오늘의 추천`
    titleDiv.appendChild(title);

    // 새로고침 버튼
    const refresh = document.createElement('button');
    refresh.setAttribute('class', 'refresh_button');
    refresh.setAttribute('id', 'recommend');
    refresh.onclick = function() { refreshButton() };
    refresh.innerHTML = `새로고침`
    titleDiv.appendChild(refresh);

    // 리스트 영역
    const listDiv = document.createElement('div');
    listDiv.setAttribute('class', 'list');
    listDiv.setAttribute('id', 'recommend');
    recommendDiv.appendChild(listDiv);
}

function searchArea(firstScreenDiv) {
    // 루트
    const rootDiv = document.getElementById('root');

    // 검색 영역
    const searchDiv = document.createElement('div');
    searchDiv.setAttribute('class', 'search_area');
    searchDiv.setAttribute('id', 'search');
    firstScreenDiv.appendChild(searchDiv);
    
    // 검색 타이틀 영역
    const titleDiv = document.createElement('div');
    titleDiv.setAttribute('class', 'title_area');
    titleDiv.setAttribute('id', 'search');
    searchDiv.appendChild(titleDiv);

    // 검색 타이틀
    const title = document.createElement('span');
    title.setAttribute('class', 'title');
    title.setAttribute('id', 'search');
    title.innerHTML = `키워드 검색`
    titleDiv.appendChild(title);

    // 검색 버튼
    const refresh = document.createElement('button');
    refresh.setAttribute('class', 'search_button');
    refresh.setAttribute('id', 'search');
    refresh.onclick = function() { searchButton() };
    refresh.innerHTML = `검색`
    titleDiv.appendChild(refresh);

    // 키워드 영역
    const keywordDiv = document.createElement('div');
    keywordDiv.setAttribute('class', 'keyword');
    keywordDiv.setAttribute('id', 'search');
    searchDiv.appendChild(keywordDiv);

    // 키워드 버튼
    keyword();
}
