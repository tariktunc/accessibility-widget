# Changesets

This directory holds [changesets](https://github.com/changesets/changesets) — short markdown files describing changes that should land in the next release.

## Workflow

1. After making code changes on a feature branch, run:
   ```
   pnpm changeset
   ```
2. Pick the affected packages, the bump type (`patch` / `minor` / `major`) for each, and write a one-line summary.
3. Commit the generated `.md` file alongside your PR.
4. On merge to `main`, the release workflow (Phase 8) consumes these files to bump versions and publish to npm.

## Bump policy (see `docs/ADR/004` and `docs/ADR/006`)

- **patch** — bug fix, perf, internal refactor; `STABLE-API.md` unchanged
- **minor** — additive only (new preference, new locale, new CSS var, new event)
- **major** — breaking change to any locked surface in `STABLE-API.md`

Major bumps require an entry in `docs/MIGRATION-vN-to-vN+1.md` and 30-day pre-announcement.
