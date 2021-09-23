function refreshButton() {
    alert('새로고침');
}

function clickKeyword(className) {
    alert(className);
}

function searchButton(keyword_list) {
    console.log(keyword_list);
    location.href = 'B.html';
}

function backButton() {
    location.href = 'index.html';
}

function plusButton() {
    alert('추가');
}

export { refreshButton, clickKeyword, searchButton, backButton, plusButton };