from selenium import webdriver
from haversine import haversine
import pandas as pd
import numpy as np
import time

df = pd.read_csv('data.csv', encoding='utf-8', sep=',')
df = df.replace('"', '')

df.columns = ['name', 'cate_1', 'cate_2', 'cate_3', 'area', 'address', 'lon', 'lat', 'rank', 'distance']

i = 1

for idx, obj in df.iterrows():

    distance = obj['distance']

    if distance > 1200:
        df = df.drop(df.index[i])
        i = i-1

    i = i+1

df.to_csv(r'/home/ryujimin/develop/LunchMap/public/data2.csv', sep=',', na_rep='NaN', index = False, encoding="utf-8-sig")