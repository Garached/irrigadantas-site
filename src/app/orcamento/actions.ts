"use server";

// Server Action: esta função roda SÓ no servidor (na Vercel), nunca no navegador.
// Por isso ela pode usar a chave secreta do Resend com segurança.
import "server-only";
import { Resend } from "resend";
import { z } from "zod";
import {
  extraFieldInfo,
  extraFieldsByGroup,
  projectTypeGroup,
  projectTypeLabel,
  quoteSchema,
  readQuoteForm,
  type QuoteFormState,
  type QuoteInput,
} from "@/lib/quote-schema";

// Nome do campo invisível que só robôs de spam preenchem.
const HONEYPOT_FIELD = "website";

const SEND_FAILED_MESSAGE =
  "Não foi possível enviar seu pedido agora. Por favor, fale com a gente pelo WhatsApp ou por telefone:";

export async function sendQuote(
  _prevState: QuoteFormState,
  formData: FormData,
): Promise<QuoteFormState> {
  // Só as perguntas extras do grupo escolhido são aceitas (veja readQuoteForm).
  const values = readQuoteForm(formData);

  // Robô detectado: fingimos sucesso e não enviamos nada.
  if (String(formData.get(HONEYPOT_FIELD) ?? "") !== "") {
    return { status: "success", message: "Pedido enviado! Em breve entraremos em contato." };
  }

  const parsed = quoteSchema.safeParse(values);
  if (!parsed.success) {
    return {
      status: "invalid",
      message: "Confira os campos destacados.",
      errors: z.flattenError(parsed.error).fieldErrors,
      values,
    };
  }

  // Configurações: vêm do .env.local (no seu computador) ou da Vercel.
  // QUOTE_TO_EMAIL é o e-mail que recebe os orçamentos; trocá-lo não exige mudar o código.
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_TO_EMAIL;
  const from = process.env.QUOTE_FROM_EMAIL || "Site Irriga Dantas <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.error("Envio de orçamento: RESEND_API_KEY ou QUOTE_TO_EMAIL não configurados.");
    return { status: "failed", message: SEND_FAILED_MESSAGE, values };
  }

  const data = parsed.data;
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    subject: `Orçamento: ${projectTypeLabel(data.tipoProjeto)} — ${data.nome}`,
    text: quoteEmailText(data),
    // "Responder" no e-mail já vai direto para o cliente.
    replyTo: data.email || undefined,
  });

  if (error) {
    console.error("Envio de orçamento: falha no Resend.", error);
    return { status: "failed", message: SEND_FAILED_MESSAGE, values };
  }

  return { status: "success", message: "Pedido enviado! Em breve entraremos em contato." };
}

// Texto do e-mail. As perguntas extras do grupo aparecem sempre (com "(não informado)"
// quando vazias), para a equipe saber que a pergunta foi feita.
function quoteEmailText(data: QuoteInput) {
  const group = projectTypeGroup(data.tipoProjeto);
  const extras = group ? extraFieldsByGroup[group.id] : [];

  return [
    "Novo pedido de orçamento pelo site",
    "",
    `Nome: ${data.nome}`,
    `Telefone/WhatsApp: ${data.telefone}`,
    `E-mail: ${data.email || "(não informado)"}`,
    `Cidade: ${data.cidade}`,
    "",
    `Tipo de projeto: ${projectTypeLabel(data.tipoProjeto)}`,
    `Categoria: ${group?.label ?? "(desconhecida)"}`,
    ...extras.map((field) => `${extraFieldInfo[field].label}: ${data[field] || "(não informado)"}`),
    "",
    "Mensagem:",
    data.mensagem,
  ].join("\n");
}
