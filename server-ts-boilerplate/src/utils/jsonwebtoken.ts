import jwt, { Secret } from "jsonwebtoken";

export const SECRET_KEY: Secret = "your-secret-key-here";
export const expiresIn = "1h";

export class JWToken {
    constructor() {}

    // Generate a new JWT
    static generate(payload: { id: string }): string {
        return jwt.sign(payload, SECRET_KEY, { expiresIn });
    }

    // Verify an existing JWT
    static verify(token: string): Promise<{ id: string }> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, SECRET_KEY, (err, decoded) => {
                if (err) {
                    return reject(err);
                }
                resolve(decoded as { id: string });
            });
        });
    }
}

// Example usage
const token = JWToken.generate({ id: "harsh123" });
console.log("Generated Token:", token);

JWToken.verify(token)
    .then((decoded) => console.log("Decoded Payload:", decoded))
    .catch((err) => console.error("Token Verification Error:", err));
