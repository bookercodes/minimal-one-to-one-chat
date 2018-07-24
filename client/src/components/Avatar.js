import React from 'react'
import { css } from 'emotion'

const Avatar = ({ userId, className }) => (
  <img
    src={`https://ui-avatars.com/api/?name=${userId}`}
    alt={userId}
    className={`
        ${css({
    borderRadius: 5
  })} ${className}`}
  />
)

export default Avatar
