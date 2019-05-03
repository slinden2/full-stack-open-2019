import React from 'react'
import { render, waitForElement } from 'react-testing-library'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {

  it('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('log in')
    )

    const loginForm = component.container.querySelector('.loginform')
    const blogItem = component.container.querySelector('.blogitem')

    expect(loginForm).toBeDefined()
    expect(blogItem).toBe(null)
  })

  it('if user is logged in, all blogs are rendered', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Teuvo Testaaja'
    }

    localStorage.setItem('loggedUser', JSON.stringify(user))

    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.container.querySelector('.blogitem')
    )

    const blogItems = component.container.querySelectorAll('.blogitem')
    expect(blogItems.length).toBe(5)

    const loginForm = component.container.querySelector('.loginform')
    expect(loginForm).toBe(null)
  })
})