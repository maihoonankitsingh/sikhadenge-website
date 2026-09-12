"use client";

import { FormEvent, useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

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
    <form className="login01__form auth-form" onSubmit={onSubmit}>
      <div className="login01__field auth-field">
        <label className="login01__label auth-field__label" htmlFor="login-email">
          Work Email
        </label>
        <div className="login01__input-wrap">
          <svg className="login01__input-icon" viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
            <path d="m5 7 7 5 7-5" />
          </svg>
          <input
            id="login-email"
            className="login01__input auth-input"
            type="email"
            autoComplete="username"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            placeholder="you@yourcompany.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-invalid={hasError}
            required
          />
        </div>
      </div>

      <div className="login01__field auth-field">
        <label className="login01__label auth-field__label" htmlFor="login-password">
          Password
        </label>
        <div className="login01__input-wrap">
          <svg className="login01__input-icon" viewBox="0 0 24 24" aria-hidden="true">
            <rect x="5" y="10" width="14" height="10" rx="2" />
            <path d="M8 10V7.5a4 4 0 0 1 8 0V10" />
          </svg>
          <input
            id="login-password"
            className="login01__input auth-input"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            aria-invalid={hasError}
            aria-describedby={hasError ? "login-error" : undefined}
            required
          />
          <button
            type="button"
            className="login01__password-toggle"
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

      <div className="login01__form-options">
        <label className="login01__remember">
          <input
            type="checkbox"
            checked={remember}
            onChange={(event) => setRemember(event.target.checked)}
          />
          <span aria-hidden="true" />
          Remember me
        </label>
        <a href="mailto:support@sikhadenge.in?subject=WhatsApp%20Agent%20password%20reset">Forgot password?</a>
      </div>

      {error ? (
        <p className="login01__error auth-error" id="login-error" role="alert">
          {error}
        </p>
      ) : null}

      <button className="login01__submit auth-submit" type="submit" disabled={submitting}>
        {submitting ? (
          <>
            <span className="auth-spinner" aria-hidden="true" />
            Signing in…
          </>
        ) : (
          <>
            <span aria-hidden="true">→</span>
            Sign In
          </>
        )}
      </button>

      <div className="login01__divider" aria-hidden="true">
        <span />
        <b>OR CONTINUE WITH</b>
        <span />
      </div>

      <button
        className="login01__google"
        type="button"
        aria-disabled="true"
        title="Google sign-in is not enabled for this workspace"
      >
        <span className="login01__google-mark" aria-hidden="true">G</span>
        Continue with Google
      </button>
    </form>
  );
}
