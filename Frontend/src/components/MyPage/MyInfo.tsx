import React, { useEffect, useState } from 'react'
import * as m from '@src/components/styles/MyPage/MyInfoStyle'

import EditIcon from '@mui/icons-material/Edit'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useAtom, useAtomValue } from 'jotai'
import { isUserAtom } from '@src/stores/authAtom'
import { selectAtom } from 'jotai/utils'

type Props = {}

const MyInfo = (props: Props) => {
  const [edit, SetEdit] = useState(false)
  const [user, setUser] = useAtom(isUserAtom)

  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [birth, setBirth] = useState('')
  const [gender, setGender] = useState(false)

  const goSave = () => {
    SetEdit(!edit)
    setUser({
      nickname: nickname,
      email: email,
      phone: phone,
      birth: birth,
      gender: gender,
    })
  }

  useEffect(() => {
    setNickname(user.nickname as string)
    setEmail(user.email as string)
    setPhone(user.phone as string)
    setBirth(user.birth as string)
    setGender(user.gender as boolean)
  }, [user])

  const phoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    const onlyNumber = value.replace(/[^0-9]/g, '')
    setPhone(onlyNumber)
  }

  useEffect(() => {
    if (phone?.length === 11) {
      setPhone(phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'))
    }
  }, [phone])

  return (
    <m.InfoBox>
      <m.Category>
        <m.Title>이름</m.Title>
        <m.Content
          value={nickname}
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
          value={email}
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
          value={phone}
          onChange={phoneChange}
          disabled={edit ? false : true}
          className={edit ? 'edit' : ''}
          maxLength={11}
        />
      </m.Category>

      <m.Category>
        <m.Title>생년월일</m.Title>
        <m.Content
          value={birth}
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
      {edit ? (
        <m.Btn onClick={goSave} className="save">
          <span>저장</span>
          <CheckCircleIcon />
        </m.Btn>
      ) : (
        <m.Btn onClick={() => SetEdit(!edit)} className="edit">
          <span>수정</span>
          <EditIcon />
        </m.Btn>
      )}
    </m.InfoBox>
  )
}

export default MyInfo
