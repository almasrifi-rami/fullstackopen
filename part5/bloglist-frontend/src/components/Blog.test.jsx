import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('Blog component renders properly', () => {
  beforeEach(() => {
    const blog = {
      title: "some silly blog",
      author: "some silly author",
      url: "whatever.con",
      likes: 0
    }

    const mockLike = vi.fn()
    const mockDel = vi.fn()

    render(<Blog blog={blog} blogLike={mockLike} blogDelete={mockDel} />)
  })

  test('displaying title and author', () => {
    const titleElement = screen.getByText('some silly blog', { exact: false })
    expect(titleElement).toBeDefined()

    const authorElement = screen.getByText('some silly author', { exact: false })
    expect(authorElement).toBeDefined()
  })

  test('but does not display url and likes by default', () => {
    const urlElement = screen.queryByText('whatever.con')
    expect(urlElement).toBeNull()

    const likesElement = screen.queryByText('0')
    expect(likesElement).toBeNull()
  })
})
