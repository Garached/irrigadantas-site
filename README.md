# Irriga Dantas — Novo Site

Novo site institucional da **Irriga Dantas**, loja de irrigação, bombas e material hidráulico em Araraquara (SP), desenvolvido do zero com IA como parte central do processo.

## Contexto

O site atual (irrigadantas.com.br) foi criado no Microsoft FrontPage Express, no fim dos anos 90, e nunca foi atualizado. Além disso, as informações da empresa espalhadas pela internet (endereço, telefone) estão desatualizadas e inconsistentes.

A empresa está se mudando para uma **nova loja**, e este projeto acompanha essa mudança: o novo site será lançado junto com o novo endereço.

## Objetivos

- Apresentar a empresa de forma moderna, rápida e pensada para celular
- Centralizar informações corretas e atualizadas (novo endereço, telefone, WhatsApp, horários)
- Gerar contatos e pedidos de orçamento, principalmente de **projetos agrícolas e de produção** (viveiros, estufas, fertirrigação, casas de bombas), mantendo o **atendimento residencial e comercial** (jardins) como segunda linha
- Manter o domínio irrigadantas.com.br

## Posicionamento

O site foi criado inicialmente com foco em irrigação de jardins residenciais, mas o principal público da empresa hoje são **projetos agrícolas e de produção**, como mostra a página `/projetos`. Por isso, o site fala primeiro com produtores e empresas, e o atendimento residencial e comercial aparece como segunda linha.

**Agrícola e Produção** (público principal)
- Irrigação para viveiros
- Nebulização para estufas
- Microaspersão para estufas
- Sistemas de filtragem e abastecimento
- Montagem de tanques de lona
- Casas de bombas e automação
- Fertirrigação

**Residencial e Comercial**
- Irrigação de jardins
- Jardins verticais

A loja (bombas e material hidráulico) continua atendendo os dois públicos.

Onde isso aparece no site:
- **Página inicial:** o destaque principal fala com produtores e empresas. A imagem principal é a primeira foto do projeto "Irrigação para Viveiro de Mudas de Eucalipto" (definido em `heroProjectSlug`, no `site-config.ts`); enquanto não houver foto, aparece um bloco cinza.
- **Serviços:** abas "Agrícola e Produção" (aberta por padrão) e "Residencial e Comercial". A lista de serviços fica em `services`, no `site-config.ts`.
- **Formulário de orçamento:** campo "Tipo de projeto" com perguntas diferentes para cada público (próxima etapa).

## Funcionalidades planejadas

**Fase 1 — Site institucional**
- [ ] Início: apresentação, destaques e chamada para orçamento
- [ ] Serviços: separados em duas categorias, como na página de projetos (veja "Posicionamento" abaixo)
- [ ] Como funciona: etapas genéricas do atendimento (conversa, visita e projeto, orçamento, instalação), que servem aos dois públicos
- [ ] Projetos: fotos e vídeos incorporados do YouTube de projetos já realizados (sem fotos de "antes e depois")
- [ ] Produtos: vitrine por categoria (irrigação, bombas, material hidráulico), sem preços, com botão "Consultar no WhatsApp"
- [ ] Marcas com que trabalhamos
- [ ] Sobre a empresa
- [ ] Contato: endereço da nova loja, mapa, horários e área de atendimento
- [ ] Botão fixo de WhatsApp em todas as páginas
- [ ] "Solicite um orçamento" em destaque no topo, na página inicial e em página própria, enviado por e-mail (com WhatsApp e telefones como alternativa)

**Fase 2 — Inteligência artificial**
- [ ] Assistente de orçamento com IA: conversa com o cliente, coleta as informações do projeto (agrícola ou residencial) e envia um resumo pronto para a equipe

**Ideias futuras**
- [ ] Dicas de irrigação (artigos curtos para ajudar o site a aparecer no Google)

**Lançamento**
- [ ] Publicação em endereço provisório para testes
- [ ] Aprovação do conteúdo pela empresa
- [ ] Apontamento do domínio irrigadantas.com.br para o novo site
  - ⚠️ Na configuração de DNS, alterar **apenas os registros do site** (A/CNAME) para a Vercel e **manter os registros de e-mail (MX)** como estão, para não interromper o e-mail da empresa (irrigadantas@irrigadantas.com.br)
