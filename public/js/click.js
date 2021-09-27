import { recommendList } from './recommend.js'

function refreshButton() {
    recommendList();
}

function clickRecommend(title) {
    console.log(title);
}

function clickKeyword(className) {
    alert(className);
}

function searchButton(keyword_list) {
    location.href = `B.html?list=${keyword_list}`;
}

function backButton() {
    location.href = 'index.html';
}

function keywordButton(kw, kwi) {
    let index = kw.indexOf(kwi);
    kw.splice(index, 1);
    document.getElementById(kwi).remove();
    console.log(kw);
    const stateObj = kw;
    history.replaceState(stateObj, '', `B.html?list=${stateObj}`);
    location.reload();
}

function plusButton() {
    alert('추가');
}

export { refreshButton, clickRecommend, clickKeyword, searchButton, backButton, keywordButton, plusButton };