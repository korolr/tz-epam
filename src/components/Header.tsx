import React, { FunctionComponent, useState, forwardRef } from "react"
import { Link, useLocation } from "wouter"
import DatePicker from "react-datepicker"

import { Article } from "../reducers/articles"

export interface PropsInput {
  value: string
  onClick: (e: React.MouseEvent<HTMLInputElement>) => void
}

export const Header: FunctionComponent = () => {
  const [searchText, setSearchText] = useState("")
  const [, setLocation] = useLocation()
  const [startDate, setStartDate] = useState<Date>(new Date())

  const CustomInput = (
    props: PropsInput,
    ref: React.RefObject<HTMLButtonElement>
  ) => {
    return (
      <button className="header-searchDate-button" onClick={props.onClick}>
        Date
      </button>
    )
  }

  const changeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    let timestamp = Date.parse(e.target.value)

    if (isNaN(timestamp) === false) {
      return setStartDate(new Date(e.target.value))
    }
  }

  // ref for lib (need ref or class component)
  const CustomInputRef = forwardRef(CustomInput)

  const keyPressSearchText = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchText("")
      setLocation("/search/" + searchText)
    }
  }

  const keyPressSearchDate = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setStartDate(new Date())
      setLocation("/search/" + startDate.toLocaleDateString("ru-RU"))
    }
  }
  return (
    <>
      <div className="container">
        <div className="row header">
          <div className="col-xs-4">
            <input
              type="text"
              name="Search"
              className="header-searchText"
              onChange={(e) => setSearchText(e.target.value)}
              onKeyPress={keyPressSearchText}
            />
          </div>
          <div className="col-xs-4 header-name">
            <Link href="/">
              <p>Blog</p>
            </Link>
          </div>
          <div className="col-xs-1"></div>
          <div className="col-xs-3 header-searchDate">
            <input
              type="text"
              name="Search"
              className="header-searchDate-input"
              value={startDate.toLocaleDateString("ru-RU")}
              onChange={changeDate}
              onKeyPress={keyPressSearchDate}
            />
            <DatePicker
              selected={startDate}
              dateFormat="dd/MM/yyyy"
              popperPlacement="top-end"
              // Плохие биндинги воообще невозможно типизировать под кейс с кастомным инпутом
              // @ts-ignore TODO Сделать пуллреквест в биндинги*/
              onChange={(date) => setStartDate(date)}
              /*
            // @ts-ignore TODO Сделать пуллреквест в биндинги*/
              customInput={<CustomInputRef />}
            />
          </div>
        </div>
      </div>
      <br />
    </>
  )
}
