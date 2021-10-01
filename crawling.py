from selenium import webdriver
from haversine import haversine
import pandas as pd
import numpy as np
import time

df = pd.read_csv('소상공인시장진흥공단_상가(상권)정보_서울_202106.csv', encoding='utf-8', sep=',')
df = df.replace('"', '')

df = df.loc[df['상권업종대분류명'] == '음식']  
df = df[['상호명', '상권업종중분류명', '상권업종소분류명', '표준산업분류명', '법정동명', '도로명주소', '위도', '경도']]
df = df.loc[(df['법정동명'] == '삼성동') | (df['법정동명'] == '대치동')]
df = df.loc[(df['상권업종중분류명'] != '유흥주점') & (df['상권업종중분류명'] != '음식배달서비스') & (df['상권업종중분류명'] != '기타음식업') & (df['상권업종중분류명'] != '커피점/카페') & (df['상권업종중분류명'] != '제과제빵떡케익') & (df['상권업종중분류명'] != '기타음식업')]
df.columns = ['name', 'cate_1', 'cate_2', 'cate_3', 'area', 'address', 'lon', 'lat']

i = 0
rank_d = []
dist_d = []
tag_d = []
link_d = []
company = (37.50764693316519, 127.05776158879458)  #Latitude, Longitude

driver = webdriver.Chrome("chromedriver")

for idx, obj in df.iterrows():

    name = obj['name']
    cate_1 = obj['cate_1']
    cate_2 = obj['cate_2']
    cate_3 = obj['cate_3']
    area = obj['area']
    address = obj['address']
    latitude = obj['lon']
    longitude = obj['lat']

    print(name)
    place = (latitude, longitude)

    try:
        searchName = name
        if area == '삼성동':
            searchName = '삼성동 ' + name
        elif area == '대치동':
            searchName = '대치동 ' + name
        
        kakao_map_search_url = f"https://map.kakao.com/?q={searchName}"
        driver.get(kakao_map_search_url)
        time.sleep(1)

        dist = haversine(company, place, unit = 'm')
        rate = driver.find_element_by_xpath("/html/body/div[5]/div[2]/div[1]/div[7]/div[5]/ul/li[1]/div[4]/span[1]/em").text
        tag = driver.find_element_by_css_selector("#info\.search\.place\.list > li:nth-child(1) > div.head_item.clickArea > span").text
        link = driver.find_element_by_css_selector("#info\.search\.place\.list > li:nth-child(1) > div.info_item > div.contact.clickArea > a.moreview").get_attribute('href')

        dist_d.append(round(dist))
        rank_d.append(rate)
        tag_d.append(tag)
        link_d.append(link)

    except Exception as e1:
        df = df.drop(df.index[i])
        i = i-1
        pass

    distance = obj['distance']

    if distance > 1200:
        df = df.drop(df.index[i])
        i = i-1

    i = i+1
    print(i)

df['rate'] = rank_d
df['distance'] = dist_d
df['tag'] = tag_d
df['link'] = link_d

cate4_d = []

for idx, obj in df.iterrows():

    tag = obj['tag']
    
    try:
        if tag == '한식' or tag == '한정식' or tag == '한식뷔페' or tag == '수제비' or tag == '죽' or tag == '샤브샤브' or tag == '두부':
            cate4_d.append('한식')
        elif tag == '찌개,전골' or tag == '설렁탕' or tag == '곰탕' or tag == '국밥' or tag == '감자탕' or tag == '추어탕' or tag == '해장국' or tag == '삼계탕':
            cate4_d.append('국/탕')
        elif tag == '국수' or tag == '냉면':
            cate4_d.append('국수')
        elif tag == '육류,고기' or tag == '불고기,두루치기' or tag == '족발,보쌈'or tag == '삼겹살' or tag == '갈비' or tag == '닭요리' or tag == '오리':
            cate4_d.append('육류/고기')
        elif tag == '곱창,막창' or tag == '순대':
            cate4_d.append('곱창/막창/순대')
        elif tag == '치킨' or tag == '닭강정':
            cate4_d.append('치킨')
        elif tag == '해물,생선' or tag == '회' or tag == '장어' or tag == '게,대게' or tag == '복어' or tag == '참치회' or tag == '아구' or tag == '조개':
            cate4_d.append('해물/생선')
        elif tag == '일식' or tag == '일식집' or tag == '퓨전일식' or tag == '일본식라면' or tag == '초밥,롤' or tag == '돈까스,우동':
            cate4_d.append('일식/돈까스')
        elif tag == '분식' or tag == '떡볶이' or tag == '주먹밥' or tag == '오뎅바':
            cate4_d.append('분식')
        elif tag == '패스트푸드' or tag == '도시락' or tag == '샌드위치' or tag == '햄버거' or tag == '피자' or tag == '토스트':
            cate4_d.append('패스트푸드')
        elif tag == '양식' or tag == '스테이크,립' or tag == '이탈리안' or tag == '패밀리레스토랑' or tag == '샐러드':
            cate4_d.append('양식')
        elif tag == '중식' or tag == '중화요리' or tag == '퓨전중식':
            cate4_d.append('중식')
        elif tag == '치킨' or tag == '닭강정':
            cate4_d.append('치킨')
        elif tag == '베트남음식' or tag == '아시아음식' or tag == '동남아음식':
            cate4_d.append('아시아음식')
        else:
            cate4_d.append('기타')
    except Exception as e1:
        print(e1)
        pass

df['cate_4'] = cate4_d

# df.to_json(r'/home/ryujimin/develop/LunchMap/public/data.json', orient = 'records', double_precision=15, force_ascii=False)
df.to_csv(r'/home/ryujimin/develop/LunchMap/data.csv', sep=',', na_rep='NaN', index = False, encoding="utf-8-sig")
