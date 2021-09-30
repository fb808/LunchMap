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

function plusKeyword() {
    const modal = document.getElementsByClassName('modal')[0];
    const close = document.getElementById('close_button');

    modal.style.display = "block";

    close.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function okButton(list) {
    const modal = document.getElementsByClassName('modal')[0];
    modal.style.display = "none";
    const stateObj = list;
    history.replaceState(stateObj, '', `B.html?list=${stateObj}&recommend=`);
    location.reload();
}

export {
    refreshButton, clickARecommend, clickBRecommend, clickKeyword,
    searchButton, backButton, keywordButton, plusKeyword, okButton
};