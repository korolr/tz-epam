import React, { FunctionComponent } from "react"
import { Link } from "wouter"
import styleEditHeader from "components/EditHeader/style.module.css"

export interface Props {
  handleModal: (edit_toogle?: boolean) => void
  editMode: boolean
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>
}

export const EditHeader: FunctionComponent<Props> = ({
  editMode,
  handleModal,
  setEditMode,
}) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-9"></div>
        <div className="col-xs-3">
          <button
            className={`${styleEditHeader["edit-button"]}`}
            onClick={(e) => (editMode ? handleModal() : setEditMode(!editMode))}
          >
            Edit
          </button>
          {editMode && (
            <Link href={"/edit/add"}>
              <button
                className={`${styleEditHeader["edit-button"]} ${styleEditHeader["edit-button_add"]}`}
              >
                Add
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
