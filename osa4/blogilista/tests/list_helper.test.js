const listHelper = require('../utils/list_helper')

test('dummy return one', () => {
  const blogs = []
  expect(listHelper.dummy(blogs)).toBe(1)
})