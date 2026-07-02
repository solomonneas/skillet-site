import type { APIRoute } from "astro";
import { buildSearchIndex } from "../lib/search-index";

export const GET: APIRoute = () => {
  return new Response(JSON.stringify(buildSearchIndex()), {
    headers: { "Content-Type": "application/json" },
  });
};
