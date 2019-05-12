const user = {
  username: 'test1',
  name: 'test user',
}

const blogs = [
  {
    title: 'Blogi 1',
    author: 'Blogaaja 1',
    url: 'http://www.blogi.com',
    user,
    likes: 1
  },
  {
    title: 'Blogi 2',
    author: 'Blogaaja 1',
    url: 'http://www.blogi.com',
    user,
    likes: 0
  },
  {
    title: 'Blogi 3',
    author: 'Blogaaja 1',
    url: 'http://www.blogi.com',
    user,
    likes: 3
  },
  {
    title: 'Blogi 4',
    author: 'Blogaaja 1',
    url: 'http://www.blogi.com',
    user,
    likes: 5
  },
  {
    title: 'Blogi 5',
    author: 'Blogaaja 1',
    url: 'http://www.blogi.com',
    user,
    likes: 9
  }
]

const setToken = () => {

}

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, setToken }