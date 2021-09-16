from selenium import webdriver
import pandas as pd
import numpy as np
import time

df = pd.read_csv('data.csv', encoding='utf-8', sep=',')
df = df.replace('"', '')

df.columns = ['name', 'cate_1', 'cate_2', 'cate_3', 'area', 'address', 'lon', 'lat', 'rate', 'distance', 'tag']

# # i = 0
# tag_d = []
# driver = webdriver.Chrome("chromedriver")

# for idx, obj in df.iterrows():

#     name = obj['name']
#     area = obj['area']
#     cate_2 = obj['cate_2']
#     rate = obj['rate']
    
#     print(name)
#     try:
#         searchName = name
#         if area == '삼성동':
#             searchName = '삼성동 ' + name
#         elif area == '대치동':
#             searchName = '대치동 ' + name
        
#         kakao_map_search_url = f"https://map.kakao.com/?q={searchName}"
#         # naver_map_search_url = f"https://m.map.naver.com/search2/search.naver?query={searchName}&sm=hty&style=v5"
#         driver.get(kakao_map_search_url)
#         time.sleep(2)

#         tag = driver.find_element_by_css_selector("#info\.search\.place\.list > li:nth-child(1) > div.head_item.clickArea > span").text
#         # kind = driver.find_element_by_css_selector("#ct > div.search_listview._content._ctList > ul > li > div.item_info > a > div > em").text
#         print(tag)
#         print(' ')

#         tag_d.append(tag)

#     except Exception as e1:
#         tag_d.append('오류')
#         print(e1)
#         pass

# df['tag'] = tag_d

df.to_json(r'/home/ryujimin/develop/LunchMap/public/data.json', orient = 'records', double_precision=15, force_ascii=False)
# df.to_csv(r'/home/ryujimin/develop/LunchMap/public/data2.csv', sep=',', na_rep='NaN', index = False, encoding="utf-8-sig")