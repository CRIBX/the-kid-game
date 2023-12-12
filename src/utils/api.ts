import axios from "axios";

export const baseUrl = import.meta.env.VITE_API_URL;

export const userService = {
  update: async (payload: any) => {
    const res = await axios.post(`${baseUrl}/updateuser`, payload);
    return res.data;
  },
  newUser: async (payload: any) => {
    const res = await axios.post(`${baseUrl}/newuser`, payload);
    return res.data;
  },
};

export const gameService = {
  getPlayersCount: async () => {
    const res = await axios.get(`${baseUrl}/players`);
    return res.data;
  },
  getPlayer: async (payload: any) => {
    const res = await axios.post(`${baseUrl}/player`, payload);
    return res.data;
  },
  getHistory: async () => {
    const res = await axios.get(`${baseUrl}/history`);
    const data = res.data;
    data.sort(
      (a: { highscore: number }, b: { highscore: number }) =>
        a.highscore - b.highscore
    );
    return data;
  },
  getJunks: async () => {
    const res = await axios.get(`${baseUrl}/junks`);
    return res.data;
  },
  over: async (payload: any) => {
    const res = await axios.post(`${baseUrl}/gameover`, payload);
    return res.data;
  },
};
