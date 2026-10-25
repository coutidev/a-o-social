/**
 * CONFIGURAÇÃO DA AÇÃO SOCIAL & DADOS DE DOAÇÃO
 */

export interface DonationConfig {
  actionTitle: string;
  year: string;
  headline: string;
  subheadline: string;

  // Informações do Evento
  eventDateFormatted: string; // "20 de Dezembro"
  eventDateShort: string;     // "20/12"
  eventLocationName: string; // "Parque do Semeador"
  eventAddress: string;       // "Rua Coronel Joaquim Antonio de Azevedo, n.º 920"
  eventNeighborhood: string;  // "Sítio Cercado"
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

  sponsors: {
    id: string;
    name: string;
    category?: string;
    description?: string;
    logoUrl?: string;
    instagramHandle?: string;
    instagramUrl?: string;
    websiteOrInstagram?: string;
  }[];

  accountability: {
    statusNote: string;
    lastUpdated: string;
    allocatedExpenses: {
      category: string;
      description: string;
      estimatedOrSpentAmount: number;
      percentage: number;
      status: "Planejado" | "Adquirido" | "Entregue";
    }[];
  };

  mottoMain: string;
  mottoComplement: string;
  impactNumbers: {
    children: string;
    childrenLabel: string;
    raised: string;
    raisedLabel: string;
    volunteers: string;
    volunteersLabel: string;
    groups: string;
    groupsLabel: string;
  };

  gallery: {
    id: string;
    title: string;
    category: "Brinquedos" | "Brincadeiras" | "Comunidade";
    description: string;
    imageUrl: string;
  }[];
}

