import { refreshButton, searchButton } from "./click.js";
import { keyword } from "./keyword.js";

export function AScreen() {
    // 루트
    const rootDiv = document.getElementById('root');

    // A
    const AScreenDiv = document.createElement('div');
    AScreenDiv.setAttribute('id', 'A');
    rootDiv.appendChild(AScreenDiv);

    recommendArea(AScreenDiv);
    searchArea(AScreenDiv);
}

function recommendArea(AScreenDiv) {
    // 추천 영역
    const recommendDiv = document.createElement('div');
    recommendDiv.setAttribute('class', 'recommend');
    recommendDiv.setAttribute('id', 'recommend_area');
    AScreenDiv.appendChild(recommendDiv);
    
    // 추천 타이틀 영역
    const titleDiv = document.createElement('div');
    titleDiv.setAttribute('class', 'recommend');
    titleDiv.setAttribute('id', 'title_area');
    recommendDiv.appendChild(titleDiv);

    // 추천 타이틀
    const title = document.createElement('span');
    title.setAttribute('class', 'recommend');
    title.setAttribute('id', 'title');
    title.innerHTML = `오늘의 추천`
    titleDiv.appendChild(title);

    // 새로고침 버튼
    const refresh = document.createElement('button');
    refresh.setAttribute('class', 'recommend');
    refresh.setAttribute('id', 'refresh_button');
    refresh.onclick = function() { refreshButton() };
    refresh.innerHTML = `새로고침`
    titleDiv.appendChild(refresh);

    // 리스트 영역
    const listDiv = document.createElement('div');
    listDiv.setAttribute('class', 'recommend');
    listDiv.setAttribute('id', 'list');
    recommendDiv.appendChild(listDiv);
}

function searchArea(AScreenDiv) {
    // 루트
    const rootDiv = document.getElementById('root');
    let keyword_list = ['default'];

    // 검색 영역
    const searchDiv = document.createElement('div');
    searchDiv.setAttribute('class', 'search');
    searchDiv.setAttribute('id', 'search_area');
    AScreenDiv.appendChild(searchDiv);
    
    // 검색 타이틀 영역
    const titleDiv = document.createElement('div');
    titleDiv.setAttribute('class', 'search');
    titleDiv.setAttribute('id', 'title_area');
    searchDiv.appendChild(titleDiv);

    // 검색 타이틀
    const title = document.createElement('span');
    title.setAttribute('class', 'search');
    title.setAttribute('id', 'title');
    title.innerHTML = `키워드 검색`
    titleDiv.appendChild(title);

    // 검색 버튼
    const refresh = document.createElement('button');
    refresh.setAttribute('class', 'search');
    refresh.setAttribute('id', 'search_button');
    refresh.onclick = function() { searchButton(keyword_list) };
    refresh.innerHTML = `검색`
    titleDiv.appendChild(refresh);

    // 키워드 영역
    const keywordDiv = document.createElement('div');
    keywordDiv.setAttribute('class', 'search');
    keywordDiv.setAttribute('id', 'keyword');
    searchDiv.appendChild(keywordDiv);

    // 키워드 버튼
    keyword();
}
