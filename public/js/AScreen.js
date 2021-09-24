import { refreshButton, searchButton } from "./click.js";
import { recommendList } from "./recommend.js";

export function AScreen() {
    recommendArea();
    searchArea();
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

    recommendList();
}

function searchArea() {
    const list = ['한식', '국/탕', '찌개', '국수', '육류/고기', '곱창/막창/순대', '치킨', 
    '해물/생선', '분식', '패스트푸드', '일식/돈까스', '중식', '양식', '아시아', '기타'];
    let keyword_list = [];

    // 검색 영역
    const searchDiv = document.getElementById('search_area');
    
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
    for (let i = 0; i < list.length; i++){
        const tagButton = document.createElement('button');
        tagButton.setAttribute('class', 'tagButton');
        tagButton.setAttribute('id', list[i]);
        tagButton.onclick = function () {
            let index = keyword_list.indexOf(this.id);
                if (index < 0) {
                    keyword_list.push(this.id)
                    document.getElementById(list[i]).style.backgroundColor = 'lightgreen';
                } else {
                    keyword_list.splice(index, 1);
                    document.getElementById(list[i]).style.backgroundColor = 'white';
                }
            console.log(keyword_list);
        };
        tagButton.innerHTML = list[i];
        keywordDiv.appendChild(tagButton);
    }
}
