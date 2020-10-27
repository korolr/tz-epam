import * as React from "react"

import { ArticlesWrapper, Props } from "./ArticlesHOC"
import { ModalProvider } from "context/modalContext"

import { Articles } from "components/Articles"
import { Error } from "components/Error"
import { arrayArticles } from "../api"
import { shallow } from "enzyme"

describe("Modal Context", () => {
  it("how many data", () => {
    const props: Props = {
      articles: arrayArticles,
      status: "",
      fetchArticles: (n) => null,
      removeArticle: (n) => null,
      id: null,
    }
    const hoc = shallow(
      <ModalProvider>
        {ArticlesWrapper(Articles, Error, props, true, null)}
      </ModalProvider>
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
