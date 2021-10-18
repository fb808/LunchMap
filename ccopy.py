from selenium import webdriver
import pandas as pd
import numpy as np
import time

df = pd.read_csv('data.csv', encoding='utf-8', sep=',')
df = df.replace('"', '')

df.columns = ['name', 'cate_1', 'cate_2', 'cate_3', 'area', 'address', 'lon', 'lat', 'rate', 'distance', 'tag', 'cate_4', 'link']

# tag_d = []
# i = 0

# # driver = webdriver.Chrome("chromedriver")

# for idx, obj in df.iterrows():

#     name = obj['name']
#     # cate_1 = obj['cate_1']
#     # cate_2 = obj['cate_2']
#     # cate_3 = obj['cate_3']
#     # area = obj['area']
#     # address = obj['address']
#     # latitude = obj['lon']
#     # longitude = obj['lat']
#     tag = obj['tag']

#     print(name)
#     # place = (latitude, longitude)

#     try:
#         if (tag == '찌개,전골'):
#             tag_d.append('찌개/전골')
#         elif (tag == '육류,고기'):
#             tag_d.append('육류/고기')
#         elif (tag == '불고기,두루치기'):
#             tag_d.append('불고기/두루치기')
#         elif (tag == '족발,보쌈'):
#             tag_d.append('족발/보쌈')
#         elif (tag == '곱창,막창'):
#             tag_d.append('곱창/막창')
#         elif (tag == '초밥,롤'):
#             tag_d.append('초밥/롤')
#         elif (tag == '해물,생선'):
#             tag_d.append('해물/생선')
#         elif (tag == '게,대게'):
#             tag_d.append('게/대게')
#         elif (tag == '스테이크,립'):
#             tag_d.append('스테이크/립')
#         elif (tag == '돈까스,우동'):
#             tag_d.append('돈까스/우동')
#         elif (tag == '멕시칸,브라질'):
#             tag_d.append('멕시칸/브라질')
#         else:
#             tag_d.append(tag)

#     except Exception as e1:
#         df = df.drop(df.index[i])
#         i = i-1
#         pass

#     i = i+1
#     print(i)

# df['tag'] = tag_d

df.to_json(r'/home/ryujimin/develop/LunchMap/public/data.json', orient = 'records', double_precision=15, force_ascii=False)
# df.to_csv(r'/home/ryujimin/develop/LunchMap/public/data2.csv', sep=',', na_rep='NaN', index = False, encoding="utf-8-sig")