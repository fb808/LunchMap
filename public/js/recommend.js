import { makingList } from './makingList.js'

export function recommendList() {
    handleRefresh();
}

function handleRefresh() {
    let requestURL = 'http://localhost:8000/data.json';
    $.getJSON(requestURL, setInfo);
}

let list = [];

// JSON 파일에서 필요한 부분만 골라내기
function setInfo(info) {
    list.length = 0;
    for (var i = 0; i < info.length; i++){
        if (info[i].rate >= 3.8 & info[i].distance <= 600) {
            var obj = {
                title: info[i].name,
                cate_4: info[i].cate_4,
                address: info[i].address,
                rate: info[i].rate,
                distance: info[i].distance,
                tag: info[i].tag
            };
        
            list.push(obj);
        }
    }
    recommend();
}

let indexList = [];

function recommend() {
    const max = Math.floor(list.length);
    const min = Math.ceil(0);
    const root = document.getElementById('list');
    while (root.firstChild) {
        root.removeChild(root.firstChild);
    }
    for (let i = 0; i < 2; i++){
        let randomIndex = Math.floor(Math.random() * (max - min)) + min;
        indexList.push(randomIndex)
        createListItem(root, list[randomIndex], randomIndex);
    }
}

function createListItem(root, item, index) {
    const listItem = document.createElement('div');
    listItem.setAttribute('id', 'list_item');
    listItem.setAttribute('class', 'recommend');
    root.appendChild(listItem);

    const listArea = document.createElement('span');
    listArea.setAttribute('id', 'list_area');
    listArea.setAttribute('class', 'recommend');
    listArea.onclick = function () {
        location.href = `B.html?list=''&recommend=${index}`
    };
    listItem.appendChild(listArea);

    const shortcut = document.createElement('button');
    shortcut.setAttribute('id', 'shortcut_button');
    shortcut.setAttribute('class', 'shortcut');
    shortcut.innerHTML = '&#10145';
    listItem.appendChild(shortcut);

    makingList(listArea, item, 'recommend');
}
