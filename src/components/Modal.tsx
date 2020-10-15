import React, { useContext, useEffect } from "react"
import ReactDOM from "react-dom"
import { ModalContext } from "context/modalContext"

const Modal = () => {
  let { handleModal, modal } = useContext(ModalContext)

  useEffect(() => {
    const escapeEvent = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Esc") {
        e.preventDefault()
        handleModal()
      }
    }
    const clickOutside = (e: MouseEvent) => {
      // @ts-ignore
      if (e.target.className === "modal-dialog") {
        handleModal()
      }
    }
    if (modal) {
      document.body.style.overflow = "hidden"
      window.addEventListener("keyup", escapeEvent, true)
      document
        .getElementById("modal-root")
        .addEventListener("click", clickOutside)
    } else {
      document.body.style.overflow = "visible"
      window.removeEventListener("keyup", escapeEvent)
      document
        .getElementById("modal-root")
        .removeEventListener("click", clickOutside)
    }
  }, [handleModal, modal])

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
