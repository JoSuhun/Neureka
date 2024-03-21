import React from 'react'
import { useAtom } from 'jotai'
import { modalOpenAtom } from '@src/stores/authModalAtom'
import Modal from 'react-modal'
import * as m from '@src/common/styles/Auth/AuthModalStyle'
import LoginSection from './LoginSection'
import SignupSection from './SignupSection'

type Props = {}

const AuthModal = (props: Props) => {
  const [isOpen, setIsOpen] = useAtom(modalOpenAtom)

  const openModal = () => {
    setIsOpen(true)
  }
  const closeModal = () => {
    setIsOpen(false)
  }
  const afterOpenModal = () => {}

  return (
    <>
      <m.Global />
      <m.MyModal
        isOpen={isOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <m.Wrapper>
          <m.CloseBtn onClick={closeModal} />
          <LoginSection />

          <m.GoSignup>아직 회원이 아니신가요?</m.GoSignup>

          <SignupSection />
        </m.Wrapper>
      </m.MyModal>
    </>
  )
}

export default AuthModal
