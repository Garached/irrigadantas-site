"use client";

// Client Component: mostra "Enviando...", erros, a mensagem de sucesso e as perguntas
// de cada tipo de projeto sem recarregar a página. O envio de verdade acontece no servidor (sendQuote).
import { useActionState, useState } from "react";
import { sendQuote } from "@/app/orcamento/actions";
import { ContactAlternatives } from "@/components/sections/ContactAlternatives";
import {
  extraFieldInfo,
  extraFieldsByGroup,
  initialQuoteState,
  messagePlaceholders,
  projectTypeGroup,
  projectTypeGroups,
  type QuoteField,
} from "@/lib/quote-schema";

const inputClass =
  "mt-1 block w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 focus:border-brand-600 focus:ring-2 focus:ring-brand-100 focus:outline-none aria-[invalid=true]:border-red-500";

export function QuoteForm() {
  const [state, formAction, pending] = useActionState(sendQuote, initialQuoteState);

  // Tipo de projeto escolhido: decide quais perguntas extras aparecem.
  const [projectType, setProjectType] = useState(state.values?.tipoProjeto ?? "");

  // A cada resposta do servidor, o formulário é montado de novo (nova "key"), para os campos
  // voltarem com o que a pessoa digitou (state.values) depois que o React limpa o formulário.
  const [formKey, setFormKey] = useState(0);
  const [lastState, setLastState] = useState(state);
  if (state !== lastState) {
    setLastState(state);
    setFormKey((k) => k + 1);
    setProjectType(state.values?.tipoProjeto ?? "");
  }

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-2xl border border-brand-100 bg-brand-50 p-6 text-brand-800">
        <p className="text-lg font-semibold">{state.message}</p>
      </div>
    );
  }

  const group = projectTypeGroup(projectType);
  const extraFields = group ? extraFieldsByGroup[group.id] : [];

  const error = (field: QuoteField) => state.errors?.[field]?.[0];
  const fieldProps = (field: QuoteField) => ({
    id: field,
    name: field,
    defaultValue: state.values?.[field],
    "aria-invalid": error(field) ? true : undefined,
    "aria-describedby": error(field) ? `${field}-erro` : undefined,
    className: inputClass,
  });
  const errorText = (field: QuoteField) =>
    error(field) ? (
      <p id={`${field}-erro`} className="mt-1 text-sm text-red-600">
        {error(field)}
      </p>
    ) : null;

  return (
    <form key={formKey} action={formAction} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="nome" className="font-medium">Nome *</label>
          <input type="text" autoComplete="name" required minLength={2} {...fieldProps("nome")} />
          {errorText("nome")}
        </div>
        <div>
          <label htmlFor="telefone" className="font-medium">Telefone / WhatsApp *</label>
          <input type="tel" autoComplete="tel" required minLength={8} {...fieldProps("telefone")} />
          {errorText("telefone")}
        </div>
        <div>
          <label htmlFor="email" className="font-medium">E-mail</label>
          <input type="email" autoComplete="email" {...fieldProps("email")} />
          {errorText("email")}
        </div>
        <div>
          <label htmlFor="cidade" className="font-medium">Cidade *</label>
          <input type="text" autoComplete="address-level2" required {...fieldProps("cidade")} />
          {errorText("cidade")}
        </div>
      </div>

      <div>
        <label htmlFor="tipoProjeto" className="font-medium">Tipo de projeto *</label>
        <select
          required
          {...fieldProps("tipoProjeto")}
          defaultValue={state.values?.tipoProjeto ?? ""}
          onChange={(e) => setProjectType(e.target.value)}
        >
          <option value="" disabled>
            Selecione...
          </option>
          {projectTypeGroups.map((g) => (
            <optgroup key={g.id} label={g.label}>
              {g.options.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        {errorText("tipoProjeto")}
      </div>

      {/* Perguntas extras do grupo escolhido (opcionais). Trocar de grupo remove as do grupo anterior. */}
      {extraFields.length > 0 && (
        <div key={group?.id} className="grid gap-4 sm:grid-cols-2">
          {extraFields.map((field) => (
            <div key={field}>
              <label htmlFor={field} className="font-medium">
                {extraFieldInfo[field].label} <span className="font-normal text-zinc-500">(opcional)</span>
              </label>
              <input
                type="text"
                maxLength={100}
                placeholder={extraFieldInfo[field].placeholder}
                {...fieldProps(field)}
              />
              {errorText(field)}
            </div>
          ))}
        </div>
      )}

      <div>
        <label htmlFor="mensagem" className="font-medium">Mensagem *</label>
        <textarea
          rows={5}
          required
          minLength={10}
          placeholder={messagePlaceholders[group?.id ?? ""]}
          {...fieldProps("mensagem")}
        />
        {errorText("mensagem")}
      </div>

      {/* Campo "armadilha" contra spam: invisível para pessoas, robôs preenchem. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Não preencha este campo</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === "invalid" && (
        <p role="alert" className="rounded-lg bg-red-50 p-3 text-red-700">
          {state.message}
        </p>
      )}

      {state.status === "failed" && (
        <div role="alert" className="space-y-3 rounded-lg bg-red-50 p-3">
          <p className="text-red-700">{state.message}</p>
          <ContactAlternatives title="Fale com a gente:" />
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-brand-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60 sm:w-auto"
      >
        {pending ? "Enviando..." : "Enviar pedido de orçamento"}
      </button>
      <p className="text-sm text-zinc-500">* Campos obrigatórios</p>
    </form>
  );
}
