import { render, screen } from "@testing-library/react"
import React from "react"
import App from "./App"

test("renders about page", () => {
  render(<App />)
  const aboutText = screen.getByText(/Find Friends for life now!/i)
  expect(aboutText).toBeInTheDocument()
})

test("renders links on footer corrrectly", () => {
  render(<App />)
  const links = screen.getByText(/Contact/)
  expect(links).toBeInTheDocument()
})

test("renders at least one profile", () => {
  render(<App />)
  const links = screen.getByText(/Username:/)
  expect(links).toBeInTheDocument()
})
