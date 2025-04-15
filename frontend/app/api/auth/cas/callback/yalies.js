
// utils/yalies.js

import axios from 'axios';  // Make sure this import is present

/**
 * Fetches a Yale student's information from the Yalies API by NetID
 * @param {string} netId - Yale NetID
 * @returns {Promise<Object|null>} - Returns student data or null if not found
 */
export async function fetchYaliesInfoByNetId(netId) {
  try {
    const response = await axios.post('https://api.yalies.io/v2/people', {
      filters: {
        netid: netId 
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.YALIES_API_KEY}`
      }
    });
    
    const data = response.data;
    
    if (Array.isArray(data) && data.length > 0) {
      // Find the specific user by netId (exact match)
      const userRecord = data.find(person => person.netid === netId);
      
      if (userRecord) {
        return userRecord;
      } else {
        console.log(`No match found for ${netId}`);
        return null;
      }
    } else if (data && data.length === 0) {
      console.log(`No match found for ${netId}`);
      return null;
    } else {
      console.log('Unexpected data format returned from API:', data);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching data for ${netId}:`, error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    return null;
  }
}
