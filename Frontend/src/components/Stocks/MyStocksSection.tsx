import { useAtom, useAtomValue } from 'jotai'
import { isUserEmailAtom } from '@src/stores/authAtom'
import { selectedCompanyAtom } from '@src/stores/stockAtom'
import { CompanyType, CompanyLikeType } from '@src/types/CompanyType'
import Tooltip from '@src/common/Tooltip'
import * as m from '@src/components/styles/Stocks/MyStocksSectionStyle'

const MyStocksSection = (props: { data: CompanyLikeType[] }) => {
  const { data } = props
  const userEmail = useAtomValue(isUserEmailAtom) // 유저 이메일
  const [, setSelectedStock] = useAtom(selectedCompanyAtom) // select 한 종목

  const handleClick = (item: CompanyType) => {
    setSelectedStock(item)
  }

  return (
    <m.Container className="myStock">
      <m.Title>MY STOCK</m.Title>
      {userEmail ? (
        <m.Wrap>
          {data && data.length > 0 ? (
            data.map(item => (
              <m.Item
                key={item.company.companyId}
                onClick={() => handleClick(item.company)}
              >
                <div>
                  {item.company.companyName} ({item.company.code})
                </div>
                {item.isSendmail ? (
                  <Tooltip
                    message={'이 기업을 구독중이에요! 구독을 취소하시겠습니까?'}
                  >
                    <m.SubscribingButton />
                  </Tooltip>
                ) : (
                  <Tooltip
                    message={
                      '매일 아침, 이 기업의 요약 기사 메일을 받아보세요!'
                    }
                  >
                    <m.SubscribeButton />
                  </Tooltip>
                )}
              </m.Item>
            ))
          ) : (
            <m.NoneItem>관심 기업을 등록하세요!</m.NoneItem>
          )}
        </m.Wrap>
      ) : (
        <m.NoneItem>로그인이 필요한 서비스입니다.</m.NoneItem>
      )}
    </m.Container>
  )
}

export default MyStocksSection
