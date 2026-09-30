import { z } from "zod";

// Tipos de serviço que o cliente pode escolher no formulário.
export const serviceOptions = [
  { value: "irrigacao-jardim", label: "Irrigação de jardim residencial" },
  { value: "bombas", label: "Bombas" },
  { value: "material-hidraulico", label: "Material hidráulico" },
  { value: "outro", label: "Outro assunto" },
] as const;

type ServiceValue = (typeof serviceOptions)[number]["value"];
const serviceValues = serviceOptions.map((o) => o.value) as [ServiceValue, ...ServiceValue[]];

// Regras de cada campo do formulário de orçamento.
// Usado no servidor para conferir os dados antes de enviar o e-mail.
export const quoteSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome.").max(100),
  telefone: z
    .string()
    .trim()
    .min(8, "Informe um telefone ou WhatsApp para contato.")
    .max(30),
  email: z.union([z.literal(""), z.email("E-mail inválido.")]),
  cidade: z.string().trim().min(2, "Informe sua cidade.").max(100),
  servico: z.enum(serviceValues, { error: "Escolha o tipo de serviço." }),
  mensagem: z
    .string()
    .trim()
    .min(10, "Conte um pouco sobre o que você precisa.")
    .max(2000, "Mensagem muito longa (máximo de 2000 caracteres)."),
});

export type QuoteInput = z.infer<typeof quoteSchema>;
export type QuoteField = keyof QuoteInput;
export const quoteFields = Object.keys(quoteSchema.shape) as QuoteField[];

// "Estado" que o servidor devolve para o formulário depois de cada envio.
// - "invalid": algum campo foi preenchido errado (mostramos o erro no campo)
// - "failed": os dados estavam certos, mas o e-mail não foi enviado
//   (mostramos o WhatsApp e os telefones como alternativa)
export type QuoteFormState = {
  status: "idle" | "success" | "invalid" | "failed";
  message: string;
  errors?: Partial<Record<QuoteField, string[]>>;
  // Devolvemos o que a pessoa digitou para não apagar tudo em caso de erro.
  values?: Partial<Record<QuoteField, string>>;
};

export const initialQuoteState: QuoteFormState = { status: "idle", message: "" };

export function serviceLabel(value: string) {
  return serviceOptions.find((o) => o.value === value)?.label ?? value;
}
