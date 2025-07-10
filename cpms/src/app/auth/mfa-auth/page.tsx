"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "@/styles/auth.module.css";

function MfaForm() {
  const searchParams = useSearchParams();
  const emailParam   = searchParams?.get("email") ?? "";

  const [code,  setCode]  = useState("");
  const [error, setError] = useState("");
  const router            = useRouter();

  async function verifyCode() {
    setError("");

    const res = await fetch("/api/auth/mfa-auth", {
      method:       "POST",
      headers:      { "Content-Type": "application/json" },
      credentials:  "include",              
      body:         JSON.stringify({ email: emailParam, code }),
      cache:        "no-store",
    });

    let data: { error?: string; message?: string } = {};
    try {
      data = await res.clone().json();
    } catch { /* EMPTY */ }

    if (!res.ok) {
      setError(data.error || `Error ${res.status}`);
      return;
    }


    router.replace("/");
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
        />

        <button type="submit" className={styles.button}>
          Verify Code
        </button>
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
          <img
            src="/InfraPro_Logo.png"
            alt="Logo"
            className={styles.logo}
          />
          <h2 className={styles.heading}>Enter 2-Factor Code</h2>

          <Suspense fallback={<div>Loading…</div>}>
            <MfaForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
