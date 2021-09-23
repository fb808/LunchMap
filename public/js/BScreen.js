import { refreshButton, backButton, plusButton } from "./click.js";

function get_query(){
    var url = document.location.href;
    var qs = url.substring(url.indexOf('?') + 1).split('&');
    for(var i = 0, result = {}; i < qs.length; i++){
        qs[i] = qs[i].split('=');
        result[qs[i][0]] = decodeURIComponent(qs[i][1]);
    }
    return result;
}

export function BScreen() {
    // 뒤로가기
    const backDiv = document.getElementById('back_area');

    const back = document.createElement('button');
    back.setAttribute('id', 'back_button');
    back.setAttribute('class', 'back');
    back.onclick = function() { backButton() };
    back.innerHTML = '이전';
    backDiv.appendChild(back);

    // 키워드
    const url_keyword = get_query();
    const kw = url_keyword['list'].split(',');
    console.log(kw);
    keyword(kw);

    // 추천
    recommendArea();
    // 리스트
    list();
    // 맵
    mMap();
}

function keyword(kw) {
    // 키워드 영역
    const keywordDiv = document.getElementById('keyword_area')

    // 키워드
    const keywordWordDiv = document.getElementById('keyword_word_area');
    if (kw[0] === '') {
        keywordWordDiv.innerHTML = '키워드가 없습니다. ';
    } else {
        keywordWordDiv.innerHTML = kw;
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

function list(){
    // 리스트 영역
    const listDiv = document.getElementById('list');
}

function mMap() {

    // 회사 위치
    const company = { latitude: 37.50764693316519, longitude: 127.05776158879458 };

    // 지도 설정
    let mapContainer = document.getElementById('map'), // 지도를 표시할 div
        mapOption = { 
            center: new kakao.maps.LatLng(company.latitude, company.longitude), // 지도의 중심좌표 (회사)
            level: 1 // 지도의 확대 레벨
        };

    // 지도 생성
    let map = new kakao.maps.Map(mapContainer, mapOption);

}