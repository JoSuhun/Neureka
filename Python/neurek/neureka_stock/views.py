from django.http import JsonResponse, HttpResponse
import pandas as pd
import FinanceDataReader as fdr
import json


def fetch_and_save_krx_data(request):
    # GET 요청으로부터 'code' 파라미터 값을 가져옵니다.
    stock_code = request.GET.get('code', '')  # 기본값으로 빈 문자열을 설정할 수 있습니다.

    # 유효한 주식 코드가 제공되었는지 확인합니다.
    if not stock_code:
        return HttpResponse("Stock code is required. 코드 제대로 주라고 아.", status=400)

    stock_code = str(stock_code).zfill(6)

    # KRX 데이터를 DataFrame으로 가져옵니다.
    df_krx = fdr.DataReader(stock_code)

    
    # DataFrame 컬럼 이름을 모두 소문자로 변경
    df_krx.columns = [col.lower() for col in df_krx.columns]

    df_krx = df_krx.tail(3650)
    # 'Date' 인덱스를 일반 열로 변환하고 날짜 형식을 'YYYY-MM-DD'로 변경합니다.
    df_krx.reset_index(inplace=True)
    df_krx['Date'] = df_krx['Date'].dt.strftime('%Y-%m-%d')  # 이 부분은 'Date'가 이미 소문자로 변경되었으므로 수정할 필요가 없습니다.
    
    # DataFrame을 JSON 형식의 문자열로 변환합니다.
    json_data = df_krx.to_json(orient='records', force_ascii=False)

    # 변환된 JSON 문자열을 보기 좋게 포맷팅합니다.
    formatted_json_data = json.dumps(json.loads(json_data), ensure_ascii=False, indent=4)

    # 포맷팅된 JSON 문자열을 HttpResponse 객체를 사용하여 반환합니다.
    return HttpResponse(formatted_json_data, content_type="application/json; charset=utf-8")