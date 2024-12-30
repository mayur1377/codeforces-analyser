import axios from 'axios';

const BASE_URL = 'https://codeforces.com/api';

export interface UserProblem {
  author: {
    participantType: string;
  };
  contestId: number;
  creationTimeSeconds: number;
  verdict: string;
}

export interface Problem {
  contestId: number;
}

export const codeforcesApi = {
  async getUserInfo(username: string) {
    const response = await axios.get(`${BASE_URL}/user.info?handles=${username}`);
    return response.data.result[0];
  },

  async getAllProblems() {
    const response = await axios.get(`${BASE_URL}/problemset.problems`);
    return response.data.result.problems;
  },

  async getUserRating(username: string) {
    const response = await axios.get(`${BASE_URL}/user.rating?handle=${username}`);
    return response.data.result || [];
  },

  async getUserSubmissions(username: string) {
    const response = await axios.get(`${BASE_URL}/user.status?handle=${username}`);
    return response.data.result;
  }
}; 