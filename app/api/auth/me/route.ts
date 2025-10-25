import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

const SECRET_KEY = process.env.JWT_SECRET || "mysecret";
const usersFile = path.join(process.cwd(), "data", "users.json");

export async function GET(req: Request) {
  try {
    // Extract token from cookies
    const cookieHeader = req.headers.get("cookie");
    if (!cookieHeader) {
      return NextResponse.json({ error: "No cookies found" }, { status: 401 });
    }

    const tokenMatch = cookieHeader.match(/token=([^;]+)/);
    if (!tokenMatch) {
      return NextResponse.json({ error: "No token found" }, { status: 401 });
    }

    const token = tokenMatch[1];

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const decoded = jwt.verify(token, SECRET_KEY) as any;

    // Get user data from file
    if (!fs.existsSync(usersFile)) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const fileData = fs.readFileSync(usersFile, "utf-8");
    const { users } = JSON.parse(fileData);

    const user = users.find((u: any) => u.id === decoded.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
