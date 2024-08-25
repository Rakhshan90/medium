import { backendURL } from "@/config/backendURL";
import axios from "axios";
import { useEffect, useState } from "react"

interface Blog {
    id: number
    title: string;
    content: string;
    author: {
        name: string;
    }
}

export const usePosts = () => {
    const [posts, setPosts] = useState<Blog[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const fetchPosts = async () => {
        try {
            const response = await axios.get(`${backendURL}/api/v1/post/bulk`, config);
            setPosts(response.data);
            setLoading(false);
        } catch (error) {
            setError("Failed to get posts, try to refresh page to see posts");
        }
    }
    useEffect(() => {
        fetchPosts();
    }, []);

    return {
        posts,
        error,
        loading,
    }
}

export const usePost = (id: number) => {
    const [post, setPost] = useState<Blog>();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const fetchPost = async () => {
        try {
            const response = await axios.get(`${backendURL}/api/v1/post/${id}`, config);
            setPost(response.data);
            setLoading(false);
        } catch (error) {
            setError("Failed to get posts, try to refresh page to see posts");
        }
    }
    useEffect(() => {
        fetchPost();
    }, []);

    return {
        post,
        error,
        loading,
    }
}