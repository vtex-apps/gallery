/* eslint-env jest */
import React from 'react'
import { render, fireEvent } from '@vtex/test-tools/react'

import OrderBy from '../OrderBy'
import { setMobileState } from 'vtex.render-runtime'

describe('<OrderBy />', () => {
  const renderComponent = customProps => mobile => {
    setMobileState(mobile)

    const props = {
      orderBy: 'OrderByTopSaleDESC',
      ...customProps,
    }

    return render(<OrderBy {...props} />)
  }

  it('should shown dropdown box on mobile mode', () => {
    const { container } = renderComponent()(true)

    let dropdownContainer = container.querySelector('.dropdownSort > .dn')
    const button = container.querySelector('button')

    // Expect Dropdown container be rendered with display none
    expect(dropdownContainer).toBeDefined()
    expect(dropdownContainer).not.toBeNull()

    fireEvent.click(button)
    dropdownContainer = container.querySelector('.dropdownSort > .dn')

    // Expect Dropdown container be rendered without display none
    expect(dropdownContainer).toBeNull()
  })

  it('should match snapshot in web mod', () => {
    const { asFragment } = renderComponent()(false)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot in mobile', () => {
    const { asFragment } = renderComponent()(true)

    expect(asFragment()).toMatchSnapshot()
  })

  afterEach(() => {
    setMobileState(false)
  })
})
