import React from 'react'

const Authenticate = ({ children }) => {
  const { isLoggedIn, isVendor } = getIsLoggedIn() // query to backend

  return isLoggedIn ? children : <Redirect to="Login" />
}

export default Authenticate