from selenium import webdriver
import pandas as pd
import numpy as np
import time

df = pd.read_csv('data.csv', encoding='utf-8', sep=',')
df = df.replace('"', '')

df.columns = ['name', 'cate_1', 'cate_2', 'cate_3', 'area', 'address', 'lon', 'lat', 'rate', 'distance', 'tag']

# i = 0
cate4_d = []
# driver = webdriver.Chrome("chromedriver")

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

df.to_json(r'/home/ryujimin/develop/LunchMap/public/data.json', orient = 'records', double_precision=15, force_ascii=False)
# df.to_csv(r'/home/ryujimin/develop/LunchMap/public/data2.csv', sep=',', na_rep='NaN', index = False, encoding="utf-8-sig")