import {createClient} from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = 'https://nrmzlixopflnlxgqrsop.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ybXpsaXhvcGZsbmx4Z3Fyc29wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMwNDYyNDksImV4cCI6MjA0ODYyMjI0OX0.Jf_yvLichSleOPkCk2hocp1XZMkRc-wcjKAwXHyGnTc';
const supabase = createClient(supabaseUrl, supabaseKey);


export default supabase;