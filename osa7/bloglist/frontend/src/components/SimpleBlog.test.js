import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {

  const blog = {
    title: 'Blogi 1',
    author: 'Blogaaja 1',
    url: 'http://www.blogi.com',
    likes: 5
  }

  let component
  let likeCallBack

  beforeEach(() => {
    likeCallBack = jest.fn()

    component = render(
      <SimpleBlog
        blog={blog}
        onClick={likeCallBack}
      />
    )
  })

  it('renders title and likes', () => {
    const titleElement = component.container.querySelector('.title')
    expect(titleElement).toHaveTextContent('Blogi 1')
    expect(titleElement).toHaveTextContent('Blogaaja 1')
    expect(component.container.querySelector('.likes')).toHaveTextContent(/blog has \d+ likes/)
  })

  it('like button registers two clicks correctly', () => {
    const button = component.container.querySelector('button')
    fireEvent.click(button)
    expect(likeCallBack.mock.calls.length).toBe(1)
    fireEvent.click(button)
    expect(likeCallBack.mock.calls.length).toBe(2)
  })

})