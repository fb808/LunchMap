from selenium import webdriver
import pandas as pd
import numpy as np
import time
import csv
import json

df = pd.read_csv('소상공인시장진흥공단_상가(상권)정보_서울_202106.csv', sep=',')
df = df.replace('"', '')

df = df.loc[df['상권업종대분류명'] == '음식']  
df = df[['상호명', '상권업종중분류명', '상권업종소분류명', '표준산업분류명', '법정동명', '도로명주소', '위도', '경도']]
df = df.loc[(df['법정동명'] == '삼성동') | (df['법정동명'] == '대치동')]
df = df.loc[(df['상권업종중분류명'] != '유흥주점') & (df['상권업종중분류명'] != '음식배달서비스') & (df['상권업종중분류명'] != '기타음식업') & (df['상권업종중분류명'] != '커피점/카페') & (df['상권업종중분류명'] != '제과제빵떡케익')]
df.columns = ['name', 'cate_1', 'cate_2', 'cate_3', 'area', 'address', 'lon', 'lat']

driver = webdriver.Chrome("chromedriver")

i = 0
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
    print(idx)
    print (df.index[i])

    try:
        searchName = name
        if area == '삼성동':
            searchName = '삼성동 ' + name
        elif area == '대치동':
            searchName = '대치동 ' + name
        
        kakao_map_search_url = f"https://map.kakao.com/?q={searchName}"
        driver.get(kakao_map_search_url)
        time.sleep(1)

        rate = driver.find_element_by_xpath("/html/body/div[5]/div[2]/div[1]/div[7]/div[5]/ul/li[1]/div[4]/span[1]/em").text

        print(rate)

        d = {idx: float(rate)}
        add_rate = pd.Series(d, index=[idx])
        df['rate'] = add_rate

    except Exception as e1:
        print(e1)
        df = df.drop(df.index[i])
        i = i-1
        pass

    i = i+1
    print(i)

    if(i > 4):
        break

print(df)