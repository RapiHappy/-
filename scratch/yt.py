import urllib.request
import re

def get_ids(query):
    url = f"https://www.youtube.com/results?search_query={urllib.parse.quote(query)}"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        html = urllib.request.urlopen(req).read().decode('utf-8')
        video_ids = re.findall(r'"videoId":"([^"]{11})"', html)
        return list(dict.fromkeys(video_ids))[:2]
    except Exception as e:
        return [str(e)]

print("Inf 1:", get_ids("EXtremum информатика Задание 1 ЕГЭ 2026"))
print("Inf 2:", get_ids("EXtremum информатика Задание 2 ЕГЭ 2026"))
print("Rus:", get_ids("Умскул русский ЕГЭ орфография"))
print("Math:", get_ids("Школково математика ЕГЭ параметры"))
