// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://yaogjjjqnmcwtsrjhthp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlhb2dqampxbm1jd3RzcmpodGhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1Mjg0MjYsImV4cCI6MjA1OTEwNDQyNn0.NqHeGjMe4jzOMx8H-afuf_ALPcaAn2ZMk-ZmatDneEc";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);