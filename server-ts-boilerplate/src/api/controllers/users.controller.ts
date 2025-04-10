import { Request, Response } from "express";
export const usersController = {
    create: async (req: Request, res: Response): Promise<void> => {
        const { name, email } = req.body;
        if (!name || !email) {
            res.status(400).json({ success: false, message: "Name and email are required" });
            return;
        }

        const user = userCRUD.create({ name, email });
        res.status(201).json({ success: true, data: user });
    },

    findMany: async (_req: Request, res: Response): Promise<void> => {
        const users = userCRUD.findMany();
        res.status(200).json({ success: true, data: users });
    },

    findUnique: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const user = userCRUD.findUnique(id);

        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }

        res.status(200).json({ success: true, data: user });
    },

    update: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const { name, email } = req.body;

        const updated = userCRUD.update(id, { name, email });

        if (!updated) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }

        res.status(200).json({ success: true, data: updated });
    },

    delete: async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const success = userCRUD.delete(id);

        if (!success) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }

        res.status(200).json({ success: true, message: "User deleted successfully" });
    },
};

type User = {
    id: string;
    name: string;
    email: string;
};

const users: Record<string, User> = {};
export const userCRUD = {
    create: (data: Omit<User, "id">): User => {
        const id = crypto.randomUUID();
        const newUser = { id, ...data };
        users[id] = newUser;
        return newUser;
    },

    findMany: (): User[] => {
        return Object.values(users);
    },

    findUnique: (id: string): User | null => {
        return users[id] ?? null;
    },

    update: (id: string, data: Partial<Omit<User, "id">>): User | null => {
        const existing = users[id];
        if (!existing) return null;

        users[id] = { ...existing, ...data };
        return users[id];
    },

    delete: (id: string): boolean => {
        if (!users[id]) return false;
        delete users[id];
        return true;
    },
};
