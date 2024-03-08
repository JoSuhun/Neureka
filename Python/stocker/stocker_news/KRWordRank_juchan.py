# -*- coding: utf-8 -*-
from krwordrank.word import KRWordRank
from krwordrank.word import summarize_with_keywords
from konlpy.tag import Okt

# 가정된 기사 내용
text = """
SK·현대차·한화·현대중공업·GS·LS·두산 등 주요 그룹사 오너들은 국제가전박람회(CES)에 총 집결해 자사 부스뿐 아니라 경쟁사 현장을 돌며 미래먹거리 발굴에 집중하고 있다. 

사실 CES를 앞두고 애플이 비전프로 출시계획을 밝히며 국내 기업들에 대한 주목도가 비교적 떨어지긴 했지만 여전히 CES란 무대에 돋보이기 위한 기업과 주요 인사들의 노력이 엿보인다.

이재용 삼성그룹 회장과 구광모 LG그룹 회장은 올해 CES에 참석하지 않았다. 대신 각 사를 대표하는 전문 경영인들이 나서 경쟁하듯 투자 계획을 발표하며 눈길을 끌었다.

삼성전자 한종희 부회장은 9일 CES  2024 현장에서 "삼성의 리더십을 위한 대형 M&A가 올해는 계획이 나올 것으로 희망한다"고 밝혔다.

한 부회장이 CES서 M&A 계획을 발표한 것이 처음은 아니다.

지난해 CES에서 "보안문제로 자세히 말하진 못하지만 (M&A가) 잘 진행되고 있다"며 "삼성이 사업 발전을 위해 인수합병 노력을 하고 있단 걸 알아달라"고 언급했다. 2022년 CES에선 "혼자 걷는 것 보다 M&A가 나은 선택이라면 그렇게 하겠다"며 "조만간 좋은 소식이 나올 것 같다"며 M&A 가능성을 시사하기도 했다.

삼성전자는 최근 인공지능(AI), 디지털헬스, 핀테크, 로봇, 전장 등 다섯 분야 투자에 집중하고 있다. 회사는 최근 3년간 약 260개의 회사에 벤처투자를 진행했다고 밝혔는데, 사실 대규모 M&A로 일컬을만한 투자는 사실상 전무했다. 초대형 M&A는 2016년 하만(Harmann)이 사실상 마지막이었다.

과거 삼성전자의 NXP 인수 혹은 ASML 등에 대한 대규모 투자 가능성이 거론되기도 했지만 현실화하진 못했고, 아직까지 대형 M&A에 대한 기대감만 심어주는 상황이 연출되고 있다.

변수는 남아있다. 삼성을 둘러싼 사법리스크는 아직 해소되지 않은 상황이다. 오는 26일 이재용 회장의 경영권 승계와 관련한 선고를 시작으로 앞으로 수년 간 지루한 재판이 이어질 가능성이 높다. 이 같은 상황을 비쳐볼 때 전문경영인들의 의지대로 연내 대규모 M&A 계획이 실현할 수 있을지는 지켜봐야 할 것으로 보인다. 

이번 CES에선 LG전자도 삼성전자와 경쟁하듯 과감한 투자계획을 발표했다. 

삼성전자 기자간담회 이튿날인 10일, 조주완 LG전자 사장은 "M&A 대상기업에 대해 구체적으로 말할 수는 없지만, 갖지 못한 역량을 확보해야하므로 기업간거래(B2B), 신규사업 영역에 (M&A가) 집중될 것"이라며 "올해 1∼2개 정도 시장에 얘기할 수 있을 것"이라고 밝혔다. 

LG전자는 올해 전략적 자본투자 및 M&A에 2조원, 연구개발(R&D) 4조5000억원, 시설투자 3조5000억원 등 구체적 투자 계획을 제시했다. 주 투자분야는 주로 전장, 냉난방공조(HVAC), 빌트인, 사이니지 등 B2B 사업, 전기차 충전, 로봇 등으로 거론되고 있다.

LG전자가 CES서 대규모 M&A 계획을 밝힌 것은 상당히 오랜만이다. 지난 2019년 조성진 전 LG전자 부회장은 "세계 기술 기업 50여 곳 M&A 검토하고 있다"고 언급한 바 있지만 이번 CES와 같이 구체적인 투자 규모와 시기를 특정하진 않았다.

양사 M&A 계획의 현실성 여부를 떠나 투자자들의 기대감은 상당히 커지고 있는 듯하다. 특히 삼성전자와 LG전자를 비롯해 국내 주요 기업들이 공통적으로 집중할 것으로 예상되는 AI와 로봇 등의 분야에 기관투자자들의 자금이 쏠리는 현상은 점점 더 심화할 조짐도 나타나고 있다.

연초부터 쏟아낸 M&A 기대감이 실망감으로 바뀌지 않기 위해선 삼성과 LG의 실체적인 움직임이 반드시 수반돼야 한다. y

LG전자는 지난해부터 대규모 M&A에 대한 강한 의지를 나타내고는 있지만 실적 무엇보다 재무적 뒷받침이 먼저란 평가다. LG전자는 지난해 7월 오는 2030년 매출 100조원, 연평균 매출 성장률 7%, 영업이익률 7%,  기업가치 멀티플 7배를 달성하겠다고 밝힌바 있다. 다만 지난해 영업이익은 전년 대비 소폭 감소했는데 금융권에선 더딘 수요 회복과 비용증가, 자회사 실적 둔화 등을 이유로 목표주가를 낮추는 모습이 나타나고 있다.

대규모 M&A를 위해선 무엇보다 컨트롤타워의 역할이 중요한데 삼성은 사실상 이같은 조직이 전무하다. 삼성그룹은 과거 미래전략실을 중심으로 삼성전자 및 계열사의 투자과정 전반을 조율했는데 미전실이 사라지고 난 이후 이 역할을 대체할 조직도 인력도 갖추지 못했다는 평가가 나온다. 삼성전자는 지난해 8월 DX부문 직속 '미래기술사무국', 11월  '미래사업기획단', 최근 '비즈니스개발그룹' 등 신사업 개발 조직을 산발적으로 신설하고 있는데 역시 그룹의 대형 M&A를 지휘할 무게감 있는 조직으로 인정받긴 어렵다는 평가다.
"""

