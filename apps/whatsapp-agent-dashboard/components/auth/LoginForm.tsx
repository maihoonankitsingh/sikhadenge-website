"use client";

import { FormEvent, useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

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
    <form className="auth-form" onSubmit={onSubmit}>
      <div className="auth-field">
        <label className="auth-field__label" htmlFor="login-email">
          Email address
        </label>
        <input
          id="login-email"
          className="auth-input"
          type="email"
          autoComplete="username"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          placeholder="you@sikhadenge.in"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={hasError}
          autoFocus
          required
        />
      </div>

      <div className="auth-field">
        <label className="auth-field__label" htmlFor="login-password">
          Password
        </label>
        <input
          id="login-password"
          className="auth-input"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          aria-invalid={hasError}
          aria-describedby={hasError ? "login-error" : undefined}
          required
        />
      </div>

      {error ? (
        <p className="auth-error" id="login-error" role="alert">
          {error}
        </p>
      ) : null}

      <button className="auth-submit" type="submit" disabled={submitting}>
        {submitting ? (
          <>
            <span className="auth-spinner" aria-hidden="true" />
            Signing in…
          </>
        ) : (
          "Sign in"
        )}
      </button>
    </form>
  );
}
