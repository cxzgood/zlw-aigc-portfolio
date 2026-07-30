"use client";

import { useState } from "react";

import {
  CheckIcon,
  GithubIcon,
  MailIcon,
  PhoneIcon,
} from "@/components/ui/icons";
import type { ContactItem } from "@/types/project";

type Feedback = {
  id: ContactItem["id"];
  message: string;
  successful: boolean;
};

function ContactIcon({
  className,
  id,
}: {
  className?: string;
  id: ContactItem["id"];
}) {
  if (id === "email") {
    return <MailIcon className={className} />;
  }

  if (id === "phone") {
    return <PhoneIcon className={className} />;
  }

  return <GithubIcon className={className} />;
}

function fallbackCopy(value: string) {
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.append(textarea);
  textarea.select();
  let copied = false;

  try {
    copied = document.execCommand("copy");
  } finally {
    textarea.remove();
  }

  if (!copied) {
    throw new Error("Clipboard copy was not available.");
  }
}

export function ContactActions({
  contacts,
}: {
  contacts: readonly ContactItem[];
}) {
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  async function copyContact(contact: Extract<ContactItem, { available: true }>) {
    const copyValue = contact.copyValue ?? contact.value;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(copyValue);
      } else {
        fallbackCopy(copyValue);
      }

      setFeedback({
        id: contact.id,
        message:
          contact.id === "phone" ? "电话号码已复制" : "邮箱地址已复制",
        successful: true,
      });
    } catch {
      try {
        fallbackCopy(copyValue);
        setFeedback({
          id: contact.id,
          message:
            contact.id === "phone" ? "电话号码已复制" : "邮箱地址已复制",
          successful: true,
        });
      } catch {
        setFeedback({
          id: contact.id,
          message: "复制失败，请重试",
          successful: false,
        });
      }
    }
  }

  return (
    <>
      <div className="grid w-full gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {contacts.map((contact) => {
          if (!contact.available) {
            return null;
          }

          const copied =
            feedback?.id === contact.id && feedback.successful;
          const content = (
            <>
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-cyan-200/[0.07] text-cyan-200 ring-1 ring-cyan-200/10">
                {copied ? (
                  <CheckIcon className="size-4 text-emerald-300" />
                ) : (
                  <ContactIcon className="size-4" id={contact.id} />
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-mono text-[9px] tracking-[0.12em] text-slate-500 uppercase">
                  {contact.label}
                </span>
                <span className="mt-1 block break-all text-sm font-semibold text-slate-200">
                  {contact.value}
                </span>
              </span>
              <span className="shrink-0 text-[10px] font-semibold text-cyan-200">
                {contact.action === "copy"
                  ? copied
                    ? "已复制"
                    : "复制"
                  : "访问"}
              </span>
            </>
          );
          const className =
            "interactive-pill flex min-h-16 w-full max-w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-left transition duration-200 hover:-translate-y-px hover:border-cyan-200/25 hover:bg-cyan-200/[0.055]";

          if (contact.action === "copy") {
            return (
              <button
                aria-label={`复制${contact.label}`}
                className={className}
                key={contact.id}
                onClick={() => copyContact(contact)}
                type="button"
              >
                {content}
              </button>
            );
          }

          return (
            <a
              aria-label={`访问${contact.label}：${contact.value}（在新标签页打开）`}
              className={className}
              href={contact.href}
              key={contact.id}
              rel="noreferrer"
              target="_blank"
            >
              {content}
            </a>
          );
        })}
      </div>
      <p aria-live="polite" className="sr-only" role="status">
        {feedback?.message ?? ""}
      </p>
    </>
  );
}
