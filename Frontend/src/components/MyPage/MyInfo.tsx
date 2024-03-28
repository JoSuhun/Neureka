import React, { useEffect, useState } from 'react'
import * as m from '@src/components/styles/MyPage/MyInfoStyle'

import EditIcon from '@mui/icons-material/Edit'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useAtom } from 'jotai'
import { isUserAtom } from '@src/stores/authAtom'

type Props = {}

const MyInfo = (props: Props) => {
  const [edit, SetEdit] = useState(false)
  const [user, setUser] = useAtom(isUserAtom)

  const [nickname, setNickname] = useState(user.nickname)
  const [email, setEmail] = useState(user.email)
  const [phone, setPhone] = useState(user.phone)
  const [birth, setBirth] = useState(user.birth)
  const [gender, setGender] = useState(user.gender)

  const goEdit = () => {
    SetEdit(!edit)
    if (edit) {
      setUser({
        nickname: nickname,
        email: email,
        phone: phone,
        birth: birth,
        gender: gender,
      })
    }
  }

  return (
    <m.InfoBox>
      <m.Category>
        <m.Title>이름</m.Title>
        <m.Content
          value={nickname as string}
          onChange={event => {
            setNickname(event.target.value as string)
          }}
          disabled={edit ? false : true}
          className={edit ? 'edit' : ''}
        />
      </m.Category>

      <m.Category>
        <m.Title>이메일</m.Title>
        <m.Content
          value={email as string}
          onChange={event => {
            setEmail(event.target.value as string)
          }}
          disabled={edit ? false : true}
          className={edit ? 'edit' : ''}
        />
      </m.Category>

      <m.Category>
        <m.Title>전화번호</m.Title>
        <m.Content
          value={phone as string}
          onChange={event => {
            setPhone(event.target.value as string)
          }}
          disabled={edit ? false : true}
          className={edit ? 'edit' : ''}
        />
      </m.Category>

      <m.Category>
        <m.Title>생년월일</m.Title>
        <m.Content
          value={birth as string}
          onChange={event => {
            setBirth(event.target.value as string)
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
              setGender(true)
            }}
            disabled={edit ? false : true}
            className={edit ? 'edit' : ''}
            type="radio"
            name="gender"
            checked={gender ? true : false}
          />
        </m.GenderLabel>
        <m.GenderLabel className="female">
          여
          <m.Content
            value="여"
            onChange={event => {
              setGender(false)
            }}
            disabled={edit ? false : true}
            className={edit ? 'edit' : ''}
            type="radio"
            name="gender"
            checked={gender ? false : true}
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