export const DONATION_CONFIG: DonationConfig = {
  actionTitle: "AÇÃO SOCIAL 2026",
  year: "2026",
  headline: "Juntos pela nossa criançada.",
  subheadline:
    "JUPES, Juventude e JUREF se unem por uma causa especial: proporcionar alegria, brinquedos, brincadeiras e momentos inesquecíveis para nossas crianças.",

  // Detalhes do Grande Dia da Ação Social
  eventDateFormatted: "20 de Dezembro",
  eventDateShort: "20/12",
  eventLocationName: "Parque do Semeador",
  eventAddress: "Rua Coronel Joaquim Antonio de Azevedo, n.º 920",
  eventNeighborhood: "Sítio Cercado",
  eventCity: "Curitiba - PR",
  eventGoogleMapsQuery: "https://www.google.com/maps/search/?api=1&query=Rua+Coronel+Joaquim+Antonio+de+Azevedo,+920+-+S%C3%ADtio+Cercado,+Curitiba+-+PR",

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
    current: 2225,
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

  // Patrocinadores e Parceiros da Ação Social
  sponsors: [
    {
      id: "brothers-gym",
      name: "Brothers Gym",
      category: "Fitness & Academia",
      logoUrl: "/sponsors/brothers-gym.png",
      instagramHandle: "@brothersgym.cwb",
      instagramUrl: "https://www.instagram.com/brothersgym.cwb/",
    },
    {
      id: "mecanica-dsa",
      name: "Mecânica DSA",
      category: "Automotivo & Manutenção",
      logoUrl: "/sponsors/mecanica-dsa.png",
      instagramHandle: "@mecanica_dsa",
      instagramUrl: "https://www.instagram.com/mecanica_dsa/",
    },
    {
      id: "grafica-vennux",
      name: "Gráfica Vênnux",
      category: "Gráfica & Comunicação Visual",
      logoUrl: "/sponsors/grafica-vennux.png",
      instagramHandle: "@graficavennux",
      instagramUrl: "https://www.instagram.com/graficavennux/",
    },
    {
      id: "acos-moura",
      name: "Aços Moura",
      category: "Aços & Construção",
      logoUrl: "/sponsors/acos-moura.png",
      instagramHandle: "@acosmoura",
      instagramUrl: "https://www.instagram.com/acosmoura/",
    },
    {
      id: "tonchak-variedades",
      name: "Tonchak Variedades",
      category: "Variedades & Comércio Local",
      logoUrl: "/sponsors/tonchak-variedades.png",
      instagramHandle: "@tonchak.variedades",
      instagramUrl: "https://www.instagram.com/tonchak.variedades/",
    },
    {
      id: "armazem-das-malhas",
      name: "Armazém das Malhas",
      category: "Moda & Confecções",
      logoUrl: "/sponsors/armazem-das-malhas.png",
      instagramHandle: "@armazemdasmalhas.parana",
      instagramUrl: "https://www.instagram.com/armazemdasmalhas.parana/",
    },
    {
      id: "drumcell",
      name: "DrumCell - Assistência Técnica",
      category: "Tecnologia & Assistência Celular",
      logoUrl: "/sponsors/drumcell.png",
      instagramHandle: "@drumcell_novomundo",
      instagramUrl: "https://www.instagram.com/drumcell_novomundo/",
    },
    {
      id: "estrela-seguros",
      name: "Estrela Seguros",
      category: "Seguros & Proteção",
      logoUrl: "/sponsors/estrela-seguros.png",
      instagramHandle: "@estrelaseguros_",
      instagramUrl: "https://www.instagram.com/estrelaseguros_/",
    },
    {
      id: "operacao-lazer",
      name: "Operação Lazer e Eventos",
      category: "Lazer, Brincadeiras & Festas",
      logoUrl: "/sponsors/operacao-lazer.png",
      instagramHandle: "@operacaolazereeventos",
      instagramUrl: "https://www.instagram.com/operacaolazereeventos/",
    },
    {
      id: "housecar",
      name: "HouseCar",
      category: "Estética & Serviços Automotivos",
      logoUrl: "/sponsors/housecar.png",
      instagramHandle: "@hoouse_car",
      instagramUrl: "https://www.instagram.com/hoouse_car/",
    },
    {
      id: "gabi-gervikas",
      name: "Gabi Gervikas - Estética",
      category: "Saúde & Estética",
      logoUrl: "/sponsors/gabi-gervikas.png",
      instagramHandle: "@gabigervikas_estetica",
      instagramUrl: "https://www.instagram.com/gabigervikas_estetica/",
    },
    {
      id: "dra-eliane-camargo",
      name: "Dra. Eliane Camargo",
      category: "Saúde & Atendimento Médico",
      logoUrl: "/sponsors/dra-eliane-camargo.png",
      instagramHandle: "@dra.elianecamargo",
      instagramUrl: "https://www.instagram.com/dra.elianecamargo/",
    },
    {
      id: "sede-1981",
      name: "Sede 1981 Lounge Bar",
      category: "Gastronomia & Convivência",
      logoUrl: "/sponsors/sede-1981.png",
      instagramHandle: "@sede1981lounge",
      instagramUrl: "https://www.instagram.com/sede1981lounge/",
    },
    {
      id: "professor-silberto",
      name: "Professor Silberto",
      category: "Educação & Apoio Comunitário",
      logoUrl: "/sponsors/professor-silberto.png",
      instagramHandle: "@professorsilberto",
      instagramUrl: "https://www.instagram.com/professorsilberto/",
    },
    {
      id: "dl-feiras-eventos",
      name: "DL Feiras e Eventos",
      category: "Estrutura & Feiras de Eventos",
      logoUrl: "/sponsors/dl-feiras-eventos.png",
      instagramHandle: "@dl_feiraseeventos",
      instagramUrl: "https://www.instagram.com/dl_feiraseeventos/",
    },
  ],

  // Prestação de Contas e Transparência
  accountability: {
    statusNote: "Prestação de contas contínua. 100% dos recursos arrecadados via Pix e doações físicas são direcionados exclusivamente para a realização do evento do Dia das Crianças.",
    lastUpdated: "Outubro de 2026",
    allocatedExpenses: [
      {
        category: "Brinquedos & Lembrancinhas",
        description: "Compra de brinquedos educativos, bolas, bonecas e lembrancinhas entregues diretamente para cada criança.",
        estimatedOrSpentAmount: 1100,
        percentage: 50,
        status: "Planejado",
      },
      {
        category: "Alimentação & Lanches",
        description: "Pães de cachorro-quente, salsichas, molhos, pipoca, algodão doce, sucos e refrigerantes para todas as famílias.",
        estimatedOrSpentAmount: 700,
        percentage: 31,
        status: "Planejado",
      },
      {
        category: "Recreação, Brincadeiras & Som",
        description: "Aluguel de cama elástica, brinquedos infláveis, tintas faciais, bexigas e estrutura de som/música.",
        estimatedOrSpentAmount: 300,
        percentage: 14,
        status: "Planejado",
      },
      {
        category: "Descartáveis & Higiene",
        description: "Copos descartáveis, guardanapos, sacos de lixo e suporte de limpeza para manter a praça limpa e organizada.",
        estimatedOrSpentAmount: 125,
        percentage: 5,
        status: "Planejado",
      },
    ],
  },

  mottoMain: "Juntos, fazemos a diferença.",
  mottoComplement:
    "Uma comunidade unida por um propósito: levar alegria, esperança e solidariedade às crianças.",

  impactNumbers: {
    children: "500+",
    childrenLabel: "Crianças alcançadas em 2026",
    raised: "R$ 2.225",
    raisedLabel: "Arrecadados via Pix",
    volunteers: "60+",
    volunteersLabel: "Voluntários e monitores",
    groups: "3",
    groupsLabel: "Grupos unidos da comunidade",
  },

  gallery: [
    {
      id: "gal-1",
      title: "Entrega de Brinquedos e Presentes",
      category: "Brinquedos",
      description: "Cada criança recebe brinquedos novos, bolas e kits pedagógicos preparados com muito amor.",
      imageUrl: "/card-brinquedos.jpeg",
    },
    {
      id: "gal-2",
      title: "Recreação, Brincadeiras e Alegria",
      category: "Brincadeiras",
      description: "Gincanas, cama elástica, pintura facial e esportes animando a garotada na praça.",
      imageUrl: "/card-brincadeiras.jpeg",
    },
    {
      id: "gal-3",
      title: "Comunidade e Famílias Unidas",
      category: "Comunidade",
      description: "Moradores, voluntários e torcidas reunidos por uma causa nobre no Sítio Cercado.",
      imageUrl: "/card-comunidade.jpeg",
    },
    {
      id: "gal-4",
      title: "União Oficial JUPES • JUVENTUDE • JUREF",
      category: "Comunidade",
      description: "Os três emblemas históricos unidos pelo mesmo objetivo social.",
      imageUrl: "/logos-unidos.png",
    },
  ],
};
