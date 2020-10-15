import React from "react"

export default () => {
  let [modal, setModal] = React.useState(false)
  let [modalContent, setModalContent] = React.useState("I'm the Modal Content")

  let handleModal = (content: boolean | string = false) => {
    document.body.style.overflow = "hidden"
    setModal(!modal)
    console.log("test")
    if (typeof content === "string") {
      document.body.style.overflow = "visible"
      setModalContent(content)
    }
  }

  return { modal, handleModal, modalContent }
}
