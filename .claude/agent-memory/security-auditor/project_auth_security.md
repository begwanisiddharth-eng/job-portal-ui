---
name: Auth & Registration Security State
description: Key security weaknesses found in AuthContext and Register.jsx — plaintext passwords, localStorage session trust, privilege escalation via updateProfile
type: project
---

All auth credentials (DUMMY_USERS and registeredUsers) are stored as plaintext passwords in source code and localStorage respectively. No hashing is used anywhere.

The `register()` function in AuthContext hard-codes `role: "ROLE_JOB_SEEKER"` for new users — good — but the `updateProfile()` function at lines 317-319 does an unconstrained spread (`...user, ...profileData`) that lets any caller elevate the `role` field to ROLE_ADMIN or ROLE_EMPLOYER without any server-side check.

Auth state is restored purely from `localStorage.getItem("jobPortalUser")` at startup (line 137-155). An attacker who can write to localStorage (via XSS or physical access) can inject any user object including role fields and bypass all ProtectedRoute guards.

The fake token is `"mock-jwt-" + Date.now()` (line 204) — it is never validated on any subsequent request; it only serves as a truthy presence check.

Register.jsx collects `userType` (jobSeeker/employer) from the form but AuthContext.register() ignores it entirely — employer registrations silently get ROLE_JOB_SEEKER. This is both a UX bug and a latent authz inconsistency.

The `registeredUsers` array stored in localStorage at key `registeredUsers` contains plaintext passwords for all self-registered users.

**Why:** First audit of this codebase — establishing baseline security posture.
**How to apply:** Reference these specifics when reviewing any future changes to AuthContext, profileService, or registration flows. Flag any new code that spreads arbitrary props into the user object or reads role from client storage without re-validation.

## ProtectedRoute (src/components/ProtectedRoute.jsx) — confirmed bypass chain
Reviewed 2026-07-11. `ProtectedRoute` itself is logically correct (checks `isLoading`, `isAuthenticated`, then `allowedRoles.includes(user?.role)`, redirects unauth to `/login` and role-mismatch to `/`). Role string constants (`ROLE_JOB_SEEKER`, `ROLE_EMPLOYER`, `ROLE_ADMIN`) are consistent between `AuthContext.jsx` DUMMY_USERS/register() and the `allowedRoles` arrays passed in `App.jsx` — no mismatch bugs found.

However the guard is only as strong as its trust in `AuthContext`'s `user` object, which is restored unvalidated from `localStorage.getItem('jobPortalUser')` (AuthContext.jsx ~line 127-151) with no signature/HMAC check. Combined with the `updateProfile()` unconstrained spread (see above), this means: (1) directly editing `jobPortalUser` in localStorage/devtools to set `role: "ROLE_ADMIN"` and reloading grants full admin route access — no backend exists to reject it; (2) even without touching localStorage directly, any flow that calls `updateProfile()` with attacker-influenced `profileData` containing a `role` key achieves the same escalation in-session. This is expected/acceptable for a mock/no-backend app but is the single most important finding to flag before any real backend integration — a production version MUST validate role from a server-verified session (JWT/opaque token introspection), never trust the client-stored role field.

**Why:** Confirmed during dedicated `src/components/` folder security audit.
**How to apply:** Do not re-flag ProtectedRoute's own if/redirect logic as buggy — it's correct. Keep flagging the underlying trust-in-localStorage issue whenever ProtectedRoute, AuthContext, or role-gated pages are reviewed.
