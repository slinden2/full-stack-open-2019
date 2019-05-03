import React from 'react'
import { render } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {

  it('renders title and likes', () => {

    const blog = {
      title: 'Blogi 1',
      author: 'Blogaaja 1',
      url: 'http://www.blogi.com',
      likes: 5
    }

    const component = render(
      <SimpleBlog
        blog={blog}
        onClick={() => 'handler called'}
      />
    )

    const titleElement = component.container.querySelector('.title')

    expect(titleElement).toHaveTextContent('Blogi 1')
    expect(titleElement).toHaveTextContent('Blogaaja 1')
    expect(component.container.querySelector('.likes')).toHaveTextContent(/blog has \d+ likes/)
  })

})