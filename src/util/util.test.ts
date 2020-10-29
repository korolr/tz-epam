import * as t from "./"

it("compose(): test", async () => {
  expect(
    t.compose(
      (val) => `1<${val}>`,
      (val) => `2<${val}>`,
      (val) => `3<${val}>`
    )("hello")
  ).toEqual("1<2<3<hello>>>")
})
