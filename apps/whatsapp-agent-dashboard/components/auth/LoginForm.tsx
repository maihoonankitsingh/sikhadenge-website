"use client";

import { FormEvent, useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = (await response.json()) as { error?: string; redirectTo?: string };

      if (!response.ok) {
        setError(result.error ?? "Unable to sign in.");
        return;
      }

      window.location.assign(result.redirectTo ?? "/inbox");
    } catch {
      setError("Unable to reach the dashboard server.");
    } finally {
      setSubmitting(false);
    }
  }

  const hasError = Boolean(error);

  return (
    <form className="split01-form" onSubmit={onSubmit}>
      <div className="split01-form__field">
        <label htmlFor="login-email">Email address</label>
        <div className="split01-form__control">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
            <path d="m5 7 7 5 7-5" />
          </svg>
          <input
            id="login-email"
            type="email"
            autoComplete="username"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            placeholder="you@sikhadenge.in"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-label="Work Email"
            aria-invalid={hasError}
            required
          />
        </div>
      </div>

      <div className="split01-form__field">
        <label htmlFor="login-password">Password</label>
        <div className="split01-form__control">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="5" y="10" width="14" height="10" rx="2" />
            <path d="M8 10V7.5a4 4 0 0 1 8 0V10" />
          </svg>
          <input
            id="login-password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            aria-invalid={hasError}
            aria-describedby={hasError ? "login-error" : undefined}
            required
          />
          <button
            type="button"
            className="split01-form__eye"
            onClick={() => setShowPassword((value) => !value)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M2.75 12s3.3-5 9.25-5 9.25 5 9.25 5-3.3 5-9.25 5-9.25-5-9.25-5Z" />
              <circle cx="12" cy="12" r="2.35" />
              {showPassword ? null : <path d="M4 4l16 16" />}
            </svg>
          </button>
        </div>
      </div>

      {error ? (
        <p className="split01-form__error" id="login-error" role="alert">
          {error}
        </p>
      ) : null}

      <button className="split01-form__submit" type="submit" disabled={submitting}>
        {submitting ? (
          <>
            <span className="split01-form__spinner" aria-hidden="true" />
            Signing in…
          </>
        ) : (
          <>
            Sign in <span aria-hidden="true">→</span>
          </>
        )}
      </button>
    </form>
  );
}
