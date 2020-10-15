import { useState } from "react"

export default () => {
  let [modal, setModal] = useState(false)
  const [editMode, setEditMode] = useState(false)

  let handleModal = (edit_toogle: boolean = false) => {
    document.body.style.overflow = "hidden"
    setModal(!modal)
    console.log("test")
    if (modal) {
      document.body.style.overflow = "visible"
    }
    if (edit_toogle) {
      setEditMode(!editMode)
    }
  }

  return { modal, handleModal, editMode, setEditMode }
}
