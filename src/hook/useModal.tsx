import { useState } from "react"

export default () => {
  let [modal, setModal] = useState(false)
  const [editMode, setEditMode] = useState(false)

  let handleModal = (edit_toogle: boolean = false) => {
    setModal(!modal)

    if (edit_toogle) {
      setEditMode(!editMode)
    }
  }

  return { modal, handleModal, editMode, setEditMode }
}
