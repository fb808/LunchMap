import { recommendList } from "./recommendB.js";
import { mainList } from "./list.js";
import { bKeyword as keyword, popupWindow } from "./makingButton.js";

const keyword_list = ['한식', '국/탕', '국수', '육류/고기', '곱창/막창/순대', 
    '치킨', '해물/생선', '분식', '패스트푸드', '일식/돈까스', '중식', '양식', '아시아', '기타'];
        
// 뒤로가기
const back = document.getElementById('back_button');
back.onclick = function () {
    location.href = 'index.html';
};

popupWindow();

keyword();

const refresh = document.getElementById('refresh_button');
refresh.onclick = function () { recommendList(0) };
recommendList();

const listDiv = document.getElementsByClassName('list')[3];
mainList(listDiv);