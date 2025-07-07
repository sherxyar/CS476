"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/styles/auth.module.css";

export default function LoginPage() {
    const [form, setForm] = useState({ email: "", password: ""});
    const [error, setError] = useState("");
    const router = useRouter();
    const submitHandler = async () => {
        setError("");
        const password = form.password;
        setError("");
        const req = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        });
        const data = await req.json();
        if (req.ok) {
            router.push(`/auth/mfa-auth?email=${encodeURIComponent(form.email)}`);
        } else {
            setError(data.error || "Login failed");
        }
    }
    return (
        <div className={styles.master}>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <img src="/PlanovaLogo1.png" alt="Logo" className={styles.logo} />
                    <h2 className={styles.heading}>Login</h2>
                    <form className={styles.form} onSubmit={(e) => { e.preventDefault(); submitHandler(); }}>
                        <label className={styles.label}>Email</label>
                        <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className={styles.input} required />
                        <label className={styles.label}>Password</label>
                        <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className={styles.input} required />
                        <button type="submit" className={styles.button}>Submit</button>
                    </form>
                    {error && <div className={styles.error}>{error}</div>}
                    <div className={styles.link}>New user? <a href="/auth/signup">Sign Up</a></div>
                </div>
            </div>
        </div>
    );
}