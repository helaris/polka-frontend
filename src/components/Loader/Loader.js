import React from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import './Loader.css'

const Loader = () => {
  return (
    <section className="loader__container">
      <ClipLoader />
    </section>
  )
}

export default Loader;
