/**
 * CONFIGURAÇÃO DA AÇÃO SOCIAL & DADOS DE DOAÇÃO
 */

export interface DonationConfig {
  actionTitle: string;
  year: string;
  headline: string;
  subheadline: string;

  // Informações do Evento
  eventDateFormatted: string; // "18 de Outubro"
  eventDateShort: string;     // "18/10"
  eventLocationName: string; // "Praça Professora Marli Queiroz de Azevedo (Penetras)"
  eventCity: string;          // "Curitiba - PR"
  eventGoogleMapsQuery: string;

  // Imagem dos logos dos 3 grupos
  groupsLogoUrl: string;

  // Imagem do QR Code PIX (opcional, null gera o código dinamicamente)
  pixQrCodeImageUrl: string | null;

  // Chave Pix Oficial em formato E-mail
  pixEmail: string;

  // Código PIX Copia e Cola completo (SEM VALOR FIXO - a pessoa digita no banco)
  pixCopyPasteCode: string;

  // Chave PIX legível
  pixKeyDisplay: string;
  pixKeyType: string;

  receiverName: string;
  receiverCity: string;

  // Meta Pix
  pixGoal: {
    current: number;
    targetLabel?: string;
    target?: number;
  };

  groups: {
    id: string;
    name: string;
    fullName: string;
    handle: string;
    instagramUrl: string;
    description: string;
    badgeText?: string;
  }[];
}

export const DONATION_CONFIG: DonationConfig = {
  actionTitle: "AÇÃO SOCIAL 2026",
  year: "2026",
  headline: "Juntos pela nossa criançada.",
  subheadline:
    "JUPES, Juventude e JUREF se unem por uma causa especial: proporcionar alegria, brinquedos, brincadeiras e momentos inesquecíveis para nossas crianças.",

  // Detalhes do Grande Dia da Ação Social
  eventDateFormatted: "18 de Outubro",
  eventDateShort: "18/10",
  eventLocationName: "Praça Professora Marli Queiroz de Azevedo (Penetras)",
  eventCity: "Curitiba - PR",
  eventGoogleMapsQuery: "https://share.google/XOEMQ7eKsFphSNAQV",

  // Imagem oficial dos três emblemas (enviada via Imgur e salva no projeto)
  groupsLogoUrl: "/logos-unidos.png",

  // Imagem oficial do QR Code Pix enviada pelo organizador
  pixQrCodeImageUrl: "/pix-qrcode.png",

  // Chave Pix Oficial em formato E-mail
  pixEmail: "juvetvnaarea@gmail.com",

  /**
   * CÓDIGO PIX COPIA E COLA / BR CODE SEM VALOR FIXO
   * Vinculado à chave e-mail: juvetvnaarea@gmail.com
   */
  pixCopyPasteCode:
    "00020126440014BR.GOV.BCB.PIX0122juvetvnaarea@gmail.com5204000053039865802BR5918ACAO SOCIAL UNIDOS6008CURITIBA62070503***63049BE2",

  pixKeyDisplay: "juvetvnaarea@gmail.com",
  pixKeyType: "Chave Pix (E-mail)",

  receiverName: "GABRIELLA VITORIA GERVIKAS",
  receiverCity: "Curitiba - PR",

  // Meta Pix com valor arrecadado
  pixGoal: {
    current: 90,
    targetLabel: "O que vier é bênção",
  },

  groups: [
    {
      id: "juref",
      name: "JUREF",
      fullName: "Grupo JUREF",
      handle: "@grupo_juref",
      instagramUrl: "https://www.instagram.com/grupo_juref/",
      description: "Juventude, garra e união ativa pela comunidade.",
      badgeText: "Ação Social",
    },
    {
      id: "jupes",
      name: "JUPES",
      fullName: "Grupo JUPES",
      handle: "@jupesneles",
      instagramUrl: "https://www.instagram.com/jupesneles/",
      description: "Fé, esperança e dedicação contínua às famílias.",
      badgeText: "Solidariedade",
    },
    {
      id: "juventude",
      name: "JUVENTUDE F.C.",
      fullName: "Juventude Futebol Clube (Curitiba 1981)",
      handle: "@juventude1981",
      instagramUrl: "https://www.instagram.com/juventude1981/",
      description: "Tradição esportiva desde 1981 promovendo a solidariedade.",
      badgeText: "Curitiba 1981",
    },
  ],
};
