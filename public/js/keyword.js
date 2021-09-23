// 한식  국/탕  찌개  국수  육류,고기  족발,보쌈  곱창,막창,순대
// 치킨
// 해물,생선 
// 분식 
// 패스트푸드
// 일식,돈까스
// 중식
// 양식  
// 아시아
// 기타

import { clickKeyword } from './click.js';

const list = ['한식', '국/탕', '찌개', '국수', '육류,고기', '족발,보쌈', '곱창,막창,순대', '치킨', '해물,생선', '분식', '패스트푸드', '일식,돈까스', '중식', '양식', '아시아', '기타'];

function keyword() {
    const buttonArea = document.getElementsByClassName('keyword')[0];
    for (let i = 0; i < list.length; i++){
        const tagButton = document.createElement('button');
        tagButton.setAttribute('class', `${list[i]}`);
        tagButton.setAttribute('id', 'tagButton');
        tagButton.onclick = function() { clickKeyword(this.className) };
        tagButton.innerHTML = `${list[i]}`;
        buttonArea.appendChild(tagButton);
    }
}

export { keyword };