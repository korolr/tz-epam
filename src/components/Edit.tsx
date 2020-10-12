import React, { FunctionComponent, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useLocation } from "wouter"

import { Article } from "../reducers/articles"
import { Error } from "./Error"
import { toBase64 } from "../util"
import DatePicker from "react-datepicker"

export interface Props {
  articles: Array<Article>
  fetchArticles: (number?: number) => void
  addArticle?: (data: Article) => void
  editArticle?: (id: number, data: Article) => void
  status?: string | null
  text?: string | null
}

export const Edit: FunctionComponent<Props> = ({
  articles,
  addArticle,
  editArticle,
  text,
}) => {
  const { register, handleSubmit, errors } = useForm()
  const [, setLocation] = useLocation()
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [imageBase, setImageBase] = useState("")

  const onSubmit = (data: { title: string; priview: string; text: string }) => {
    let id = parseInt(text)
    editArticle(id, {
      ...data,
      id: id,
      image: imageBase,
      date: startDate.toLocaleDateString("ru-RU"),
      visible: true,
      viewed: false,
    })
    setLocation("/article/" + id)
  }

  const article = articles.filter((article) => article.id === parseInt(text))

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    article.length >= 1 &&
      (setStartDate(new Date(article[0].date)), setImageBase(article[0].image))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    toBase64(e.target.files[0]).then((data: string) => {
      setImageBase(data)
    })
  }

  if (article.length === 0) {
    return <div className="container">Not Found Article</div>
  }

  if (text !== "add" && Number.isNaN(parseInt(text))) {
    return <Error>Bad Request</Error>
  }

  return (
    <div className="container">
      <div className="row">
        <form onSubmit={handleSubmit(onSubmit)} className="edit-input">
          <div>
            <b>Title:</b>
            <br />
            <input
              name="title"
              defaultValue={article[0].title}
              ref={register({ required: true })}
              className="edit-input"
            />
          </div>
          {errors.title && <span>This field is required</span>}
          <br />
          <div>
            <b>Date:</b>
            <br />
            <DatePicker
              name="date"
              selected={startDate}
              dateFormat="dd/MM/yyyy"
              popperPlacement="top-end"
              // Плохие биндинги воообще невозможно типизировать под кейс с кастомным инпутом
              // @ts-ignore TODO Сделать пуллреквест в биндинги*/
              onChange={(date) => setStartDate(date)}
            />
          </div>
          <br />
          <p>
            <b>Image:</b>
            <br />
            <img
              src={imageBase}
              alt="article_img"
              className="article-img-post"
            />
            <input
              name="image-select"
              type="file"
              className="edit-file"
              onChange={handleChange}
            />
          </p>
          <br />
          <div>
            <b>Priview:</b>
            <br />
            <textarea
              name="priview"
              defaultValue={article[0].priview}
              ref={register({ required: true })}
              className="edit-input edit-input_area"
            />
            {errors.priview && <span>This field is required</span>}
          </div>
          <br />
          <div>
            <b>Text:</b>
            <br />
            <textarea
              name="text"
              defaultValue={article[0].text}
              ref={register({ required: true })}
              className="edit-input edit-input_area"
            />
            {errors.text && <span>This field is required</span>}
          </div>
          <br />
          <input type="submit" value={text === "add" ? "Add" : "Edit"} />
        </form>
      </div>{" "}
    </div>
  )
}
