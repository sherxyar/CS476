"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "@/styles/auth.module.css";
import { signIn } from "next-auth/react";
import { Building2 } from "lucide-react";

function MfaForm() {
  const searchParams = useSearchParams();
  const emailParam   = searchParams?.get("email") ?? "";

  const [code,  setCode]  = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router            = useRouter();

  async function verifyCode() {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/mfa-auth", {
        method:       "POST",
        headers:      { "Content-Type": "application/json" },
        credentials:  "include",              
        body:         JSON.stringify({ email: emailParam, code }),
        cache:        "no-store",
      });

      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || `Error ${res.status}`);
        setLoading(false);
        return;
      }

      console.log("MFA verification successful, user data:", data.user);
      
      const result = await signIn("credentials", {
        email: emailParam,
        password: code,
        redirect: true,
        callbackUrl: "/"
      });

      if (result?.error) {
        console.error("NextAuth sign in error:", result.error);
        setError(`Authentication error: ${result.error}`);
        setLoading(false);
        return;
      }

      console.log("NextAuth sign in successful:", result);
      setSuccess("Authentication successful! Redirecting...");
      
      // If we somehow get here, redirect to homepage after a short delay
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (err) {
      console.error("MFA verification error:", err);
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  }

  return (
    <>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          verifyCode();
        }}
      >
        <label className={styles.label}>6-digit code</label>
        <input
          className={styles.input}
          type="text"
          inputMode="numeric"
          pattern="\d{6}"
          maxLength={6}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
          disabled={loading}
        />

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? <span className={styles.buttonText}>Verifying...</span> : <span className={styles.buttonText}>Verify Code</span>}
        </button>
      </form>

      {error && <div className={styles.error}>{error}</div>}
      {success && <div className={styles.success}>{success}</div>}
    </>
  );
}

export default function MfaAuthPage() {
  return (
    <div className={styles.master}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.logoContainer}>
            <Building2 className={styles.buildingIcon} />
            <div className={styles.brandText}>InfraPro</div>
          </div>
          <h2 className={styles.heading}>Enter 2-Factor Code</h2>

          <Suspense fallback={<div>Loading…</div>}>
            <MfaForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
