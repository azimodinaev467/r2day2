import { create } from 'zustand'

export interface User {
    id: number
    name: string
    job: string
}

interface TodoState {
    data: User[]
    deleteUser: (id: number) => void
    addUser: (newUser: User) => void
    editUser: (id: number, name: string, job: string) => void
}

export const useTodo = create<TodoState>((set) => ({
    data: [
        { id: 1, name: "Abdullo", job: "student" },
        { id: 2, name: "A", job: "doctor" }
    ],
    deleteUser: (id) => set((state) => ({
        data: state.data.filter((e) => e.id !== id)
    })),
    addUser: (newUser) => set((state) => ({
        data: [...state.data, newUser]
    })),
    editUser: (id, name, job) => set((state) => ({
        data: state.data.map((e) => e.id === id ? { ...e, name, job } : e)
    }))
}))
