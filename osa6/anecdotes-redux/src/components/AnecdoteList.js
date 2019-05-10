import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import Filter from './Filter'
import Anecdote from './Anecdote'

const AnecdoteList = props => {

  const vote = (id) => {
    const anecdote = props.anecdotes.find(a => a.id === id)
    props.voteAnecdote(anecdote)
    props.setNotification(`You voted '${anecdote.content}'.`, 5)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      {props.visibleAnecdotes.map(anecdote => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          vote={vote} />
      ))}
    </div>
  )
}

const byVotes = (a, b) => b.votes - a.votes

const anecdotesToShow = ({ anecdotes, filter }) => {
  return anecdotes
    .sort(byVotes)
    .filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
    visibleAnecdotes: anecdotesToShow(state)
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  setNotification
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList
