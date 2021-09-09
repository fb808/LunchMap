from selenium import webdriver
import time
import json
import pymysql

lunchMap_db = pymysql.connect(
    user='ryu',
    passwd='aqswde123',
    host='localhost',
    db='LunchMap',
    charset='utf8'
)

curs = lunchMap_db.cursor()

with open('./public/tradingArea.json') as f:
    json_object = json.load(f)

driver = webdriver.Chrome("chromedriver")

for obj in json_object:

    no = obj['상가업소번호']
    title = obj['상호명']
    kindCode = obj['상권업종중분류코드']
    classification = obj['상권업종소분류명']
    address = obj['도로명주소']
    latitude = float(obj['위도'])
    longitude = float(obj['경도'])

    print(title)

    try:
        searchTitle = title
        if obj['법정동코드'] == '1168010500':
            searchTitle = '삼성동 ' + obj['상호명']
        elif obj['법정동코드'] == '1168010600':
            searchTitle = '대치동 ' + obj['상호명']
        
        kakao_map_search_url = f"https://map.kakao.com/?q={searchTitle}"
        driver.get(kakao_map_search_url)
        time.sleep(1)

        rate = driver.find_element_by_xpath("/html/body/div[5]/div[2]/div[1]/div[7]/div[5]/ul/li[1]/div[4]/span[1]/em").text
        
        sql = f'''INSERT INTO `Restaurant` VALUES ({no}, '{title}', '{kindCode}', '{classification}', '{address}', {latitude}, {longitude}, {rate})'''
        curs.execute(sql)
        lunchMap_db.commit()

    except Exception as e1:
        pass

lunchMap_db.close()