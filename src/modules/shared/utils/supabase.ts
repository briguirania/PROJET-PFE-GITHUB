//@ts-ignore
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://qqreygcbxvimeffvctuk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxcmV5Z2NieHZpbWVmZnZjdHVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIxMDA0MTQsImV4cCI6MjAyNzY3NjQxNH0.3MgdIKUkOIQJePKlYQ6-3jWMADhFsaWuaBiGtNb5R_Q'
)
export { supabase }
