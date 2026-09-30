# Irriga Dantas — Novo Site

Novo site institucional da **Irriga Dantas**, loja de irrigação, bombas e material hidráulico em Araraquara (SP), desenvolvido do zero com IA como parte central do processo.

## Contexto

O site atual (irrigadantas.com.br) foi criado no Microsoft FrontPage Express, no fim dos anos 90, e nunca foi atualizado. Além disso, as informações da empresa espalhadas pela internet (endereço, telefone) estão desatualizadas e inconsistentes.

A empresa está se mudando para uma **nova loja**, e este projeto acompanha essa mudança: o novo site será lançado junto com o novo endereço.

## Objetivos

- Apresentar a empresa de forma moderna, rápida e pensada para celular
- Centralizar informações corretas e atualizadas (novo endereço, telefone, WhatsApp, horários)
- Gerar contatos e pedidos de orçamento, principalmente para irrigação residencial de jardins
- Manter o domínio irrigadantas.com.br

## Funcionalidades planejadas

**Fase 1 — Site institucional**
- [ ] Página inicial com destaque para os serviços e chamada para orçamento
- [ ] Produtos (irrigação, bombas, material hidráulico)
- [ ] Serviços (instalação de irrigação em jardins residenciais)
- [ ] Projetos realizados: fotos e vídeo de projetos já instalados (sem fotos de "antes e depois")
- [ ] Sobre a empresa
- [ ] Contato e localização da nova loja (mapa, horários)
- [ ] Botão fixo de WhatsApp
- [ ] Formulário "Solicite um orçamento", enviado por e-mail (com WhatsApp e telefones como alternativa)

**Fase 2 — Inteligência artificial**
- [ ] Assistente de orçamento com IA: conversa com o cliente, coleta as informações do jardim e envia um resumo pronto para a equipe

**Lançamento**
- [ ] Publicação em endereço provisório para testes
- [ ] Aprovação do conteúdo pela empresa
- [ ] Apontamento do domínio irrigadantas.com.br para o novo site
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

A página `/projetos` mostra fotos e vídeo de projetos já realizados (não haverá fotos de "antes e depois"):

- **Jardins residenciais:** 2 ou 3 fotos de jardins com irrigação instalada
- **Projeto de irrigação maior:** uma foto, um vídeo do YouTube e outra foto

Enquanto as fotos e o vídeo não chegam, a página mostra blocos cinza ("Foto do projeto" e "Vídeo do projeto") no mesmo tamanho do conteúdo final. Os caminhos das fotos e o link do vídeo ficam em `src/lib/site-config.ts`.

## A confirmar

- Telefones — (16) 3335-6060 e (16) 3335-6161 — e WhatsApp — (16) 3335-6161: confirmar se continuam os mesmos na loja nova
- Endereço e horário da nova loja
- Fotos e vídeo reais dos projetos realizados
- Principais produtos e marcas representadas
- Área de atendimento para instalações

---

© Irriga Dantas. Todos os direitos reservados.
