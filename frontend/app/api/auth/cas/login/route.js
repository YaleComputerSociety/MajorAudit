
// login/route.js
import { redirect } from 'next/navigation';

export async function GET(request) 
{
  const casLoginUrl = 'https://secure.its.yale.edu/cas/login';
  
  const url = new URL(request.url);
  let serviceUrl = url.origin + '/api/auth/cas/callback';
  console.log('Service URL for CAS login:', serviceUrl);

  return redirect(`${casLoginUrl}?service=${encodeURIComponent(serviceUrl)}`);
}
