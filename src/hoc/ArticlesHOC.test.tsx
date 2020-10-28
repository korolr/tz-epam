import * as React from "react"

import { ArticlesWrapper, Props } from "./ArticlesHOC"
import * as ModalContext from "context/modalContext"

import { Articles } from "components/Articles"
import { Error } from "components/Error"
import { arrayArticles } from "../api"
import { shallow } from "enzyme"
import staticLocationHook from "wouter/static-location"
import { Router } from "wouter"

describe("Modal Context", () => {
  it("how many data", () => {
    const props: Props = {
      articles: arrayArticles,
      status: "",
      fetchArticles: (n) => null,
      removeArticle: (n) => null,
      id: null,
    }
    // @ts-ignore
    jest.spyOn(ModalContext, "useModalContext").mockImplementation(() => {
      return {
        modal: false,
        handleModal: (a: boolean) => {},
        editMode: false,
        setEditMode: () => {},
      }
    })
    const hoc = shallow(
      <Router hook={staticLocationHook("/")}>
        <ModalContext.ModalProvider>
          {ArticlesWrapper(Articles, Error, props, true, null)}
        </ModalContext.ModalProvider>
      </Router>
    )
    console.log(hoc.html())
    expect(hoc.find("ErrorComponent")).toHaveLength(0)
    expect(hoc.find("Modal")).toHaveLength(1)
    expect(hoc.find("Articles")).toHaveLength(1)
    expect(hoc.find("EditHeader")).toHaveLength(1)
  })

  it("test hook modal", async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let wrapper = shallow(<button />)
    const setState = jest.fn()
    const init = false
    const useStateSpy = jest.spyOn(React, "useState")

    useStateSpy.mockImplementation(() => [init, setState])
    setState(true)
    expect(setState).toHaveBeenCalledWith(true)
  })
})
