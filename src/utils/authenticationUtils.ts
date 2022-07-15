import jwt from "jsonwebtoken";

type DecodedToken = {
    userId: number;
}

export async function verifyToken (token: string) {
    jwt.verify(token, process.env.JWT_SECRET, (error) => {
        if(error) { throw { type: "unauthorized", message: "Incorrect token" } }
    })

    return jwt.decode(token) as DecodedToken
}