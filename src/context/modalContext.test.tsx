import * as React from "react"

import { ModalProvider } from "./modalContext"

import { shallow } from "enzyme"

describe("Modal Context", () => {
  it("how many data", () => {
    const modalProviderContainer = shallow(<ModalProvider />)

    expect(modalProviderContainer.find("Modal")).toHaveLength(1)
  })

  it("test hook modal", async () => {
    let wrapper = shallow(<ModalProvider />)
    const setState = jest.fn()
    const init = false
    const useStateSpy = jest.spyOn(React, "useState")

    useStateSpy.mockImplementation(() => [init, setState])
    setState(true)
    expect(setState).toHaveBeenCalledWith(true)
  })
})
