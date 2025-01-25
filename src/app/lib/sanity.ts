import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "fdxy9qun",
  dataset: "production",
  apiVersion: "2025-01-17",
  useCdn: true,
  token:
    "skYJ8BgGumHMs0GHieJbn5pe6pIURe2FSCGRHrYYG6sdRl8X6cudFtXj4v9eZ4gDDFHcfpd27ptqEcQrdEo9xiGTr0Mx9DC8qLsn2qF7pltNbWvHlIAqOrZsZ6LxJ6DphMhwsicBrmJFkIJCJ8TBj2a36GD7LgZHWcniY4kZkBf5F40X2rVu",
});