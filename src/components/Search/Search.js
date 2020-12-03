import React, { useState } from "react"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"

function Search() {
  const [input, setInput] = useState("")

  const handleInputChange = (e) => {
    const inputText = e.target.value
    setInput(inputText)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input) {
      return
    }
    // search here from db
    setInput("")
    e.target.focus()
  }

  return (
    <form className="searchform" onSubmit={handleSubmit}>
      <TextField
        required
        type="text"
        className="searchtextfield"
        id="filled-required"
        label="search user"
        variant="outlined"
        value={input}
        onChange={handleInputChange}
      />
      <Button variant="contained">Search friends</Button>
    </form>
  )
}

export default Search
