from django.http import JsonResponse, HttpResponse
import pandas as pd
import FinanceDataReader as fdr
import json


def fetch_and_save_krx_data(request):
    # KRX 데이터를 DataFrame으로 가져옵니다.
    df_krx = fdr.StockListing("KRX")

    # DataFrame을 JSON 형식의 문자열로 변환합니다.
    json_data = df_krx.to_json(orient='records', force_ascii=False)

    # 변환된 JSON 문자열을 보기 좋게 포맷팅합니다.
    formatted_json_data = json.dumps(json.loads(json_data), ensure_ascii=False, indent=4)

    # 포맷팅된 JSON 문자열을 HttpResponse 객체를 사용하여 반환합니다.
    # content_type을 'application/json'으로 설정하여 한글이 깨지지 않도록 합니다.
    return HttpResponse(formatted_json_data, content_type="application/json; charset=utf-8")

