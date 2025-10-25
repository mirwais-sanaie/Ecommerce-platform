import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

const usersFile = path.join(process.cwd(), "data", "users.json");

// Ensure file exists
function ensureFile() {
  if (!fs.existsSync(usersFile)) {
    const dir = path.dirname(usersFile);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(usersFile, JSON.stringify({ users: [] }, null, 2));
  }
}

export async function POST(req: Request) {
  try {
    ensureFile();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const fileData = fs.readFileSync(usersFile, "utf-8");
    const { users } = JSON.parse(fileData);

    // Check if user already exists
    const existing = users.find((u: any) => u.email === email);
    if (existing) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = {
      id: Date.now().toString(),
      email,
      password: hashedPassword,
      role: "user",
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    fs.writeFileSync(usersFile, JSON.stringify({ users }, null, 2));

    return NextResponse.json({ message: "Signup successful" }, { status: 201 });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

