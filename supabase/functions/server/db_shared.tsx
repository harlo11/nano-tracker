import { createClient } from "jsr:@supabase/supabase-js@2.49.8";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY");

if (!SUPABASE_URL) throw new Error("Missing SUPABASE_URL");
if (!SERVICE_ROLE_KEY) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");
if (!ANON_KEY) throw new Error("Missing SUPABASE_ANON_KEY");

export const getSupabaseClient = () => {
  return createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
};

export const getUserSupabaseClient = () => {
  return createClient(SUPABASE_URL, ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
};

export const getRequestSupabaseClient = (request: Request) => {
  const authHeader = request.headers.get("Authorization") || request.headers.get("authorization");
  return createClient(SUPABASE_URL, ANON_KEY, {
    global: {
      headers: {
        Authorization: authHeader ?? "",
        apikey: request.headers.get("apikey") ?? ANON_KEY,
      },
    },
    auth: { persistSession: false, autoRefreshToken: false },
  });
};

export const verifyUser = async (request: Request): Promise<string> => {
  const authHeader = request.headers.get("Authorization") || request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) throw new Error("Unauthorized");
  const supabase = getRequestSupabaseClient(request);
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) throw new Error("Unauthorized");
  return user.id;
};

export const formatDbError = (error: any, operation: string): string => {
  console.error(`[DB Error] ${operation}:`, error);
  return error?.message || `Database error during ${operation}`;
};
