import axios from "axios";
import md5 from "crypto-js/md5";
export const api = axios.create({
  baseURL: "https://api.valantis.store:41000/",
  headers: {
    "Content-Type": "application/json",
    "X-Auth": md5(
      `${process.env.NEXT_PUBLIC_PASS}_${new Date().toISOString().slice(0, 10).replace(/-/g, "")}`,
    ).toString(),
  },
});
