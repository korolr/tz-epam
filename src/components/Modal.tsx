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
              <h3 className="modal-title">Модальное окно</h3>
            </div>
            <div className="modal-body">
              <p>Закрыть редактирование?</p>
              <div className="modal-button">
                <button onClick={() => handleModal()}>Продолжить</button>
                <button onClick={() => handleModal(true)}>Закрыть</button>
              </div>
            </div>
          </div>
        </div>
      </div>,
      document.querySelector("#modal-root")
    )
  } else return null
}

export default Modal
