// node.js의 fs모듈 추출 
const fs = require('fs');

// csv파일 읽기 
const file_csv = fs.readFileSync('소상공인시장진흥공단_상가(상권)정보_서울_202106.csv');

// string으로 변환: fs로 읽은 Buffer를 문자열로 변환합니다. 
const string_csv = file_csv.toString();

// JSON 형식으로로 변환
const arr_json = csvToJSON(string_csv);

// JSON 파일 생성
fs.writeFileSync('tradingArea.json', arr_json);

function csvToJSON(csv_string) {
    // 1. 문자열을 줄바꿈으로 구분 => 배열에 저장 
    const rows = csv_string.replace(/"/gi, "").split("\r\n");
    // 2. 빈 배열 생성: CSV의 각 행을 담을 JSON 객체임 
    const jsonArray = [];
    // 3. 제목 행 추출 후, 콤마로 구분 => 배열에 저장 
    const header = rows[0].split(",");
    // 4. 내용 행 전체를 객체로 만들어, jsonArray에 담기 
    for (let i = 1; i < rows.length; i++){
        
        // 각 내용 행을 콤마로 구분 
        let row = rows[i].split(",");

        // 음식점만, 삼성/대치동만, 유흥업소빼고, 구내식당빼고, 배달전문빼고
        if (row[3] === 'Q' &&
            (row[17] === '1168010500' || row[17] === '1168010600' )&&
            row[5] !== 'Q09' && row[5] !== 'Q13' && row[5] !== 'Q14') {
            
            // 빈 객체 생성: 각 내용 행을 객체로 만들어 담아둘 객체임
            let obj = {};
            
            // 각 내용행을 {제목1:내용1, 제목2:내용2, ...} 형태의 객체로 생성
            for (let j = 0; j < header.length; j++){
                obj[header[j]] = row[j];
            }

            // 각 내용 행의 객체를 jsonArray배열에 담기
            jsonArray.push(obj);
        }
            
    }
    // 문자열 형태의 JSON으로 반환할 경우, 아래 코드 사용 
    return JSON.stringify(jsonArray);
}

// Q : 음식, Q09 : 유흥업소, Q14A01 : 구내식당
// 논현 : 1168010800, 삼성 : 1168010500, 역삼 : 1168010100, 대치 : 1168010600