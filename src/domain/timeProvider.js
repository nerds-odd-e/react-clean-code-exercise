const now = () => new Date()
const getDatePromise = () => new Promise((resolve) => resolve(now()))
const getDateCallback = callback => callback(now())
export default {
  now,
  getDatePromise,
  getDateCallback
}