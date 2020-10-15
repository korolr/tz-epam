import React, { FunctionComponent } from "react"
import useModal from "hook/useModal"
import Modal from "components/modal"

type Context = {
  modal: boolean
  handleModal: (edit_toogle?: boolean) => void
  editMode: boolean
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>
}

let ModalContext = React.createContext<Context>(null)
let { Provider } = ModalContext

const ModalProvider: FunctionComponent = (props) => {
  const { modal, handleModal, editMode, setEditMode } = useModal()
  return (
    <Provider value={{ modal, handleModal, editMode, setEditMode }}>
      <Modal />
      {props.children}
    </Provider>
  )
}

export { ModalContext, ModalProvider }
