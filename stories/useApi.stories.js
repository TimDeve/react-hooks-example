import React, { useState, useEffect } from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import { Button, Welcome } from '@storybook/react/demo'

function useApi(url) {
  const [data, setData] = useState()

  useEffect(
    () => {
      console.log('Fetching: ' + url)

      fetch(url)
        .then(res => res.json())
        .then(json => setData(json))
        .catch(() => console.error('Explosion'))
    },
    [url]
  )

  return data
}

function Image({ id, width }) {
  const data = useApi(`https://jsonplaceholder.typicode.com/photos/${id}`)

  return data ? <img style={{ width }} src={data.url} /> : <p>Loading</p>
}

function Container() {
  const [id, setId] = useState(1)
  const [width, setWidth] = useState('400px')

  return (
    <div>
      <form>
        <label>id:</label>
        <input value={id} onChange={event => setId(event.target.value)} />

        <label>width:</label>
        <input value={width} onChange={event => setWidth(event.target.value)} />
      </form>

      <Image width={width} id={id} />
    </div>
  )
}

storiesOf('useApi', module).add('Example', () => <Container />)
