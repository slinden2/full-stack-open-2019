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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}