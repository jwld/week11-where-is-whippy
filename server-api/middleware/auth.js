const jwt = require("jsonwebtoken")
const customerModel = require("../model/customers-m")
const vendorModel = require("../model/vendors-m")

require("dotenv").config()

const SECRET = process.env.JWT_SECRET

function verifyCustomer(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    const error = new Error("Authorization header required") //look into this
    error.status = 401
    next(error)
  }
  const token = authHeader.replace("Bearer ", "")
  try {
    const data = jwt.verify(token, SECRET)
    customerModel
      .getSpecificCustomer(data.customerId)
      .then((user) => {
        console.log("verifyCustomer -> email", email)
        req.user = user
        next()
      })
      .catch(next)
  } catch (_) {
    const error = new Error("Unauthorized. No Ice cream for you today")
    error.status = 401
    next(error)
  }
}

function verifyVendor(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    const error = new Error("Authorization header required") //look into this
    error.status = 400
    next(error)
  }
  const token = authHeader.replace("Bearer ", "")
  try {
    const data = jwt.verify(token, SECRET)
    vendorModel
      .getVendor(data.email)
      .then((email) => {
        req.email = email
        next()
      })
      .catch(next)
  } catch (_) {
    const error = new Error("Unauthorized")
    error.status = 401
    next(error)
  }
}

module.exports = { verifyCustomer, verifyVendor }
