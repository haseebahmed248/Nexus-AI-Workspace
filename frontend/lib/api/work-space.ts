import axios from "axios";

export async function getWorkSpaces() {
  try {
    const response = await axios.get("/api/admin/workspaces");
    return response.data;
  } catch (error) {
    console.log("error ", error);
    throw error;
  }
}

export async function getSpecificWorkSpaces() {
  try {
    const response = await axios.get("/api/team-manager/workspaces");
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getWorkspaceMembers() {
  try {
    const response = await axios.get("/api/team-manager/workspace-members");
    return response.data;
  } catch (error) {
    throw error;
  }
}
