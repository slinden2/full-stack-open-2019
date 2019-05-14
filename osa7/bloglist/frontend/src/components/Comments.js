import React from 'react'
import { connect } from 'react-redux'
import { addComment } from '../reducers/blogReducer'
import { useField } from '../hooks'

const Comment = props => {
  if (props.blog.comments === undefined) return null

  const comment = useField('comment')

  const handleComment = () => {
    props.addComment(props.blog.id, comment.value)
    comment.reset()
  }

  return (
    <div>
      <h3>comments</h3>
      <input {...comment.excludeReset()} />
      <button onClick={handleComment}>add comment</button>
      <ul>
        {props.blog.comments.map(comment =>
          <li key={comment.id}>{comment.text}</li>
        )}
      </ul>
    </div>
  )
}

const mapDispatchToProps = {
  addComment
}

const ConnectedComment = connect(null, mapDispatchToProps)(Comment)

export default ConnectedComment