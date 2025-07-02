'use client';
import { useState } from "react";
import { PassThrough } from "stream";

export default function Signup() {
    const [form, setForm] = useState({ name: "", email: "", password: "" })
    const [message, setMessage] = useState("");

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const isValidPassword = (password: string) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        return regex.test(password);
    }

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");
        try {
            const res = await fetch("app/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            })
            const data = await res.json()
            if (res.ok) {
                setMessage("$(data.user.email) has successfully signed up");
                setForm({ name: "", email: "", password: "" })
            }
            else {
                setMessage(data.error() || "Signup failed");
            }
        }
        catch (err) {
            setMessage("Error during signup")
        }
    };

    return (
        <div style={{ padding: "2rem", maxWidth: 400, margin: "0 auto" }}>
            <h2>Signup</h2>
            <form onSubmit={submitHandler}>
                <label>Name</label>
                <input type="text" name="name" value={form.name} onChange={changeHandler} required />
                <br />
                <br />
                <label>Email</label>
                <input type="email" name="email" value={form.email} onChange={changeHandler} required />
                <br />
                <br />
                <label>Password</label>
                <input type="password" name="password" value={form.password} onChange={changeHandler} required />
                <br />
                <br />
                {!isValidPassword(form.password) && form.password && (
                    <p style={{color:"red"}}>
                        Password must contain atleast one lowercase letter, one uppercase letter, one number, one special character, and must be atleast 8 characters in length
                    </p>
                )
                }
                <button type="submit">Submit</button>
            </form>
            {message && <p style={{ marginTop: "1rem", color: "blue" }}>{message}</p>}
        </div>
    );
}