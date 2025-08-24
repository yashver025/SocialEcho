
# SocialEcho (Upgraded)

A modern, full-stack social platform that filters harmful content using a zero-shot AI moderation service.
Built with **Next.js 14 + TypeScript**, **MongoDB**, and a standalone **FastAPI moderation microservice**.

---

## Features

* **Full-stack monorepo** using Next.js App Router
* **JWT authentication** with device-aware session checks
* **Content moderation** via a Python microservice using a BART-MNLI zero-shot classifier
* **MongoDB + Mongoose** with repository pattern
* **TypeScript everywhere** (frontend, backend, shared utilities)
* **Tailwind + React Hook Form + Zod** for clean, validated UI
* **API routes co-located** inside Next.js (no separate Express server)
* **Workspace tooling** for running web + moderation services together
* Ready for **Playwright E2E tests** and **Vitest unit tests**

---

## Project Structure

```
SocialEcho/
├─ apps/
│  └─ web/                 # Next.js app (frontend + API routes)
├─ packages/
│  └─ shared/              # Shared TypeScript utilities & types
└─ services/
   └─ moderation/          # FastAPI zero-shot moderation service

```

## Tech Stack

* **Frontend / Backend**: [Next.js 14](https://nextjs.org/) (App Router) + [TypeScript](https://www.typescriptlang.org/)
* **Database**: [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **Validation**: [Zod](https://zod.dev/) + [React Hook Form](https://react-hook-form.com/)
* **Moderation Service**: [FastAPI](https://fastapi.tiangolo.com/) + [transformers](https://huggingface.co/docs/transformers/index) (BART-MNLI)
* **Testing**: [Vitest](https://vitest.dev/), [Playwright](https://playwright.dev/)

