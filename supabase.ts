import { createClient } from "@supabase/supabase-js";
import { configDotenv } from "dotenv";

configDotenv({ path: "./.env" });

const supabaseUrl = "https://gempasbeulrabmdtyvrf.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY as string;
export const supabase = createClient(supabaseUrl, supabaseKey);
