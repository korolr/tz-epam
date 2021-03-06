import React, { FunctionComponent, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useLocation } from "wouter"
import DatePicker from "react-datepicker"

import { Article } from "reducers/articles"
import { Error } from "components/Error"
import { toBase64 } from "../../util"
import styleEdit from "components/Edit/style.module.css"
import styleArticle from "components/Articles/style.module.css"

export interface Props {
  articles: Array<Article>
  fetchArticles: (number?: number) => void
  addArticle?: (data: Article) => void
  editArticle?: (id: number, data: Article) => void
  loadArticle?: () => void

  status?: string | null
  text?: string | null
}

export const Edit: FunctionComponent<Props> = ({
  articles,
  addArticle,
  fetchArticles,
  editArticle,
  loadArticle,
  text,
}) => {
  const { register, handleSubmit, errors } = useForm()
  const [, setLocation] = useLocation()
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [imageBase, setImageBase] = useState("")

  const onSubmit = (data: { title: string; priview: string; text: string }) => {
    if (text === "add") {
      addArticle({
        ...data,
        id: article[0].id,
        image: imageBase,
        date: startDate.toLocaleDateString("ru-RU"),
        visible: true,
        viewed: false,
      })
      fetchArticles()
      setLocation("/article/" + article[0].id)
    } else {
      let id = parseInt(text)
      editArticle(id, {
        ...data,
        id: id,
        image: imageBase,
        date: startDate.toLocaleDateString("ru-RU"),
        visible: true,
        viewed: false,
      })
      fetchArticles()
      setLocation("/article/" + id)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    toBase64(e.target.files[0]).then((data: string) => {
      setImageBase(data)
    })
  }

  const article = articles.filter((article) => article.id === parseInt(text))

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    article.length !== 0 &&
      (setStartDate(
        new Date(
          article[0].date
            .split(".")
            .map((a) => parseInt(a))
            .reverse()
            .join()
        )
      ),
      setImageBase(article[0].image))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    return () => {
      loadArticle()
    }
  }, [loadArticle])

  if (text === "add") {
    article.push({
      id: articles.length + 1,
      title: "Title article",
      image: imageBase,
      date: startDate.toLocaleDateString("ru-RU"),
      visible: true,
      viewed: false,
      priview: "Priview text",
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    })
  } else if (Number.isNaN(parseInt(text))) {
    return <Error>Bad Request</Error>
  } else if (article.length === 0) {
    return <div className="container">Not Found Article</div>
  }

  return (
    <div className="container">
      <div className="row">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`${styleEdit["edit-input"]}`}
        >
          <div>
            <b>Title:</b>
            <br />
            <input
              name="title"
              defaultValue={article[0].title}
              ref={register({ required: true })}
              className={`${styleEdit["edit-input"]}`}
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
              className={`${styleArticle["article-img-edit"]}`}
            />
            <input
              name="image-select"
              type="file"
              className={`${styleEdit["edit-file"]}`}
              onChange={handleChange}
            />
          </p>
          <br />

          <div>
            <b>Priview:</b>
            <textarea
              name="priview"
              defaultValue={article[0].priview}
              ref={register({ required: true })}
              className={`${styleEdit["edit-input"]} ${styleEdit["edit-input_area"]}`}
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
              className={`${styleEdit["edit-input"]} ${styleEdit["edit-input_area"]}`}
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
