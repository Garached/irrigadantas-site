@AGENTS.md

# Irriga Dantas — Novo Site

## Contexto

Site institucional da **Irriga Dantas**, loja de irrigação, bombas e material hidráulico em Araraquara (SP). Substitui um site antigo (FrontPage, anos 90) e acompanha a mudança para uma **nova loja**. Domínio: irrigadantas.com.br.

- **Público:** clientes de Araraquara e região, a maioria acessando pelo celular. O público principal são **produtores e empresas** (projetos agrícolas e de produção); o **residencial e comercial** (jardins) é a segunda linha.
- **Objetivo principal:** gerar contatos e pedidos de orçamento, principalmente de projetos agrícolas e de produção (viveiros, estufas, filtragem e abastecimento, tanques de lona, casas de bombas e automação, fertirrigação), mantendo o atendimento residencial e comercial (jardins e jardins verticais).
- **Ao escrever textos:** fale primeiro com produtores e empresas e cite o residencial depois. Textos que servem aos dois públicos (como "Como funciona" e a faixa de orçamento) devem ser genéricos, sem assumir que o cliente tem um jardim.
- **Fase 1:** site institucional (início, produtos, serviços, projetos, sobre, contato/mapa, WhatsApp fixo, formulário de orçamento).
- **Fase 2:** assistente de orçamento com IA.
- Veja o `README.md` para o checklist completo e os itens "A confirmar".

Quem está conduzindo o projeto está aprendendo desenvolvimento web: **explique as decisões de forma simples** e **peça aprovação antes de mudanças grandes** (novas bibliotecas, mudanças de estrutura, deploy, commits e push).

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 (cores da marca definidas em `src/app/globals.css`, bloco `@theme`)
- Resend para envio de e-mail do formulário; Zod para validar os dados
- Deploy na Vercel

## Comandos

```
npm run dev     # servidor local em http://localhost:3000
npm run build   # build de produção (rode antes de dar o trabalho por concluído)
npm run lint    # verificação de código (ESLint)
```

## Estrutura

- `src/app/` — rotas (cada pasta com `page.tsx` vira uma página). Nomes de rota em português, minúsculas, sem acento: `/servicos`, `/contato`.
- `src/app/orcamento/actions.ts` — Server Action que envia o e-mail do orçamento.
- `src/components/layout/` — Header, Footer, WhatsAppButton.
- `src/components/sections/` — blocos grandes das páginas (Hero, CtaQuote, ContactInfo...).
- `src/components/ui/` — peças pequenas reutilizáveis (ButtonLink, Card, PageHeader, ProjectPhoto, YouTubeEmbed).
- `src/components/forms/` — formulários.
- `src/components/projects/` — página de projetos: cartões e galeria em tela cheia. As abas (`ProjectTabs`) também são usadas em `/servicos`.
- `src/lib/site-config.ts` — **fonte única** dos dados da empresa, incluindo marcas, fotos da fachada, os serviços da página `/servicos` e das opções do formulário de orçamento (`services`) e os projetos da página `/projetos` (`projects`). Serviços e projetos usam as mesmas categorias (`projectCategories`: "Agrícola e Produção" e "Residencial e Comercial").
- `src/lib/public-file.ts` — confere, no servidor, se uma foto existe em `public/` (sem foto, o site mostra um bloco cinza).
- `public/images/projetos/<slug>/` — fotos de cada projeto, numeradas (`01.jpg`, `02.jpg`…). A primeira foto do projeto indicado em `heroProjectSlug` (hoje o Viveiro de Mudas de Eucalipto) é a imagem principal da página inicial.
- `public/images/loja/` — fotos da fachada da nova loja (projeto arquitetônico).
- `src/lib/quote-schema.ts` — campos e regras do formulário de orçamento. O campo "Tipo de projeto" (`tipoProjeto`) é montado a partir de `services` (grupos Agrícola e Residencial) mais o grupo "Loja e outros", definido ali. Cada grupo tem perguntas extras opcionais (`extraFieldsByGroup`) e um exemplo próprio no campo Mensagem; o servidor aceita só as perguntas do grupo escolhido (`readQuoteForm`). Campo novo no formulário também precisa entrar no e-mail (`quoteEmailText`, em `actions.ts`).

## Convenções de código

- Componentes em PascalCase (`QuoteForm.tsx`), com export nomeado (`export function QuoteForm`). Páginas usam `export default`.
- Imports com o atalho `@/` (ex.: `@/components/ui/Card`).
- **Dados da empresa** (endereço, telefone, WhatsApp, horários, e-mail) só em `site-config.ts`, nunca escritos direto nas páginas.
- Server Components por padrão. Use `"use client"` só quando o componente precisar de interação (estado, cliques, hooks).
- Estilo só com classes do Tailwind; use as cores da marca (`brand-*`, `water-*`) em vez de cores soltas.
- Mobile first: escreva o layout para celular e adicione `sm:`/`md:`/`lg:` para telas maiores.
- Todo texto visível em **português do Brasil**. Nomes de variáveis e funções podem ficar em inglês; nomes de rotas e campos de formulário ficam em português.
- Acessibilidade: `alt` em todas as imagens, `label` em todos os campos, `aria-label` em botões só com ícone, bom contraste.
- Cada página define `metadata` (title e description) para o Google.
- Não invente informações da empresa (endereço, telefone, marcas, anos de mercado). Use "A CONFIRMAR" e um comentário `TODO`.

## Segurança — regras obrigatórias

- **NUNCA** coloque chaves de API, senhas, tokens ou qualquer segredo no código, em comentários, em commits ou em mensagens de log.
- **NUNCA** coloque dados pessoais de clientes (nomes, telefones, e-mails de pedidos) no código ou no repositório.
- Segredos ficam **somente** em `.env.local` (no computador, ignorado pelo git) e nas Environment Variables da Vercel.
- `.env.example` lista apenas os **nomes** das variáveis, sem valores reais.
- Variáveis com prefixo `NEXT_PUBLIC_` ficam visíveis no navegador: nunca use esse prefixo para segredos.
- Código que usa segredos roda só no servidor (Server Actions / Route Handlers) e importa `"server-only"`.
- Se encontrar um segredo exposto, pare e avise imediatamente; não faça commit.
- Nunca peça para colarem chaves no chat.
