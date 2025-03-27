
import supabase from '@/database/client';
import { User } from '@/types/type-user';

/**
 * Fetches a user's profile data from Supabase
 * @param userId The user's ID from Supabase authentication
 * @returns The user profile data or null if not found
 */
export async function fetchUserProfile(userId: string): Promise<User | null> {
  // Get the basic user data
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('id, name, net_id')
    .eq('id', userId)
    .single();
  
  if (userError || !userData) {
    console.error('Error fetching user data:', userError);
    return null;
  }

  // Construct and return the simplified user object
  const user: User = {
    name: userData.name || '',
    netID: userData.net_id,
		FYP: { studentCourses: [], languagePlacement: "", studentTermArrangement: "", }
  };

  return user;
}

/**
 * Updates user profile information
 * @param userId The user's ID
 * @param userData The user data to update
 * @returns Success or error
 */
export async function updateUserProfile(userId: string, userData: Partial<User>) {
  const { error } = await supabase
    .from('users')
    .update({
      name: userData.name,
      net_id: userData.netID
    })
    .eq('id', userId);

  if (error) {
    console.error('Error updating user profile:', error);
    return { success: false, error };
  }

  return { success: true };
}
