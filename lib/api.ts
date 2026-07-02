import axios from "axios";
import type { Note } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

const myToken = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN

export interface NotesHttpResponse{
    notes: Note[];
    page?: number;
    totalPages?: number;
}

export const fetchNotes = async (page: number, searchText: string) => {
    const res = await axios.get<NotesHttpResponse>("/notes", {
        params: {
            page: page,
            perPage: 12,
            search: searchText
        },
        headers:{
            Authorization: `Bearer ${myToken}`
        }
    });
    return res.data;
};

export const getSingleNote = async (id: string) => {
    const res = await axios.get(`/notes/${id}`, {
        headers: {
            Authorization: `Bearer ${myToken}`
        }
    });
    return res.data;
}

interface NewNote{
    title: string;
    content: string;
    tag: string
}

export const createNote = async(newNote: NewNote) =>{
    const res = await axios.post<Note>("/notes", newNote, {
        headers:{
            Authorization: `Bearer ${myToken}`
        }
    });
    return res.data;
}

export const deleteNote = async(noteId: string)=>{
    const res = await axios.delete<Note>(`/notes/${noteId}`, {
        headers:{
            Authorization: `Bearer ${myToken}`
        }
    });
    return res.data
}


