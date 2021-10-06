from selenium import webdriver
import pandas as pd
import numpy as np
import time

df = pd.read_csv('data.csv', encoding='utf-8', sep=',')
df = df.replace('"', '')

df.columns = ['name', 'cate_1', 'cate_2', 'cate_3', 'area', 'address', 'lon', 'lat', 'rate', 'distance', 'tag', 'cate_4', 'link']

# rank_d = []
# i = 0

# driver = webdriver.Chrome("chromedriver")

# for idx, obj in df.iterrows():

#     name = obj['name']
#     cate_1 = obj['cate_1']
#     cate_2 = obj['cate_2']
#     cate_3 = obj['cate_3']
#     area = obj['area']
#     address = obj['address']
#     latitude = obj['lon']
#     longitude = obj['lat']

#     print(name)
#     place = (latitude, longitude)

#     try:
#         searchName = name
#         if area == '삼성동':
#             searchName = '삼성동 ' + name
#         elif area == '대치동':
#             searchName = '대치동 ' + name
        
#         kakao_map_search_url = f"https://map.kakao.com/?q={searchName}"
#         driver.get(kakao_map_search_url)
#         time.sleep(1)

#         rate = driver.find_element_by_xpath("/html/body/div[5]/div[2]/div[1]/div[7]/div[5]/ul/li[1]/div[4]/span[1]/em").text
#         tag = driver.find_element_by_css_selector("#info\.search\.place\.list > li:nth-child(1) > div.head_item.clickArea > span").text
#         link = driver.find_element_by_css_selector("#info\.search\.place\.list > li:nth-child(1) > div.info_item > div.contact.clickArea > a.moreview").get_attribute('href')

#         rank_d.append(rate)
        
#     except Exception as e1:
#         df = df.drop(df.index[i])
#         i = i-1
#         pass

#     i = i+1
#     print(i)

# df['rate'] = rank_d

df.to_json(r'/home/ryujimin/develop/LunchMap/public/data.json', orient = 'records', double_precision=15, force_ascii=False)
# df.to_csv(r'/home/ryujimin/develop/LunchMap/public/data2.csv', sep=',', na_rep='NaN', index = False, encoding="utf-8-sig")