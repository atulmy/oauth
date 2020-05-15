// Imports
import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import moment from 'moment'

// UI imports
import Button from 'ui/Button'
import Input from 'ui/Input'
import './style.css'

// App imports
import params from 'setup/config/params'
import { list } from 'modules/note/api/actions/query'
import { save, remove } from 'modules/note/api/actions/mutation'
import { URL_WEB } from 'setup/config/env'

// Component
const List = () => {
  // state
  const [isLoading, isLoadingToggle] = useState(false)
  const [notes, setNotes] = useState([])
  const noteEmpty = { text: '' }
  const [note, setNote] = useState(noteEmpty)

  // on load
  useEffect(() => {
    refresh()
  }, [])

  // refresh
  const refresh = async () => {
    isLoadingToggle(true)

    try {
      const { data } = await list()

      if (data.success && data.data) {
        setNotes(data.data)
      }
    } catch (error) {
      console.log(error)
    } finally {
      isLoadingToggle(false)
    }
  }

  // on submit
  const onSubmit = async (event) => {
    event.preventDefault()

    isLoadingToggle(true)

    try {
      const { data } = await save(note)

      if (data.success && data.data) {
        setNote(noteEmpty)

        await refresh()
      }
    } catch (error) {
      console.log(error)
    } finally {
      isLoadingToggle(false)
    }
  }

  // on change
  const onChange = (event) => {
    const { name, value } = event.target
    setNote({ ...note, [name]: value })
  }

  // on remove
  const onRemove = (noteId) => async () => {
    let check = window.confirm('Are you sure you want to delete this note?')

    if (check) {
      try {
        const { data } = await remove({ noteId })

        if (data.success) {
          await refresh()
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  // render
  return (
    <>
      {/* meta */}
      <Helmet>
        <title>{`Notes · ${params.site.name}`}</title>
      </Helmet>

      {/* content */}
      <section className='note-list'>
        <form onSubmit={onSubmit}>
          <Input
            name='text'
            value={note.text}
            placeholder='Enter note'
            onChange={onChange}
            required
            autoFocus
          />

          <div>
            <Button title='Save' type='submit' />
          </div>
        </form>

        <aside>
          <h4>
            Your notes:{' '}
            {isLoading && (
              <img
                src={`${URL_WEB}/images/loader.gif`}
                alt='loading...'
                height={14}
              />
            )}
          </h4>

          <div className='list'>
            {notes.length === 0 ? (
              <p>You have not added any notes.</p>
            ) : (
              notes.map((n) => (
                <div className='item' key={n._id}>
                  <p>{n.text}</p>

                  <p className='info'>
                    <em>{moment(n.createdAt).format(params.common.date)}</em>
                    {' · '}
                    <span onClick={onRemove(n._id)}>Delete</span>
                  </p>
                </div>
              ))
            )}
          </div>
        </aside>
      </section>
    </>
  )
}

export default List
