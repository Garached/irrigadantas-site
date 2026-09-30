// Fonte única dos dados da empresa.
// Tudo que aparece no site (endereço, telefone, horários...) vem daqui.
// Para atualizar uma informação, mude só neste arquivo.
//
// ATENÇÃO: os valores marcados com "A CONFIRMAR" são provisórios
// (veja a seção "A confirmar" do README).

export const siteConfig = {
  name: "Irriga Dantas",
  description:
    "Irrigação, bombas e material hidráulico em Araraquara (SP). Instalação de irrigação para jardins residenciais.",
  url: "https://irrigadantas.com.br",

  contact: {
    // Telefones fixos. TODO: confirmar se continuam os mesmos na loja nova.
    phones: [
      { display: "(16) 3335-6060", href: "+551633356060" },
      { display: "(16) 3335-6161", href: "+551633356161" },
    ],
    whatsapp: {
      display: "(16) 3335-6161",
      // Só números: 55 (Brasil) + DDD + número.
      number: "551633356161",
      defaultMessage: "Olá! Vim pelo site e gostaria de mais informações.",
    },
    email: "irrigadantas@irrigadantas.com.br",
  },

  address: {
    street: "Rua Dr. Walter Medeiros Mauro, 363",
    reference: "Esquina com a Av. Queiroz Filho",
    neighborhood: "A CONFIRMAR", // bairro
    zip: "A CONFIRMAR", // CEP, formato "00000-000"
    city: "Araraquara",
    state: "SP",
  },

  hours: [
    { days: "Segunda a sexta", time: "8h às 18h" },
    { days: "Sábado", time: "8h às 12h" },
  ],

  // Fotos da fachada (imagens do projeto arquitetônico da nova loja).
  // Se o arquivo não existir em public/, o site mostra um bloco cinza no lugar.
  // O caminho precisa bater exatamente com o nome e a extensão do arquivo.
  storefront: {
    main: { src: "/images/loja/fachada_principal.jpeg", alt: "Projeto da fachada principal da nova loja da Irriga Dantas" },
    parking: {
      src: "/images/loja/fachada_estacionamento.jpeg",
      alt: "Projeto do estacionamento da nova loja da Irriga Dantas, com vagas e portão",
    },
    side: { src: "/images/loja/fachada_lateral.jpeg", alt: "Projeto da fachada lateral da nova loja da Irriga Dantas, vista do alto na esquina" },
  },

  // Marcas representadas. TODO: preencher com a empresa (README, "A confirmar").
  // Exemplo: brands: ["Marca A", "Marca B"]
  brands: [] as string[],

  // Página /projetos. Campo vazio ("") = a página mostra um bloco cinza no lugar.
  // Fotos: coloque o arquivo em public/images/projetos/ e preencha o "src"
  //   (ex.: "/images/projetos/jardim-1.jpg"). Formato ideal: 4:3 (deitada).
  // Vídeo: cole o link do YouTube (youtube.com/watch?v=... ou youtu.be/...).
  // Para ter só 2 fotos de jardins, apague uma das linhas de "gardens".
  projects: {
    gardens: [
      { src: "", alt: "Jardim residencial com irrigação instalada" },
      { src: "", alt: "Jardim residencial com irrigação instalada" },
      { src: "", alt: "Jardim residencial com irrigação instalada" },
    ],
    featured: {
      title: "Projeto de irrigação de grande porte",
      description: "Descrição do projeto — A CONFIRMAR.",
      photoBefore: { src: "", alt: "Projeto de irrigação de grande porte" },
      videoUrl: "",
      photoAfter: { src: "", alt: "Projeto de irrigação de grande porte" },
    },
  },

  nav: [
    { href: "/", label: "Início" },
    { href: "/produtos", label: "Produtos" },
    { href: "/servicos", label: "Serviços" },
    { href: "/projetos", label: "Projetos" },
    { href: "/sobre", label: "Sobre" },
    { href: "/contato", label: "Contato" },
  ],
};

const isConfirmed = (value: string) => value !== "" && !value.includes("A CONFIRMAR");

// Endereço em uma linha. Bairro e CEP só aparecem depois de confirmados.
// Ex.: "Rua Dr. Walter Medeiros Mauro, 363 – Araraquara/SP"
export function fullAddress() {
  const { street, neighborhood, zip, city, state } = siteConfig.address;
  const parts = [street];
  if (isConfirmed(neighborhood)) parts.push(neighborhood);
  parts.push(`${city}/${state}`);
  const line = parts.join(" – ");
  return isConfirmed(zip) ? `${line} – CEP ${zip}` : line;
}

// Link que abre o endereço no app/site do Google Maps.
export function mapsUrl() {
  const { street, city, state } = siteConfig.address;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${street}, ${city} - ${state}`)}`;
}

// Monta o link do WhatsApp que abre a conversa com a mensagem já escrita.
export function whatsappUrl(message: string = siteConfig.contact.whatsapp.defaultMessage) {
  return `https://wa.me/${siteConfig.contact.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

// Extrai o código do vídeo de um link do YouTube e monta o link de incorporação.
// Usa youtube-nocookie.com, que não grava cookies de rastreamento até a pessoa dar play.
export function youtubeEmbedUrl(url: string) {
  const match = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([A-Za-z0-9_-]{11})/);
  return match ? `https://www.youtube-nocookie.com/embed/${match[1]}` : null;
}
