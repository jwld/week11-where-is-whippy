const db = require("../db/connection")

function getAllVendors() {
  return db.query(`SELECT * FROM vendors;`).then((results) => results.rows)
}

function getVendorLogin(email) {
  return db
    .query(`SELECT * FROM vendors WHERE email=($1)`, [email])
    .then((user) => user.rows[0])
    .catch((error) => error)
}

function getSpecificVendor(vendor_id) {
  return db
    .query("SELECT * FROM vendors WHERE id=($1)", [vendor_id])
    .then((user) => user.rows[0])
}

function createVendor(vendor) {
  return db.query(
    `INSERT INTO vendors(name, email, password, mobile, company_name, alcohol, vegan_option) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id, name, password;`,
    [
      vendor.name,
      vendor.email,
      vendor.password,
      vendor.mobile,
      vendor.companyName,
      vendor.alcohol,
      vendor.vegan,
    ]
  )
}

module.exports = {
  getAllVendors,
  getVendorLogin,
  getSpecificVendor,
  createVendor,
}
