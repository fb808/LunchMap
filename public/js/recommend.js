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
        if (info[i].rate >= 3.8 & info[i].distance <= 500) {
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
    listItem.onclick = function () {
        location.href = `B.html?list=''&recommend=${index}`
    };
    root.appendChild(listItem);

    const title_area = document.createElement('div');
    title_area.setAttribute('id', 'list_item_title_area');
    title_area.setAttribute('class', 'recommend');
    listItem.appendChild(title_area);

    const title = document.createElement('span');
    title.setAttribute('id', `${item.title}_title`);
    title.setAttribute('class', 'recommend');
    title.innerHTML = `${item.title}`;
    title_area.appendChild(title);

    const rate = document.createElement('span');
    rate.setAttribute('id', `${item.title}_rate`);
    rate.setAttribute('class', 'recommend');
    rate.innerHTML = `&#11088 ${item.rate.toFixed(1)}`;
    title_area.appendChild(rate);

    const body_area = document.createElement('div');
    body_area.setAttribute('id', 'list_item_body_area');
    body_area.setAttribute('class', 'recommend');
    listItem.appendChild(body_area);

    const distance = document.createElement('span');
    distance.setAttribute('id', `${item.cate_4}_cate`);
    distance.setAttribute('class', 'recommend');
    distance.innerHTML = `${item.distance}m`;
    body_area.appendChild(distance);

    const cate = document.createElement('span');
    cate.setAttribute('id', `${item.cate_4}_cate`);
    cate.setAttribute('class', 'recommend');
    cate.innerHTML = `#${item.cate_4}`;
    body_area.appendChild(cate);
    
    const tag = document.createElement('span');
    tag.setAttribute('id', `${item.tag}_tag`);
    tag.setAttribute('class', 'recommend');
    tag.innerHTML = `${item.tag}  `;
    body_area.appendChild(tag);

    const address = document.createElement('div');
    address.setAttribute('id', `${item.address}_address`);
    address.setAttribute('class', 'recommend');
    address.innerHTML = `${item.address}  `;
    body_area.appendChild(address);
}
