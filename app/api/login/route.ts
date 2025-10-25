import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "mysecret";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const res = await fetch(`http://localhost:8000/users?email=${email}`);
  const users = await res.json();

  if (users.length === 0)
    return NextResponse.json({ message: "User not found" }, { status: 404 });

  const user = users[0];
  const valid = await bcrypt.compare(password, user.password);
  if (!valid)
    return NextResponse.json({ message: "Invalid password" }, { status: 401 });

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
    expiresIn: "1d",
  });

  const response = NextResponse.json({ message: "Login successful" });
  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  return response;
}
