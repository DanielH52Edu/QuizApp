import {createClient} from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = 'https://nrmzlixopflnlxgqrsop.supabase.co';
const supabaseKey = 'PLEASE USE TOKEN FROM TOKEN.TXT SUBMITTED IN D2L';
const supabase = createClient(supabaseUrl, supabaseKey);


export default supabase;