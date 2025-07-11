"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "@/styles/auth.module.css";
import { signIn } from "next-auth/react";
import { Building2, Loader2, Shield, CheckCircle2, HardHat, Hammer, Construction } from "lucide-react";

function MfaForm() {
  const searchParams = useSearchParams();
  const emailParam = searchParams?.get("email") ?? "";

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function verifyCode() {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/mfa-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: emailParam, code }),
        cache: "no-store",
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
      setLoading(false);

      // If we somehow get here, redirect to homepage after a short delay
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
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
        <label className={styles.label}>Security Code</label>
        <div className={styles.securityCodeInputWrapper}>
          <input
            className={`${styles.input} ${styles.securityCodeInput}`}
            type="text"
            inputMode="numeric"
            pattern="\d{6}"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            disabled={loading}
            placeholder="• • • • • •"
          />
        </div>

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className={styles.spinner} size={18} />
              <span className={styles.buttonText}>Verifying...</span>
            </>
          ) : (
            <>
              <Shield className={styles.buttonIcon} size={18} />
              <span className={styles.buttonText}>Verify Code</span>
            </>
          )}
        </button>
      </form>

      {error && <div className={styles.error}>{error}</div>}
      {success && (
        <>
          <CheckCircle2 className={styles.successIcon} size={40} />
          <div className={styles.success}>{success}</div>
        </>
      )}
    </>
  );
}

export default function MfaAuthPage() {
  return (
    <div className={styles.master}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.subheading2}>InfraPro</div>

          <div className={styles.securityLayerVisual}>
            <div className={styles.securityLayer}></div>
            <div className={styles.securityLayer}></div>
            <div className={styles.securityLayer}></div>
            <Construction className={styles.securityCenterIcon} />
          </div>

          <h2 className={styles.heading}>Secure Verification</h2>
          <div className={styles.subheading}>
            Enter your unique code to access your projects
          </div>

          <Suspense fallback={<div>Loading…</div>}>
            <MfaForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
