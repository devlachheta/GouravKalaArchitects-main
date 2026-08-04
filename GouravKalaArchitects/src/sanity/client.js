import { createClient } from "@sanity/client";

export const client = createClient({
    projectId: "a8lmtcdr",
    dataset: "production",
    apiVersion: "2026-08-01",
    useCdn: false,
});