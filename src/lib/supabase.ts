import { createClient } from '@supabase/supabase-js';

export interface MuralMessage {
  id: string;
  name: string;
  message: string;
  approved: boolean;
  created_at: string;
}

const rawUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
// Garante compatibilidade mesmo se o usuário copiar com /rest/v1/ do painel Data API
const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith('https://') &&
    !supabaseUrl.includes('placeholder')
  );
};

export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Mensagens padrão de exemplo caso o Supabase ainda esteja sendo configurado pelo usuário
const FALLBACK_APPROVED_MESSAGES: MuralMessage[] = [
  {
    id: 'seed-1',
    name: 'Nicolas Couti',
    message: 'Que seja um dia inesquecível e cheio de alegria pra toda a nossa criançada! 🤍 Que Deus abençoe cada um.',
    approved: true,
    created_at: '2026-10-01T10:00:00Z',
  },
  {
    id: 'seed-2',
    name: 'Família JUPES',
    message: 'Tamo junto nessa missão linda! Cada sorriso no rosto de uma criança faz tudo valer a pena.',
    approved: true,
    created_at: '2026-10-01T09:30:00Z',
  },
  {
    id: 'seed-3',
    name: 'Galera da Juventude F.C.',
    message: 'O esporte e a solidariedade caminhando lado a lado pela nossa comunidade. Parabéns a todos os envolvidos!',
    approved: true,
    created_at: '2026-10-01T09:00:00Z',
  },
  {
    id: 'seed-4',
    name: 'JUREF',
    message: 'União que transforma! Dia 18/10 vai ser histórico no Sítio Cercado.',
    approved: true,
    created_at: '2026-10-01T08:15:00Z',
  }
];

// Sanitização estrita contra scripts e tags HTML
export function sanitizeText(text: string): string {
  return text
    .replace(/<[^>]*>?/gm, '') // Remove tags HTML
    .replace(/javascript:/gi, '') // Remove URLs javascript
    .trim();
}

/**
 * Busca apenas mensagens com approved = true, ordenadas pelas mais recentes primeiro.
 */
export async function fetchApprovedMessages(): Promise<MuralMessage[]> {
  if (!isSupabaseConfigured() || !supabase) {
    // Retorna fallback se ainda não configurado
    const savedLocal = localStorage.getItem('social_action_approved_messages');
    if (savedLocal) {
      try {
        return JSON.parse(savedLocal);
      } catch {
        return FALLBACK_APPROVED_MESSAGES;
      }
    }
    return FALLBACK_APPROVED_MESSAGES;
  }

  try {
    const { data, error } = await supabase
      .from('messages')
      .select('id, name, message, approved, created_at')
      .eq('approved', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Erro ao carregar mensagens do Supabase, usando fallback:', error.message);
      return FALLBACK_APPROVED_MESSAGES;
    }

    return (data as MuralMessage[]) || [];
  } catch (err) {
    console.error('Falha de conexão com Supabase:', err);
    return FALLBACK_APPROVED_MESSAGES;
  }
}

/**
 * Envia uma mensagem para o mural.
 * Sempre salva com approved = false para passar por moderação humana.
 */
export async function submitMuralMessage(
  name: string,
  message: string
): Promise<{ success: boolean; error?: string }> {
  const cleanName = sanitizeText(name);
  const cleanMessage = sanitizeText(message);

  if (!cleanName || cleanName.length < 2) {
    return { success: false, error: 'Por favor, digite seu nome ou apelido (mínimo 2 caracteres).' };
  }

  if (!cleanMessage || cleanMessage.length < 3) {
    return { success: false, error: 'Por favor, escreva uma mensagem com pelo menos 3 caracteres.' };
  }

  if (cleanMessage.length > 200) {
    return { success: false, error: 'A mensagem não pode ter mais de 200 caracteres.' };
  }

  // Se Supabase estiver configurado, envia para a tabela 'messages'
  if (isSupabaseConfigured() && supabase) {
    try {
      const { error } = await supabase.from('messages').insert([
        {
          name: cleanName,
          message: cleanMessage,
          approved: false, // Regra estrita: sempre false no envio público
        },
      ]);

      if (error) {
        console.error('Erro Supabase ao salvar mensagem:', error);
        return { 
          success: false, 
          error: error.message || 'Erro ao salvar no banco de dados. Tente novamente mais tarde.' 
        };
      }

      return { success: true };
    } catch (err: any) {
      console.error('Exceção ao salvar mensagem:', err);
      return { 
        success: false, 
        error: 'Falha de comunicação com o servidor. Tente novamente.' 
      };
    }
  }

  // Modo local simulado para testes caso o projeto ainda não tenha as credenciais do Supabase
  const tempPending = {
    id: `local-${Date.now()}`,
    name: cleanName,
    message: cleanMessage,
    approved: false,
    created_at: new Date().toISOString(),
  };

  const pendingList = JSON.parse(localStorage.getItem('social_action_pending_messages') || '[]');
  pendingList.unshift(tempPending);
  localStorage.setItem('social_action_pending_messages', JSON.stringify(pendingList));

  return { success: true };
}

/**
 * Formata datas no padrão DD/MM/AAAA
 */
export function formatMessageDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return 'Hoje';
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  } catch {
    return '01/10/2026';
  }
}
