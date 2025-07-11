"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/styles/auth.module.css";
import { Building2, Loader2 } from "lucide-react";

export default function SignupPage() {
    const [form, setForm] = useState({ name: "", email: "", password: "", accountRole: "PROJECT_MANAGER" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const submitHandler = async () => {
        const password = form.password;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!passwordRegex.test(password)) {
            setError("Password must be at least 8 characters in length and contain one lowercase letter, one uppercase letter, one digit, and one special character.");
            return;
        }
        
        setError("");
        setLoading(true);
        
        try {
            const req = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });
            
            const data = await req.json();
            if (req.ok) {
                setSuccess("User successfully signed up!")
                setError("");
                setTimeout(() => router.back(), 2000);
            } else {
                setError(data.error || "Signup failed");
                setSuccess("");
                setLoading(false);
            }
        } catch (err) {
            console.error("Signup error:", err);
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
                    <h2 className={styles.heading}>Sign Up</h2>
                    <p className={styles.subheading}>Build Better with InfraPro.</p>
                    <form className={styles.form} onSubmit={(e) => { e.preventDefault(); submitHandler(); }}>
                        <label className={styles.label}>Name</label>
                        <input 
                            type="text" 
                            value={form.name} 
                            onChange={e => setForm({ ...form, name: e.target.value })} 
                            className={styles.input} 
                            required 
                            disabled={loading}
                        />
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
                        <label className={styles.label}>Account Role</label>
                        <select 
                            value={form.accountRole} 
                            onChange={e => setForm({ ...form, accountRole: e.target.value })} 
                            className={styles.select} 
                            required
                            disabled={loading}
                        >
                            <option value="PROJECT_MANAGER">Project Manager</option>
                            <option value="CONTRIBUTOR">Contributor</option>
                        </select>
                        <button type="submit" className={styles.button} disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className={styles.spinner} size={18} />
                                    <span className={styles.buttonText}>Creating Account...</span>
                                </>
                            ) : (
                                <span className={styles.buttonText}>Create Account</span>
                            )}
                        </button>
                    </form>
                    {error && <div className={styles.error}>{error}</div>}
                    {success && <div className={styles.success}>{success}</div>}
                    <div className={styles.link}>Are you an existing user? <a href="/auth/login">Login</a></div>
                </div>
            </div>
        </div>
    );
}