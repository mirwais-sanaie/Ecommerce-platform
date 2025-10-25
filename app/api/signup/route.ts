import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";

const usersFile = path.join(process.cwd(), "data", "users.json");

// Ensure file exists
function ensureFile() {
  if (!fs.existsSync(usersFile)) {
    fs.writeFileSync(usersFile, JSON.stringify({ users: [] }, null, 2));
  }
}

export async function POST(req: Request) {
  try {
    ensureFile();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    const fileData = fs.readFileSync(usersFile, "utf-8");
    const users = JSON.parse(fileData).users;

    // Check if user already exists
    const existing = users.find((u: any) => u.email === email);
    if (existing) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: Date.now(),
      email,
      password: hashedPassword,
      role: "user",
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
