import { AssignTeamManagerDTO } from "@/types/Team-Manager";
import axios from "axios";

export async function getTeamManagers() {
  try {
    const response = await axios.get("/api/admin/teammanagers");
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function assignTeamManager(data: AssignTeamManagerDTO) {
  try {
    console.log("assigning: ", data);
    const response = await axios.put("/api/admin/teammanagers", {
      data,
    });
    console.log("response", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}
