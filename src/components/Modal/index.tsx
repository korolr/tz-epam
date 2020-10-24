import React, { useContext, useEffect } from "react"
import ReactDOM from "react-dom"
import { ModalContext } from "context/modalContext"
import styleModal from "components/Modal/style.module.css"

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
      if (e.target.className === styleModal["modal-dialog"]) {
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
      <div id="openModal" className={`${styleModal["modal"]}`}>
        <div className={`${styleModal["modal-dialog"]}`}>
          <div className={`${styleModal["modal-content"]}`}>
            <div className={`${styleModal["modal-header"]}`}>
              <h3 className={`${styleModal["modal-title"]}`}>Модальное окно</h3>
            </div>
            <div className={`${styleModal["modal-body"]}`}>
              <p>Закрыть редактирование?</p>
              <div className={`${styleModal["modal-button"]}`}>
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
