import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'vtex.styleguide'

import Grid from '../images/Grid'
import SingleItemGrid from '../images/SingleItemGrid'
import InlineGrid from '../images/InlineGrid'


export default function LayoutModeSwitcher({ activeMode, onChange }) {

  const renderButton = (mode, onChange) => {
    const renderIcon = mode => {
      switch (mode) {
        case 'small':
          return <Grid />
        case 'inline':
          return <InlineGrid />
        case 'normal':
          return <SingleItemGrid />
      }
    }

    return (
      <div className="vtex-layout-switcher flex justify-between pt2 pl1">
        <div className="flex justify-center flex-auto ph0">
          <Button
            variation="tertiary"
            size="small"
            onClick={e => onChange(e, mode)}
          >
            {renderIcon(mode)}
          </Button>
        </div>
      </div>
    )
  }

  return renderButton(activeMode, onChange)
}

LayoutModeSwitcher.propTypes = {
  /** Current active mode */
  activeMode: PropTypes.string,
  /** On change callback */
  onChange: PropTypes.func.isRequired,
}
