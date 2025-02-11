import axios from "axios";

export async function getUsers() {
  try {
    const response = await axios.get('/api/admin/users'); // Call your Next.js API route
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}