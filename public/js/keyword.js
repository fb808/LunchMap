// 한식 한정식 한식뷔페 찌개,전골 설렁탕 곰탕 국밥 감자탕 추어 해장국 수제비 국수 냉면 죽 샤브샤브 두부전문점 두부
// 육류,고기 불고기,두루치기 삽겹살 족발,보쌈 갈비 곱창,막창 순대 철판요리
// 닭요리 삼계탕 치킨 닭강정 오리
// 일식 일식집 퓨전일식 일본식라면 초밥,롤 해물,생선 회 장어 게,대게 복어 참치회 아구 조개
// 분식 떡볶이 패스트푸드 도시락 샌드위치 햄버거 피자 토스트 주먹밥
// 양식 스테이크,립 이탈리안 돈까스,우동 패밀리레스토랑
// 중식 중화요리
// 베트남음식 멕시칸,브라질 아시아음식

const list = ['한식', '한정식', '한식뷔페', '찌개,전골', '설렁탕', '곰탕', '국밥', '감자탕', '추어', '해장국', '수제비', '국수', '냉면', '죽', '샤브샤브', '두부전문점', '두부',
            '육류,고기', '불고기,두루치기', '삽겹살', '족발,보쌈', '갈비', '곱창,막창', '순대', '철판요리',
            '닭요리', '삼계탕', '치킨', '닭강정', '오리',
            '일식', '일식집', '퓨전일식', '일본식라면', '초밥,롤', '해물,생선', '회', '장어', '게,대게', '복어', '참치회', '아구', '조개',
            '분식', '떡볶이', '패스트푸드', '도시락', '샌드위치', '햄버거', '피자', '토스트', '주먹밥',
            '양식', '스테이크,립', '이탈리안', '돈까스,우동', '패밀리레스토랑',
            '중식', '중화요리',
            '베트남음식', '멕시칸,브라질', '아시아음식'];

const list_TF = [];

function keyword() {
    const buttonArea = document.getElementsByClassName('keyword')[0];
    for (let i = 0; i < list.length; i++){
        const tagButton = document.createElement('button');
        tagButton.setAttribute('class', `${list[i]}`);
        tagButton.setAttribute('id', 'tagButton');
        tagButton.innerHTML = `${list[i]}`;
        buttonArea.appendChild(tagButton);
    }
}

export { keyword };