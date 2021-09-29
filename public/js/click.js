import { mMap } from './map.js';
import { recommendList as A } from './recommend.js'
import { recommendList as B } from './recommendB.js';

function refreshButton(x) {
    if (x === 'a') {
        A();
    } else if (x === 'b') {
        B(0);
    }
}

function clickARecommend(index) {
    location.href = `B.html?list=''&recommend=${index}`
}

function clickBRecommend(id, c) {
    mMap(id);
}

function clickKeyword(className) {
    alert(className);
}

function searchButton(keyword_list) {
    location.href = `B.html?list=${keyword_list}&recommend=`;
}

function backButton() {
    location.href = 'index.html';
}

function keywordButton(kw, kwi) {
    let index = kw.indexOf(kwi);
    kw.splice(index, 1);
    document.getElementById(kwi).remove();
    const stateObj = kw;
    history.replaceState(stateObj, '', `B.html?list=${stateObj}&recommend=`);
    location.reload();
}

function plusButton() {
    alert('추가');
}

export { refreshButton, clickARecommend, clickBRecommend, clickKeyword, searchButton, backButton, keywordButton, plusButton };