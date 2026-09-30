"use server";

// Server Action: esta função roda SÓ no servidor (na Vercel), nunca no navegador.
// Por isso ela pode usar a chave secreta do Resend com segurança.
import "server-only";
import { Resend } from "resend";
import { z } from "zod";
import {
  quoteFields,
  quoteSchema,
  serviceLabel,
  type QuoteFormState,
} from "@/lib/quote-schema";

// Nome do campo invisível que só robôs de spam preenchem.
const HONEYPOT_FIELD = "website";

const SEND_FAILED_MESSAGE =
  "Não foi possível enviar seu pedido agora. Por favor, fale com a gente pelo WhatsApp ou por telefone:";

export async function sendQuote(
  _prevState: QuoteFormState,
  formData: FormData,
): Promise<QuoteFormState> {
  const values = Object.fromEntries(
    quoteFields.map((field) => [field, String(formData.get(field) ?? "")]),
  );

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
  const text = [
    "Novo pedido de orçamento pelo site",
    "",
    `Nome: ${data.nome}`,
    `Telefone/WhatsApp: ${data.telefone}`,
    `E-mail: ${data.email || "(não informado)"}`,
    `Cidade: ${data.cidade}`,
    `Serviço: ${serviceLabel(data.servico)}`,
    "",
    "Mensagem:",
    data.mensagem,
  ].join("\n");

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    subject: `Orçamento: ${serviceLabel(data.servico)} — ${data.nome}`,
    text,
    // "Responder" no e-mail já vai direto para o cliente.
    replyTo: data.email || undefined,
  });

  if (error) {
    console.error("Envio de orçamento: falha no Resend.", error);
    return { status: "failed", message: SEND_FAILED_MESSAGE, values };
  }

  return { status: "success", message: "Pedido enviado! Em breve entraremos em contato." };
}
