'use client';
import { useState } from "react";
import { PassThrough } from "stream";

export default function Signup() {
    const [form, setForm] = useState({ email: "", password: "" })
    const [message, setMessage] = useState("");

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");
        try {
            const res = await fetch("app/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            })
            const data = await res.json()
            if (res.ok) {
                setMessage("Login successful");
                setForm({ email: "", password: "" })
            }
            else {
                setMessage(data.error() || "Login failed");
            }
        }
        catch (err) {
            setMessage("Error during login")
        }
    };

    return (
        <div style={{ padding: "2rem", maxWidth: 400, margin: "0 auto" }}>
            <h2>Signup</h2>
            <form onSubmit={submitHandler}>
                <label>Email</label>
                <input type="email" name="email" value={form.email} onChange={changeHandler} required />
                <br />
                <br />
                <label>Password</label>
                <input type="password" name="password" value={form.password} onChange={changeHandler} required />
                <br />
                <br />
                <button type="submit">Login</button>
            </form>
            {message && <p style={{ marginTop: "1rem", color: "blue" }}>{message}</p>}
        </div>
    );
}