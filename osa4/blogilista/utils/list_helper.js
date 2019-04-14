const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) =>
    ({ likes: total.likes + blog.likes })).likes
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 1) {
    return {
      title: blogs[0].title,
      author: blogs[0].author,
      likes: blogs[0].likes
    }
  }

  return blogs.reduce((favorite, blog) => {
    if (favorite.likes < blog.likes) {
      favorite = blog
    }
    return {
      title: favorite.title,
      author: favorite.author,
      likes: favorite.likes
    }
  })
}

const mostBlogs = (blogs) => {
  let authors = []
  blogs.forEach(blog => {
    if (!authors.some(b => b.author === blog.author)) {
      // Alustetaan kirjoittaja taulukkoon, jos sitä ei vielä ole siellä
      authors = authors.concat({ 'author': blog.author, 'blogs': 1 })
    } else {
      // Lisätään kirjoittajalle blogi
      authors.find(b => b.author === blog.author).blogs += 1
    }
  })

  // Palautetaan kirjoittaja, jolla on eniten blogeja
  return authors.reduce((mostBlogs, blog) =>
    mostBlogs.blogs < blog.blogs
      ? blog
      : mostBlogs
  )
}

const mostLikes = (blogs) => {
  let authors = []
  blogs.forEach(blog => {
    if (!authors.some(b => b.author === blog.author)) {
      authors = authors.concat({ 'author': blog.author, 'likes': blog.likes })
    } else {
      authors.find(b => b.author === blog.author).likes += blog.likes
    }

  })

  return authors.reduce((mostLikes, blog) =>
    mostLikes.likes < blog.likes
      ? blog
      : mostLikes
  )
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}