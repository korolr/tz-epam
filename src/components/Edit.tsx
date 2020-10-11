import React, { FunctionComponent, useEffect } from "react"
import { useForm } from "react-hook-form"

import { Article } from "../reducers/articles"
import { Error } from "./Error"
import { toBase64 } from "../util"
import { editArticle } from "../actions/articlesActions"

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
  const { register, handleSubmit, errors, setValue } = useForm()
  const onSubmit = (data: any) => {
    editArticle(parseInt(text), {
      ...data,
      id: parseInt(text),
      visible: true,
      viewed: false,
    })
  }

  const article = articles.filter((article) => article.id === parseInt(text))

  const handleChange = (e: any) => {
    toBase64(e.target.files[0]).then((data) => {
      setValue("image", data)
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            name="title"
            defaultValue={article[0].title}
            ref={register({ required: true })}
          />
          {errors.title && <span>This field is required</span>}
          <br />
          <input
            name="date"
            defaultValue={article[0].date}
            ref={register({ required: true })}
          />
          {errors.date && <span>This field is required</span>}
          <br />
          <input
            name="image"
            defaultValue={article[0].image}
            ref={register({ required: true })}
          />
          <input name="image-select" type="file" onChange={handleChange} />
          {errors.image && <span>This field is required</span>}
          <br />
          <input
            name="priview"
            defaultValue={article[0].priview}
            ref={register({ required: true })}
          />
          {errors.priview && <span>This field is required</span>}
          <br />
          <input
            name="text"
            defaultValue={article[0].text}
            ref={register({ required: true })}
          />
          {errors.text && <span>This field is required</span>}
          <br />
          <input type="submit" />
        </form>
      </div>{" "}
    </div>
  )
}
