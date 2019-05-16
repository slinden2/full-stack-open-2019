import React from 'react'
import { connect } from 'react-redux'
import { Button, Input, List } from 'semantic-ui-react'
import { addComment } from '../reducers/blogReducer'
import { useField } from '../hooks'

const Comment = props => {
  if (props.blog.comments === undefined) return null

  const [comment, resetComment] = useField('comment')

  const handleComment = () => {
    props.addComment(props.blog.id, comment.value)
    resetComment()
  }

  return (
    <div>
      <h3>comments</h3>
      <Input {...comment} />
      <Button onClick={handleComment}>add comment</Button>
      <List>
        {props.blog.comments.map(comment =>
          <List.Item key={comment.id}>{comment.text}</List.Item>
        )}
      </List>
    </div>
  )
}

const mapDispatchToProps = {
  addComment
}

const ConnectedComment = connect(null, mapDispatchToProps)(Comment)

export default ConnectedComment