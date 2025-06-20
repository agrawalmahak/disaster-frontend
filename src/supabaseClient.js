import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'ENV_NOT_LOADED';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'ENV_NOT_LOADED';

console.log('🧪 Supabase URL:', supabaseUrl);
console.log('🧪 Supabase Key:', supabaseAnonKey);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
