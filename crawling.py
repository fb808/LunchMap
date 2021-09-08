from selenium import webdriver
import time
import json

with open('./public/tradingArea.json') as f:
    json_object = json.load(f)

driver = webdriver.Chrome("chromedriver")

for obj in [json_object[0], json_object[1], json_object[2], json_object[3], json_object[4], json_object[5]]:
    title = obj['상호명']
    if obj['법정동코드'] == '1168010500':
        title = '삼성동 ' + obj['상호명']
    elif obj['법정동코드'] == '1168010600':
        title = '대치동 ' + obj['상호명']
    print(title)

    try:
        kakao_map_search_url = f"https://map.kakao.com/?q={title}"
        driver.get(kakao_map_search_url)
        time.sleep(1)

        rate = driver.find_element_by_xpath("/html/body/div[5]/div[2]/div[1]/div[7]/div[5]/ul/li[1]/div[4]/span[1]/em").text

        print("평점 " + str(rate))

    except Exception as e1:
        print(e1)
        print("정보 없음")
        pass
    