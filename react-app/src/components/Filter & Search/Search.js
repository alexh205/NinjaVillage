import React from 'react'
import { useParams } from 'react-router-dom'

const Search = () => {
    const {searchId} = useParams()


  return (
    <div>{console.log(searchId)}</div>
  )
}

export default Search