from konlpy.tag import Okt

# Okt 형태소 분석기 초기화
okt = Okt()

# 전체 기사 글 예시
article = text  # 앞에서 주어진 가정된 기사 내용을 사용합니다.
article = article.replace('\n', '')

# 1. 띄어쓰기 단위로 나누기
sentences = article.split(".")

# 2. 각 요소의 형태소 분석을 통해 필터링
filtered_phrases = []
for sentence in sentences:
    sentence_filtered = []  # 각 문장별 필터링된 형태소를 저장할 리스트
    words = sentence.split()
    for word in words:
            morphs = okt.pos(word, join=True)
            filtered = [morph.split('/')[0] for morph in morphs if morph.split('/')[1] in ('Noun', 'Alpha', 'Punctuation', 'Modifier')]
            if filtered:
                sentence_filtered.append("".join(filtered))  # 문장별 형태소를 띄어쓰기로 연결하여 추가
    if sentence_filtered:
        sentence_filtered = ' '.join(sentence_filtered)
        filtered_phrases.append(sentence_filtered)  # 각 문장별 형태소 리스트를 filtered_phrases에 추가



# 3. 문장으로 재구성


# KRWordRank 준비
min_count = 1   # 단어의 최소 출현 빈도
max_length = 10  # 단어의 최대 길이
wordrank_extractor = KRWordRank(min_count=min_count, max_length=max_length)

# 4. KRWordRank을 해 중요한 요소를 뽑아낸다

keywords, rank, graph = wordrank_extractor.extract(filtered_phrases, beta=0.9, max_iter=10)
for word, r in sorted(keywords.items(), key=lambda x:x[1], reverse=True)[:5]:
            print('%8s:\t%.4f' % (word, r))

