import { create } from 'zustand'
import axios from 'axios'

const API = 'https://to-dos-api.softclub.tj/api/to-dos'

interface User {
    id: number
    name: string
}

interface TodoState {
    data: User[]
    getData: () => Promise<void>
    deleteData: (id: number) => Promise<void>
    postData: (name: string) => Promise<void>
    editData: (id: number, name: string) => Promise<void>
}

export const useTodo = create<TodoState>((set, get) => ({
    data: [],
    getData: async () => {
        try {
            const { data } = await axios.get(API)
            set({ data: data.data })
        } catch (error) {
            console.error('eror')
        }
    },
    deleteData: async (id: number) => {
        try {
            await axios.delete(`${API}?id=${id}`)
            await get().getData()
        } catch (error) {
            console.error('eror')
        }
    },
    postData: async (name: string) => {
        try {
            await axios.post(API, { name })
            await get().getData()
        } catch (error) {
            console.error('eror')
        }
    },
    editData: async (id: number, name: string) => {
        try {
            await axios.put(API, { id, name })
            await get().getData()
        } catch (error) {
            console.error('eror')
        }
    }
}))
