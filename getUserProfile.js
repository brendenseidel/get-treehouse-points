// Problem: We need a simple way to look at a user's badge count and JavaScript points
// Solution: Use Node.js to connect to Treehouse's API to get profile information to print out

//Require https module
const https = require('https');

//Function to print message to console
function printMessage(username, badgeCount, points) {
  const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript`;
  console.log(message);
}

function getProfile(username) {
  // Connect to the API URL (https://teamtreehouse.com/username.json)
  try {
    const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
                                let body = "";
                                //console.log(response.statusCode);
                                
                                // Read the data
                                response.on('data', data => {
                                  body += data.toString();
                                });
    
                                response.on('end', () => {
                                  // Parse the data
                                  const profile = JSON.parse(body);
                                  //console.dir(profile);
                                  // Print the data
                                  printMessage(profile.profile_name, profile.badges.length, profile.points.JavaScript);
                                });
                              });    
                              request.on('error', error => console.error(`Problem with request: ${error.message}`));
  } catch (error) {
    console.error(error.message)
  }
}

const users = process.argv.slice(2);
users.forEach(getProfile);