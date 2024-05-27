const PROD_API = 'https://eg-api.gittrackr.engineer'
const DEV_API = 'http://localhost:3001'

export const API = process.env.NODE_ENV === 'production' ? PROD_API : DEV_API
