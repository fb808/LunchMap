import { get_query } from "./getQuery.js";

const keyword_list = ['한식', '국/탕', '국수', '육류/고기', '곱창/막창/순대', '치킨',
    '해물/생선', '분식', '패스트푸드', '일식/돈까스', '중식', '양식', '아시아', '기타'];

const modal = document.getElementsByClassName('modal')[0];
    
function aKeyword() {
    let list = [];
    const root = document.getElementById('keyword');

    for (let i = 0; i < keyword_list.length; i++){
        const tagButton = document.createElement('button');
        tagButton.setAttribute('class', 'tagButton');
        tagButton.setAttribute('id', keyword_list[i]);
        tagButton.onclick = function () {
            let index = list.indexOf(this.id);
                if (index < 0) {
                    list.push(this.id)
                    document.getElementById(keyword_list[i]).style.backgroundColor = 'lightgreen';
                } else {
                    list.splice(index, 1);
                    document.getElementById(keyword_list[i]).style.backgroundColor = 'white';
                }
            console.log(list);
        };
        tagButton.innerHTML = keyword_list[i];
        root.appendChild(tagButton);
    }

    return list;
}

function bKeyword() {

    const url_keyword = get_query();
    const urlkw = url_keyword['list'].split(',');
    let keyword = [];
    for (let i = 0; i < urlkw.length; i++){
        if (keyword_list.includes(urlkw[i])) {
            keyword.push(urlkw[i]);
        }
    }

    const root = document.getElementById('keyword_word_area');

    if (keyword.length === 0) {
        root.innerHTML = '키워드가 없습니다. ';
    } else {
        for (let i = 0; i < keyword.length; i++){
            const keywordButton = document.createElement('button');
            keywordButton.setAttribute('id', keyword[i]);
            keywordButton.setAttribute('class', 'keyword');
            keywordButton.onclick = function () {
                let index = keyword.indexOf(this.id);
                keyword.splice(index, 1);
                document.getElementById(this.id).remove();
                const stateObj = keyword;
                history.replaceState(stateObj, '', `B.html?list=${stateObj}&recommend=`);
                location.reload();
            };
            keywordButton.innerHTML = keyword[i];
            root.appendChild(keywordButton);
        }
    }

    const plusButton = document.createElement('button');
    plusButton.setAttribute('id', 'plus_button');
    plusButton.setAttribute('class', 'keyword');
    plusButton.onclick = function () {
        modal.style.display = "block";
    };
    plusButton.innerHTML = '+';
    root.appendChild(plusButton);

}

function popupWindow() {

    const url_keyword = get_query();
    const urlkw = url_keyword['list'].split(',');
    let kw = [];
    for (let i = 0; i < urlkw.length; i++){
        if (keyword_list.includes(urlkw[i])) {
            kw.push(urlkw[i]);
        }
    }

    const close = document.getElementById('close_button');
    close.onclick = function () {
        modal.style.display = "none";
    }

    const bodyDiv = document.getElementById('body_area');

    let list = kw;

    for (let i = 0; i < keyword_list.length; i++){
        if (!kw.includes(keyword_list[i])) {
            const keywordButton = document.createElement('button');
            keywordButton.setAttribute('id', keyword_list[i]);
            keywordButton.setAttribute('class', 'keyword');
            keywordButton.onclick = function () {
                let index = list.indexOf(this.id);
                    if (index < 0) {
                        list.push(this.id);
                        document.getElementById(keyword_list[i]).style.backgroundColor = 'lightgreen';
                    } else {
                        list.splice(index, 1);
                        document.getElementById(keyword_list[i]).style.backgroundColor = 'white';
                    }
                console.log(list);
            };
            keywordButton.innerHTML = keyword_list[i];
            bodyDiv.appendChild(keywordButton);
        }
    }

    const ok = document.createElement('button');
    ok.setAttribute('id', 'ok_button');
    ok.setAttribute('class', 'modal-content');
    ok.onclick = function () {
        modal.style.display = "none";
        const stateObj = list;
        history.replaceState(stateObj, '', `B.html?list=${stateObj}&recommend=`);
        location.reload();
    };
    ok.innerHTML = '확인'
    bodyDiv.appendChild(ok);
}

export { aKeyword, bKeyword, popupWindow };