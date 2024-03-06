import React from 'react'
import Modal from '@mui/material/Modal'
import * as m from '../styles/Auth/AuthModalStyle'

import kakago from '/image/kakaotalk.png'
import google from '/image/google.png'

type Props = {
  modalOpen: boolean
  handleModal: () => void
}

const AuthModal = ({ modalOpen, handleModal }: Props) => {
  return (
    <>
      <Modal open={modalOpen} onClose={handleModal}>
        <m.ModalBox>
          <m.ModalTitle>Login</m.ModalTitle>
          <m.Modalcontent>
            <m.LoginSelect>
              <m.LoginIcon src={kakago} alt="" />
              카카오톡으로 시작하기
            </m.LoginSelect>
            <m.LoginSelect>
              <m.LoginIcon src={google} alt="" />
              구글로 시작하기
            </m.LoginSelect>
          </m.Modalcontent>
        </m.ModalBox>
      </Modal>
    </>
  )
}

export default AuthModal
