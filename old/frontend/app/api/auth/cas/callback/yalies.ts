// utils/yalies.ts
import axios from 'axios';

export interface YaliesRecord {
  netid: string;
  email: string;
  first_name: string;
  major: string;
  year: string;
  [key: string]: unknown; // catch-all for extra fields
}

export async function fetchYaliesInfoByNetId(netId: string): Promise<YaliesRecord | null> {
  try {
    const response = await axios.post<YaliesRecord[]>('https://api.yalies.io/v2/people', {
      filters: { netid: netId },
      limit: 1, // ✅ ask API for 1 record only
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.YALIES_API_KEY}`,
      },
    });

    const data = response.data;

    if (Array.isArray(data) && data.length > 0) {
      return data[0];
    }

    return null;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Error fetching data for ${netId}:`, error.message);
      if (error.response) {
        console.error('Status:', error.response.status);
        console.error('Response data:', error.response.data);
      }
    } else {
      console.error(`Unknown error fetching data for ${netId}:`, error);
    }
    return null;
  }
}