- [ ] Criação/atualização do Perfil da Empresa no Google

## Processo de desenvolvimento com IA

Este projeto é desenvolvido com o **Claude Code** como ferramenta principal. As instruções dadas ao agente ficam documentadas no arquivo `CLAUDE.md`, e as decisões, erros corrigidos e aprendizados serão registrados ao longo do projeto.

## Tecnologias

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com)
- [Resend](https://resend.com) para envio dos pedidos de orçamento por e-mail
- Hospedagem na [Vercel](https://vercel.com)

## Como rodar localmente

1. Instale o [Node.js](https://nodejs.org) (versão LTS)
2. `npm install`
3. Copie `.env.example` para `.env.local` e preencha as variáveis (nunca faça commit desse arquivo)
4. `npm run dev` e abra http://localhost:3000

## Pedidos de orçamento

Os pedidos feitos pelo formulário do site são enviados **por e-mail**, pelo serviço Resend. O e-mail que recebe os pedidos é definido na variável de ambiente `QUOTE_TO_EMAIL` (veja `.env.example`), então pode ser trocado sem mexer no código. Se o envio falhar, o site mostra o WhatsApp e os telefones da loja como alternativa.

## Página de projetos

A página `/projetos` mostra projetos já realizados, separados em duas abas: **Agrícola e Produção** (aberta por padrão) e **Residencial e Comercial**. Não haverá fotos de "antes e depois".

**Agrícola e Produção**
1. Irrigação para Viveiro de Mudas de Eucalipto (fotos e vídeo, em destaque)
2. Nebulização para Estufas (fotos e vídeo)
3. Microaspersão para Estufas
4. Sistema de Filtragem e Abastecimento
5. Montagem de Tanque de Lona
6. Casa de Bombas e Automação para Irrigação
7. Casa de Bombas e Sistema de Fertirrigação

**Residencial e Comercial**

8. Irrigação de Jardim
9. Irrigação de Jardim Vertical em Loja

Cada projeto mostra até 3 fotos e um botão "Ver todas as fotos", que abre uma galeria em tela cheia. Nos projetos com vídeo, o vídeo do YouTube é o elemento principal, com as fotos menores abaixo; os projetos só com fotos aparecem em duas colunas.

As fotos ficam em `public/images/projetos/<pasta-do-projeto>/` (ex.: `viveiro-eucalipto/`), numeradas com 2 dígitos (`01.jpg`, `02.jpg`…). Os dados de cada projeto (título, categoria, fotos, link do vídeo e descrição) ficam em `src/lib/site-config.ts`; as 3 primeiras fotos da lista são as que aparecem no cartão. Enquanto não houver fotos ou vídeo, a página mostra blocos cinza no lugar.

## Nova loja

- **Endereço:** Rua Dr. Walter Medeiros Mauro, 363 – Araraquara/SP (esquina com a Av. Queiroz Filho)
- **Horário:** segunda a sexta, das 8h às 18h; sábado, das 8h às 12h
- **Fotos da fachada (provisórias):** são imagens do projeto arquitetônico, não fotos da loja pronta. Devem ser trocadas por fotos reais quando a loja estiver pronta. Ficam em `public/images/loja/` (`fachada_principal.jpeg`, `fachada_estacionamento.jpeg` e `fachada_lateral.jpeg`) e aparecem na página inicial (seção "Nossa nova loja") e na página de contato, com a etiqueta "Nova loja em breve". Se um arquivo faltar, o site mostra um bloco cinza no lugar.

## A confirmar

- Telefones — (16) 3335-6060 e (16) 3335-6161 — e WhatsApp — (16) 3335-6161: confirmar se continuam os mesmos na loja nova
- Bairro e CEP da nova loja
- Fotos reais da fachada, para substituir as imagens provisórias do projeto arquitetônico
- Fotos e vídeos dos projetos realizados
- Descrições dos 9 projetos (hoje estão "A CONFIRMAR")
- Descrições dos serviços: hoje são textos técnicos genéricos, que precisam ser revisados pela empresa
- Primeira foto do Viveiro de Mudas de Eucalipto (imagem principal da página inicial)
- Principais produtos e marcas representadas
- Área de atendimento para instalações
- Autorização dos clientes para mostrar fotos e vídeos dos projetos

---

© Irriga Dantas. Todos os direitos reservados.
