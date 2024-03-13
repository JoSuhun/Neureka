import csv
import json
import tqdm

# CSV 파일 경로
csv_file_path = 'ssafy_dataset_news_2023.csv'
# JSON 파일 경로
json_file_path = 'ssafy_dataset_news_2023.json'

# CSV 파일을 읽고, 각 행을 dict로 변환하여 list에 저장
data_list = []

try:
    # 'errors='ignore'' 옵션을 사용하여 NULL 문자를 무시하고 파일을 읽습니다.
    with open(csv_file_path, mode='r', encoding='utf-8', errors='ignore') as csv_file:
        csv_reader = csv.DictReader(csv_file, delimiter='|')
        for row in csv_reader:
            data_list.append(row)
except Exception as e:
    print(f"Error reading CSV file: {e}")

# 변환된 데이터를 JSON 파일로 저장
try:
    with open(json_file_path, mode='w', encoding='utf-8') as json_file:
        json.dump(data_list, json_file, ensure_ascii=False, indent=4)
except Exception as e:
    print(f"Error writing JSON file: {e}")

