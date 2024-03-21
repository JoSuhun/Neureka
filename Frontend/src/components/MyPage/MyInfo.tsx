import React, { useState } from 'react'
import * as m from '@src/components/styles/MyPage/MyInfoStyle'

import EditIcon from '@mui/icons-material/Edit'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

type Props = {}

const MyInfo = (props: Props) => {
  const [edit, SetEdit] = useState(false)

  const [name, setName] = useState('USER99')
  const [email, setEmail] = useState('USER99@ssafy.com')
  const [phone, setPhone] = useState('010-2000-2000')
  const [birth, setBirth] = useState('1997-07-11')
  const [gender, setGender] = useState('m')

  const goEdit = () => {
    SetEdit(!edit)
  }

  return (
    <m.InfoBox>
      <m.Category>
        <m.Title>이름</m.Title>
        <m.Content
          value={name}
          onChange={event => {
            setName(event.target.value)
          }}
          disabled={edit ? false : true}
          className={edit ? 'edit' : ''}
        />
      </m.Category>

      <m.Category>
        <m.Title>이메일</m.Title>
        <m.Content
          value={email}
          onChange={event => {
            setEmail(event.target.value)
          }}
          disabled={edit ? false : true}
          className={edit ? 'edit' : ''}
        />
      </m.Category>

      <m.Category>
        <m.Title>전화번호</m.Title>
        <m.Content
          value={phone}
          onChange={event => {
            setPhone(event.target.value)
          }}
          disabled={edit ? false : true}
          className={edit ? 'edit' : ''}
        />
      </m.Category>

      <m.Category>
        <m.Title>생년월일</m.Title>
        <m.Content
          value={birth}
          onChange={event => {
            setBirth(event.target.value)
          }}
          disabled={edit ? false : true}
          className={edit ? 'edit' : ''}
          type="date"
        />
      </m.Category>

      <m.Category>
        <m.Title>성별</m.Title>
        <m.GenderLabel>
          남
          <m.Content
            value="남"
            onChange={event => {
              setGender('m')
            }}
            disabled={edit ? false : true}
            className={edit ? 'edit' : ''}
            type="radio"
            name="gender"
            checked={gender == 'm' ? true : false}
          />
        </m.GenderLabel>
        <m.GenderLabel className="female">
          여
          <m.Content
            value="여"
            onChange={event => {
              setGender('f')
            }}
            disabled={edit ? false : true}
            className={edit ? 'edit' : ''}
            type="radio"
            name="gender"
            checked={gender == 'f' ? true : false}
          />
        </m.GenderLabel>
      </m.Category>
      <m.Btn onClick={goEdit} className={!edit ? 'edit' : 'save'}>
        {!edit ? <span>수정</span> : <span>저장</span>}
        {!edit ? <EditIcon /> : <CheckCircleIcon />}
      </m.Btn>
    </m.InfoBox>
  )
}

export default MyInfo
