import React, { FunctionComponent, useEffect } from "react"
import { useForm } from "react-hook-form"

import { Article } from "../reducers/articles"

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
  const { register, handleSubmit, watch, errors } = useForm()
  const onSubmit = (data: any) => console.log(data)

  console.log(watch("example")) // watch input value by passing the name of it
  if (text !== "add") {
    const article = articles.filter((article) => article.id === parseInt(text))

    if (article.length === 0) {
      return <div className="container">Not Found Article</div>
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input name="example" defaultValue="test" ref={register} />

      {/* include validation with required or other standard HTML validation rules */}
      <input name="exampleRequired" ref={register({ required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}

      <input type="submit" />
    </form>
  )
}
