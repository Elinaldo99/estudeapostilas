
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fcacygkhjofybcuchcpr.supabase.co';
const supabaseAnonKey = 'sb_publishable_rHfwHjXQVUb8p_ore9yMUA_CV-kHzgL';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function check() {
    console.log('Checking for any variation of "Para Concursos"...');
    
    const { data: h, error } = await supabase
        .from('handouts')
        .select('category');

    if (error) {
        console.error('Error:', error.message);
    } else {
        const found = h.filter(row => row.category.toLowerCase().includes('para concurso'));
        console.log('Found with "para concurso" string:', JSON.stringify(found, null, 2));
    }
}

check();
