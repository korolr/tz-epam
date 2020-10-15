import React, { useContext } from "react"
import ReactDOM from "react-dom"
import { ModalContext } from "context/modalContext"

const Modal = () => {
  let { handleModal, modal } = useContext(ModalContext)
  if (modal) {
    return ReactDOM.createPortal(
      <div id="openModal" className="modal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Название</h3>
            </div>
            <div className="modal-body">
              <p>Content</p>
              <button onClick={() => handleModal()}>×</button>
              <button onClick={() => handleModal(true)}>Done</button>
            </div>
          </div>
        </div>
      </div>,
      document.querySelector("#modal-root")
    )
  } else return null
}

export default Modal
