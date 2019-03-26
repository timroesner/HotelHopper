const api = process.env.NOW_GITHUB_COMMIT_REF === 'master' ? 
"https://api.hotelhopper.cf" : 
"https://staging-api.hotelhopper.cf"

export default api