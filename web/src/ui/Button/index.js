// Imports
import React from 'react'

// UI imports
import './style.css'

// Component
const Button = ({ isLoading = false, title, image, as = 'button', ...props }) =>
  React.createElement(
    as,
    { className: 'button', ...props },
    <>
      {image ? <img src={image} alt={title} /> : ''}

      {title}
    </>,
  )

export default Button
