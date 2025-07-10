"use client"

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "@/styles/auth.module.css";

function Form() {

  
    const searchParams = useSearchParams();
    const email = searchParams?.get("email") || "";
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const verifyCode = async () => {
        const req = await fetch("/api/auth/mfa-auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, code }),
            credentials: "include"
        });
        const data = await req.json();
        if (req.ok) {
            router.push("/");
        } else {
            setError(data.error || "Invalid code");
        }
    };
    return (
        <>
            <form className={styles.form} onSubmit={(e) => { e.preventDefault(); verifyCode() }}>
                <input className={styles.input} type="text" value={code} onChange={(e) => setCode(e.target.value)} required />
                <button type="submit" className={styles.button}>Verify Code</button>
            </form>
            {error && <div className={styles.error}>{error}</div>}
        </>
    );
}

export default function MfaAuthPage() {
    return (
        <div className={styles.master}>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <img src="/InfraPro_Logo.png" alt="Logo" className={styles.logo} />
                    <h2 className={styles.heading}>Enter 2FA Code</h2>
                    <Suspense fallback={<div>Loading...</div>}><Form /></Suspense>
                </div>
            </div>
        </div>
    );
}