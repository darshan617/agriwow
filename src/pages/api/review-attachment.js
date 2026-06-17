const ALLOWED_HOST = "goyalinfotech.in";

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const parsed = new URL(url);
    if (
      parsed.hostname !== ALLOWED_HOST &&
      !parsed.hostname.endsWith(`.${ALLOWED_HOST}`)
    ) {
      return res.status(403).json({ error: "URL not allowed" });
    }

    const response = await fetch(url);
    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Failed to fetch attachment" });
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    const contentType =
      response.headers.get("content-type") || "application/octet-stream";

    res.setHeader("Content-Type", contentType);
    res.status(200).send(buffer);
  } catch {
    res.status(500).json({ error: "Failed to fetch attachment" });
  }
}
