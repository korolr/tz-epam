import React, { FunctionComponent } from "react"
import { Link } from "wouter"

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
            className="edit-button"
            onClick={(e) => (editMode ? handleModal() : setEditMode(!editMode))}
          >
            Edit
          </button>
          {editMode && (
            <Link href={"/edit/add"}>
              <button className="edit-button edit-button_add">Add</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
