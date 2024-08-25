import { backendURL } from "@/config/backendURL";
import axios from "axios";
import { atomFamily, selectorFamily } from "recoil";


const token = localStorage.getItem('token');
const config = {
    headers: {
        authorization: `Bearer ${token}`
    }
};

export const postsAtom = atomFamily({
    key: "postsAtom",
    default: selectorFamily({
        key: "postsSelector",
        get: () => {
            return async () => {
                const res = await axios.get(`${backendURL}/api/v1/post/bulk`, config);
                return res.data;
            }
        }
    })
})

export const postAtom = atomFamily({
    key: "postAtom",
    default: selectorFamily({
      key: "postSelector",
      get: (id: number) => async () => {
        const res = await axios.get(`${backendURL}/api/v1/post/${id}`, config);
        return res.data;
      },
    }),
  });


