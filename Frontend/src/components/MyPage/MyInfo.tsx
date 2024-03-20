import React, { useState } from 'react'
import * as m from '@src/components/styles/MyPage/MyInfoStyle'

type Props = {}

const MyInfo = (props: Props) => {
  const [name, setName] = useState('USER99')
  const [email, setEmail] = useState('USER99@ssafy.com')
  const [phone, setPhone] = useState('010-2000-2000')
  const [birth, setBirth] = useState(0)
  const [gender, setGender] = useState('w')

  return (
    <m.InfoBox>
      <m.Category>
        <m.Title>이름</m.Title>
        <m.Content value={name} />
        <m.EditBtn />
      </m.Category>

      <m.Category>
        <m.Title>이메일</m.Title>
        <m.Content value={email} />
        <m.EditBtn />
      </m.Category>

      <m.Category>
        <m.Title>전화번호</m.Title>
        <m.Content value={phone} />
        <m.EditBtn />
      </m.Category>

      <m.Category>
        <m.Title>생년월일</m.Title>
        <m.Content value={birth} />
        <m.EditBtn />
      </m.Category>

      <m.Category>
        <m.Title>성별</m.Title>
        <m.Content value={gender} />
        <m.EditBtn />
      </m.Category>
    </m.InfoBox>
  )
}

export default MyInfo
