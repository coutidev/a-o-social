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
  eventLocationName: string;  // "Praça Napoleão Côrtes Filho (Los Manos)"
  eventCity: string;          // "Curitiba - PR"
  eventGoogleMapsQuery: string;

  // Imagem dos logos dos 3 grupos
  groupsLogoUrl: string;

  // Imagem do QR Code PIX (opcional, null gera o código dinamicamente)
  pixQrCodeImageUrl: string | null;

  // Código PIX Copia e Cola completo (SEM VALOR FIXO - a pessoa digita no banco)
  pixCopyPasteCode: string;

  // Chave PIX legível
  pixKeyDisplay: string;
  pixKeyType: string;

  receiverName: string;
  receiverCity: string;

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
  eventLocationName: "Praça Napoleão Côrtes Filho (Los Manos)",
  eventCity: "Curitiba - PR",
  eventGoogleMapsQuery: "https://www.google.com/maps/search/?api=1&query=Praça+Napoleão+Côrtes+Filho",

  // Imagem oficial dos três emblemas (enviada via Imgur e salva no projeto)
  groupsLogoUrl: "/logos-unidos.png",

  pixQrCodeImageUrl: null,

  /**
   * CÓDIGO PIX COPIA E COLA SEM VALOR FIXO
   * Permite que o doador digite livremente o valor no aplicativo do banco.
   * Substitua este código pelo código gerado na sua conta bancária quando estiver com ele em mãos.
   */
  pixCopyPasteCode:
    "00020126580014BR.GOV.BCB.PIX0136acaosocial.curitiba.unidos@gmail.com5204000053039865802BR5925ACAO SOCIAL JUPES JUREF6008CURITIBA62070503***63041A2F",

  pixKeyDisplay: "acaosocial.curitiba.unidos@gmail.com",
  pixKeyType: "Chave Pix Oficial (Qualquer Valor)",

  receiverName: "Ação Social Conjunta (JUPES • Juventude F.C. • JUREF)",
  receiverCity: "Curitiba - PR",

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
      name: "J.U.P.E.S.",
      fullName: "Grupo J.U.P.E.S.",
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
