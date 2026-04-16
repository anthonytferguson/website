import { getStore } from "@netlify/blobs";
import type { Config, Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  const key = context.params.key;

  if (!key) {
    return Response.json({ error: "Missing image key" }, { status: 400 });
  }

  try {
    const store = getStore("uploads");
    const result = await store.getWithMetadata(key, { type: "arrayBuffer" });

    if (!result) {
      return Response.json({ error: "Image not found" }, { status: 404 });
    }

    const contentType = (result.metadata?.contentType as string) || "application/octet-stream";

    return new Response(result.data as ArrayBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (err) {
    console.error("Image fetch error:", err);
    return Response.json({ error: "Failed to retrieve image" }, { status: 500 });
  }
};

export const config: Config = {
  path: "/api/images/:key",
  method: "GET",
};
