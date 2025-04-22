// utils/yalies.ts
import axios from 'axios';

export interface YaliesRecord {
  netid: string;
  email: string;
  first_name: string;
  major: string;
  year: string;
  [key: string]: any; // catch-all for extra fields
}

export async function fetchYaliesInfoByNetId(netId: string): Promise<YaliesRecord | null> {
  try {
    const response = await axios.post('https://api.yalies.io/v2/people', {
      filters: { netid: netId },
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.YALIES_API_KEY}`,
      },
    });

    const data = response.data;

    if (Array.isArray(data) && data.length > 0) {
      const userRecord = data.find((person: any) => person.netid === netId);
      return userRecord || null;
    }

    return null;
  } catch (error: any) {
    console.error(`Error fetching data for ${netId}:`, error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    return null;
  }
}