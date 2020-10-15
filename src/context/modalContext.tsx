import React, { FunctionComponent } from "react"
import useModal from "hook/useModal"
import Modal from "components/modal"

let ModalContext = React.createContext(null)
let { Provider } = ModalContext

const ModalProvider: FunctionComponent = (props) => {
  const { modal, handleModal, modalContent } = useModal()
  return (
    <Provider value={{ modal, handleModal, modalContent }}>
      <Modal />
      {props.children}
    </Provider>
  )
}

export { ModalContext, ModalProvider }
