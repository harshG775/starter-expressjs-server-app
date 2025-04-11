export const usersController = {
    create: async (req, res) => {
        const { name, email } = req.body;
        if (!name || !email) {
            res.status(400).json({ success: false, message: "Name and email are required" });
            return;
        }
        const user = userCRUD.create({ name, email });
        res.status(201).json({ success: true, data: user });
    },
    findMany: async (_req, res) => {
        const users = userCRUD.findMany();
        res.status(200).json({ success: true, data: users });
    },
    findUnique: async (req, res) => {
        const { id } = req.params;
        const user = userCRUD.findUnique(id);
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        res.status(200).json({ success: true, data: user });
    },
    update: async (req, res) => {
        const { id } = req.params;
        const { name, email } = req.body;
        const updated = userCRUD.update(id, { name, email });
        if (!updated) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        res.status(200).json({ success: true, data: updated });
    },
    delete: async (req, res) => {
        const { id } = req.params;
        const success = userCRUD.delete(id);
        if (!success) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        res.status(200).json({ success: true, message: "User deleted successfully" });
    },
};
const users = {};
export const userCRUD = {
    create: (data) => {
        const id = crypto.randomUUID();
        const newUser = { id, ...data };
        users[id] = newUser;
        return newUser;
    },
    findMany: () => {
        return Object.values(users);
    },
    findUnique: (id) => {
        return users[id] ?? null;
    },
    update: (id, data) => {
        const existing = users[id];
        if (!existing)
            return null;
        users[id] = { ...existing, ...data };
        return users[id];
    },
    delete: (id) => {
        if (!users[id])
            return false;
        delete users[id];
        return true;
    },
};
