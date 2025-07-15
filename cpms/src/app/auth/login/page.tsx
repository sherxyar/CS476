"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/styles/auth.module.css";
import { Building2, Loader2 } from "lucide-react";

export default function LoginPage() {
    const [form, setForm] = useState({ email: "", password: ""});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const submitHandler = async () => {
        setError("");
        setLoading(true);
        
        try {
            const req = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
                credentials: "include"
            });
            
            const data = await req.json();
            if (req.ok) {
                router.push(`/auth/mfa-auth?email=${encodeURIComponent(form.email)}`);
            } else {
                setError(data.error || "Login failed");
                setLoading(false);
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("An unexpected error occurred. Please try again.");
            setLoading(false);
        }
    }
    return (
        <div className={styles.master}>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <div className={styles.logoContainer}>
                        <Building2 className={styles.buildingIcon} />
                        <div className={styles.brandText}>InfraPro</div>
                    </div>
                    <h2 className={styles.heading}>Login</h2>
                    <form className={styles.form} onSubmit={(e) => { e.preventDefault(); submitHandler(); }}>
                        <label className={styles.label}>Email</label>
                        <input 
                            type="email" 
                            value={form.email} 
                            onChange={e => setForm({ ...form, email: e.target.value })} 
                            className={styles.input} 
                            required 
                            disabled={loading}
                        />
                        <label className={styles.label}>Password</label>
                        <input 
                            type="password" 
                            value={form.password} 
                            onChange={e => setForm({ ...form, password: e.target.value })} 
                            className={styles.input} 
                            required 
                            disabled={loading}
                        />
                        <button type="submit" className={styles.button} disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className={styles.spinner} size={18} />
                                    <span className={styles.buttonText}>Validating...</span>
                                </>
                            ) : (
                                <span className={styles.buttonText}>Submit</span>
                            )}
                        </button>
                    </form>
                    {error && <div className={styles.error}>{error}</div>}
                    <div className={styles.link}>New user? <a href="/auth/signup">Sign Up</a></div>
                </div>
            </div>
        </div>
    );
}
