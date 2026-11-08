import { supabase } from "@/integrations/supabase/client";

const BUCKET = "site-media";

/** Uploads a file to the media library and returns a stable public URL served by the site. */
export async function uploadMedia(file: File, folder: string): Promise<string> {
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "31536000",
    contentType: file.type || undefined,
    upsert: false,
  });
  if (error) throw error;
  return `/api/public/media/${path}`;
}

/** Removes an uploaded file if the URL points at the media library (bundled images are left alone). */
export async function removeMedia(url: string) {
  const prefix = "/api/public/media/";
  if (!url.startsWith(prefix)) return;
  await supabase.storage.from(BUCKET).remove([url.slice(prefix.length)]);
}
