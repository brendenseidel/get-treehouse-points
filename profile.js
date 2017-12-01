//Require https module
const https = require('https');
//Require http module for status codes
const http = require('http');
// Print Error Messages
function printError(error) {
  console.error(error.message);
}


//Function to print message to console
function printMessage(username, badgeCount, points, subject) {
  const message = `${username} has ${badgeCount} total badge(s) and ${points} points in ${subject}`;
  console.log(message);
}

function get(username, subject) {
  // Connect to the API URL (https://teamtreehouse.com/username.json)
  try {
    const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
                                if (response.statusCode === 200) {
                                  let body = "";
                                  //console.log(response.statusCode);
                                  
                                  // Read the data
                                  response.on('data', data => {
                                    body += data.toString();
                                  });
                                  response.on('end', () => {
                                    try {
                                      // Parse the data
                                      const profile = JSON.parse(body);
                                      // Get key/value array of subject/points
                                      const profilePointsArray = Object.entries(profile.points);
                                      // Iterate through array and find our specified subject
                                      let subjectPoints;
                                      profilePointsArray.forEach(element => {
                                        if (element[0] === subject[0]) {
                                          subjectPoints = element[1];
                                        }
                                      });
                                      //Handle invalid subjects
                                      if (subjectPoints === undefined) {
                                        console.error(`'${subject}' is not a valid subject.`);
                                        process.exit()
                                      }
                                      // Print the data
                                      printMessage(profile.profile_name, profile.badges.length, subjectPoints, subject);                                    
                                    } catch (error) {
                                      printError(error);
                                    }
                                  });
                                } else {
                                  const message = `There was an error getting the profile for ${username} (${http.STATUS_CODES[response.statusCode]})`
                                  const statusCodeError = new Error(message);
                                  printError(statusCodeError);
                                }    
                              });    
  request.on('error', error => console.error(`Problem with request: ${error.message}`));
  } catch (error) {
    printError(error);
  }
}

module.exports.get = get;