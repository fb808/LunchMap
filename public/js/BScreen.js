import { backButton, plusButton } from "./click.js";

export function BScreen() {
    // 루트
    const rootDiv = document.getElementById('root');

    // B
    const BScreenDiv = document.createElement('div');
    BScreenDiv.setAttribute('id', 'B');
    rootDiv.appendChild(BScreenDiv);

    // 뒤로가기
    const backDiv = document.createElement('div');
    backDiv.setAttribute('id', 'back_area');
    backDiv.setAttribute('class', 'back');
    BScreenDiv.appendChild(backDiv);

    const back = document.createElement('button');
    back.setAttribute('id', 'back_button');
    back.setAttribute('class', 'back');
    back.onclick = function() { backButton() };
    back.innerHTML = '이전';
    BScreenDiv.appendChild(back);

    // 키워드
    keyword(BScreenDiv);
}

function keyword(BScreenDiv) {
    // 키워드 영역
    const keywordDiv = document.createElement('div');
    keywordDiv.setAttribute('id', 'keyword_area');
    keywordDiv.setAttribute('class', 'keyword');
    BScreenDiv.appendChild(keywordDiv);

    // 키워드 표시 영역
    const keywordWordDiv = document.createElement('span');
    keywordWordDiv.setAttribute('id', 'keyword_word_area');
    keywordWordDiv.setAttribute('class', 'keyword');
    keywordDiv.appendChild(keywordWordDiv);

    // // 키워드
    keywordWordDiv.innerHTML = '키워드가 없습니다. '

    // 키워드 추가 버튼
    const plusKeywordButton = document.createElement('button');
    plusKeywordButton.setAttribute('id', 'plus_button');
    plusKeywordButton.setAttribute('class', 'keyword');
    plusKeywordButton.onclick = function() { plusButton() };
    plusKeywordButton.innerHTML = '+';
    keywordDiv.appendChild(plusKeywordButton);
}