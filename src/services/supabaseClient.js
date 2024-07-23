import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sykdchrxmrtzehhuooeb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiIsInN5a2RjaHJ4bXJ0emVoaHVvb2ViIiwicm9sSI6ImFub24iLCJpYXQiOjE3MjE2NzE4OTAsImV4cCI6MjAzNzI0Nzg5MH0.HW4jTfeq6UGOXw6rKiq9gC8zKuANyhAt9qfvNtKe8dI'

export const supabase = createClient(supabaseUrl, supabaseKey)
