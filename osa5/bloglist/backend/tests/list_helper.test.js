const helper = require('./test_helper')
const listHelper = require('../utils/list_helper')

test('dummy return one', () => {
  const blogs = []
  expect(listHelper.dummy(blogs)).toBe(1)
})

describe('total likes', () => {

  test('when list has only one blog equals the likes of that', () => {
    expect(listHelper.totalLikes(helper.listWithOneBlog)).toBe(7)
  })

  test('when list has many blogs equals the sum of all likes', () => {
    expect(listHelper.totalLikes(helper.listWithManyBlogs)).toBe(36)
  })
})

describe('most likes', () => {

  test('when list has only one blog return the title, author and number of likes of the most like blog in an object', () => {
    expect(listHelper.favoriteBlog(helper.listWithOneBlog)).toEqual({
      title: 'React patterns',
      author: 'Michael Chan',
      likes: 7,
    })
  })

  test('when list has many blogs return the title, author and number of likes of the most like blog in an object', () => {
    expect(listHelper.favoriteBlog(helper.listWithManyBlogs)).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    })

  })
})

describe('most blogs', () => {

  test('when list has only one blog, return the author of that blog with number of blogs set to 1 in an object', () => {
    expect(listHelper.mostBlogs(helper.listWithOneBlog)).toEqual({
      author: 'Michael Chan',
      blogs: 1
    })
  })

  test('when list has many blogs, return the author and number of blogs of the author with most blogs in an object', () => {
    expect(listHelper.mostBlogs(helper.listWithManyBlogs)).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    })
  })
})

describe('most likes', () => {

  test('when list has only one blog, return the author of that blog with number of likes of the blog in an object', () => {
    expect(listHelper.mostLikes(helper.listWithOneBlog)).toEqual({
      author: 'Michael Chan',
      likes: 7
    })
  })

  test('when list has many blogs, return the author and total number of likes of the author in an object', () => {
    expect(listHelper.mostLikes(helper.listWithManyBlogs)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})
