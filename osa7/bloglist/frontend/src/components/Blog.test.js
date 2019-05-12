import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import Blog from './Blog'

describe('<Blog />', () => {

  const user = {
    username: 'test1',
    name: 'test user',
  }

  const author = {
    username: 'test2',
    name: 'test user',
  }

  const blog = {
    title: 'Blogi 1',
    author: 'Blogaaja 1',
    url: 'http://www.blogi.com',
    user: author,
    likes: 5
  }

  let component

  beforeEach(() => {
    component = render(
      <Blog
        user={user}
        blog={blog}
        blogs={[blog]}
        setBlogs={() => ''}
        notify={() => ''}
      />
    )
  })

  it('clicking the blog title open the details view', () => {
    const titleDiv = component.container.querySelector('.title')
    const detailDiv = component.container.querySelector('.details')
    expect(titleDiv).toHaveTextContent(`${blog.title} ${blog.author}`)
    expect(detailDiv).toHaveStyle('display: none')

    fireEvent.click(titleDiv)
    expect(detailDiv).not.toHaveStyle('display: none')

    fireEvent.click(titleDiv)
    expect(detailDiv).toHaveStyle('display: none')
  })

})