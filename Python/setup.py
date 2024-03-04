## 설정 작성해야함
# name - 해당 파이썬 패키지의 이름
# version - 해당 패키지의 배포 버전
# description (한줄) / long_description (README.md) - 패키지에 대한 설명
# packages - 프로젝트에 포함되는 패키지 리스트 (find_packages 함수로 __init__.py가 포함 된 모든 폴더 탐색)
# install_requires - 해당 패키지를 설치할 때 필요한 패키지 목록 (requirements.txt 활용)
# setup_requires - python setup.py를 실행할때 먼저 설치되어 있어야 하는 패키지 목록 (즉, 빌드에 필요한 패키지 목록)
# tests_require - 테스트에 사용하는 패키지 목록
# python_requires - 해당 패키지를 실행하기 위해 필요한 파이썬의 최소 버전
# entry_points - 해당 패키지 설치 후 쉘 (Shell) 에서 실행 가능한 명령어와 실행할 함수 지정
# classifiers - PyPi (또는 사설 PyPi)에 등록될 메타 데이터를 설정한다. (실행 환경, 버전, GUI 여부 등)