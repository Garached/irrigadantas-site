import { z } from "zod";
import { projectCategories, services } from "@/lib/site-config";

// ---------------------------------------------------------------------------
// "Tipo de projeto": opções agrupadas
// ---------------------------------------------------------------------------
// Os grupos Agrícola e Residencial vêm da lista "services" do site-config.ts
// (serviço novo lá = opção nova aqui). "Loja e outros" fica definido aqui.

export type ProjectTypeGroupId = (typeof projectCategories)[number]["id"] | "loja";

type ProjectTypeOption = { value: string; label: string };
type ProjectTypeGroup = { id: ProjectTypeGroupId; label: string; options: ProjectTypeOption[] };

const storeOptions: ProjectTypeOption[] = [
  { value: "bombas", label: "Bombas" },
  { value: "material-hidraulico", label: "Material hidráulico" },
  { value: "outro", label: "Outro assunto" },
];

export const projectTypeGroups: ProjectTypeGroup[] = [
  ...projectCategories.map((category) => ({
    id: category.id,
    label: category.label,
    options: services
      .filter((s) => s.category === category.id)
      .map((s) => ({ value: s.slug, label: s.title })),
  })),
  { id: "loja", label: "Loja e outros", options: storeOptions },
];

const allOptions = projectTypeGroups.flatMap((g) => g.options.map((o) => ({ ...o, group: g })));

// Grupo de uma opção (ex.: "fertirrigacao" → Agrícola e Produção). Opção desconhecida = undefined.
export function projectTypeGroup(value: string) {
  return allOptions.find((o) => o.value === value)?.group;
}

export function projectTypeLabel(value: string) {
  return allOptions.find((o) => o.value === value)?.label ?? value;
}

// ---------------------------------------------------------------------------
// Perguntas extras de cada grupo (todas opcionais)
// ---------------------------------------------------------------------------

export const extraFieldInfo = {
  area: { label: "Área aproximada", placeholder: "Ex.: 2 hectares, 500 m² de estufa" },
  cultura: { label: "Cultura / o que é produzido", placeholder: "Ex.: mudas de eucalipto, hortaliças, flores" },
  tamanhoJardim: { label: "Tamanho aproximado do jardim", placeholder: "Ex.: 80 m²" },
} as const;

export type ExtraField = keyof typeof extraFieldInfo;

export const extraFieldsByGroup: Record<ProjectTypeGroupId, readonly ExtraField[]> = {
  agricola: ["area", "cultura"],
  residencial: ["tamanhoJardim"],
  loja: [],
};

// Exemplo do campo Mensagem, conforme o grupo escolhido ("" = nada escolhido ainda).
export const messagePlaceholders: Record<ProjectTypeGroupId | "", string> = {
  "": "Conte o que você precisa.",
  agricola:
    "Ex.: fonte de água disponível (poço, represa, rede), se já existe algum sistema instalado, onde fica a propriedade...",
  residencial: "Ex.: se já existe algum ponto de água, se o jardim tem gramado, canteiros ou vasos, bairro...",
  loja: "Ex.: qual produto você procura, modelo ou medida, quantidade...",
};

// ---------------------------------------------------------------------------
// Regras de cada campo. Usado no servidor para conferir os dados antes de enviar o e-mail.
// ---------------------------------------------------------------------------

const projectTypeValues = allOptions.map((o) => o.value) as [string, ...string[]];
const optionalText = z.string().trim().max(100, "Resposta muito longa (máximo de 100 caracteres).");

export const quoteSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome.").max(100),
  telefone: z
    .string()
    .trim()
    .min(8, "Informe um telefone ou WhatsApp para contato.")
    .max(30),
  email: z.union([z.literal(""), z.email("E-mail inválido.")]),
  cidade: z.string().trim().min(2, "Informe sua cidade.").max(100),
  tipoProjeto: z.enum(projectTypeValues, { error: "Escolha o tipo de projeto." }),
  area: optionalText,
  cultura: optionalText,
  tamanhoJardim: optionalText,
  mensagem: z
    .string()
    .trim()
    .min(10, "Conte um pouco sobre o que você precisa.")
    .max(2000, "Mensagem muito longa (máximo de 2000 caracteres)."),
});

export type QuoteInput = z.infer<typeof quoteSchema>;
export type QuoteField = keyof QuoteInput;
export const quoteFields = Object.keys(quoteSchema.shape) as QuoteField[];

// Lê o formulário aceitando SÓ as perguntas extras do grupo escolhido.
// As dos outros grupos ficam vazias, mesmo que tenham sido enviadas
// (ex.: a pessoa preencheu "área", depois trocou para jardim).
export function readQuoteForm(formData: FormData): Record<QuoteField, string> {
  const read = (field: QuoteField) => String(formData.get(field) ?? "");
  const allowed = extraFieldsByGroup[projectTypeGroup(read("tipoProjeto"))?.id ?? "loja"];
  const isExtra = (field: QuoteField): field is ExtraField => field in extraFieldInfo;

  return Object.fromEntries(
    quoteFields.map((field) => [field, isExtra(field) && !allowed.includes(field) ? "" : read(field)]),
  ) as Record<QuoteField, string>;
}

// ---------------------------------------------------------------------------
// Estado devolvido pelo servidor
// ---------------------------------------------------------------------------

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
