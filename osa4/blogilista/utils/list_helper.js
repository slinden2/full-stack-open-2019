const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) =>
    ({ likes: total.likes + blog.likes })).likes
}

module.exports = {
  dummy,
  totalLikes
}