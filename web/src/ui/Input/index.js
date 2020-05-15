// Imports
import React from 'react'

// UI imports
import './style.css'

// Component
const Text = ({
  type = 'text',
  placeholder,
  label,
  required = false,
  ...props
}) =>
  React.createElement(
    'div',
    { className: 'input', ...props },
    <>
      {label && (
        <div className='label'>
          {label}
          {required && ' *'}
        </div>
      )}

      <input
        type={type}
        placeholder={placeholder}
        required={required}
        {...props}
      />
    </>,
  )

export default Text
