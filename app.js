// Problem: We need a simple way to look at a user's badge count and JavaScript points
// Solution: Use Node.js to connect to Treehouse's API to get profile information to print out

const profile = require('./profile');

//console.log(process.argv);
const subject = process.argv.slice(2,3);
const users = process.argv.slice(3);

users.forEach(user => {
  profile.get(user, subject)
});