import React from "react"

export default function Login({ isVendor }) {
  const onSubmit = values => {
    isVendor ? loginToVendor(values) : loginToCustomer(values)
  }

  const buttonClass = isVendor ? 'login-button-vendor' : 'login-button-customer'

  return (
    <section>
      <form>
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required />

        <label for="password">Password</label>
        <input type="password" id="password" name="password" required />

        <button className={buttonClass}>Login</button>
      </form>
    </section>
  )
}
// <h2 className="login-subtitle">Find</h2>Find
