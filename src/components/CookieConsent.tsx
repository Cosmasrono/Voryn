"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { Cookie, X } from "lucide-react";

const COOKIE_CONSENT_KEY = "voryn-cookie-consent";
const COOKIE_CONSENT_EVENT = "voryn-cookie-consent-updated";

type ConsentChoice = "accepted" | "rejected";

export default function CookieConsent() {
  const hasConsent = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener(COOKIE_CONSENT_EVENT, onStoreChange);
      return () => window.removeEventListener(COOKIE_CONSENT_EVENT, onStoreChange);
    },
    () => window.localStorage.getItem(COOKIE_CONSENT_KEY) !== null,
    () => false
  );
  const visible = !hasConsent;

  function choose(choice: ConsentChoice) {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, choice);
    window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT));
  }

  if (!visible) return null;

  return (
    <aside
      className="fixed inset-x-4 bottom-4 z-100 mx-auto max-w-3xl rounded-2xl border border-silver-200 bg-white p-5 shadow-2xl sm:inset-x-6 sm:p-6"
      role="dialog"
      aria-label="Cookie preferences"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-500/15 text-gold-700">
          <Cookie className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h2 className="font-display text-base font-bold text-navy-800">Your cookie choice</h2>
            <button
              type="button"
              onClick={() => choose("rejected")}
              className="rounded-lg p-1 text-silver-400 transition-colors hover:bg-silver-100 hover:text-navy-700"
              aria-label="Reject cookies and close"
              title="Reject cookies"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-1 text-sm leading-relaxed text-silver-600">
            We use essential storage to remember your preference and optional cookies to improve
            the site. Read our <Link href="/privacy" className="font-semibold text-navy-700 underline">Privacy Policy</Link> for details.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => choose("accepted")}
              className="rounded-full bg-navy-700 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
            >
              Accept cookies
            </button>
            <button
              type="button"
              onClick={() => choose("rejected")}
              className="rounded-full border border-silver-300 bg-white px-5 py-2 text-sm font-semibold text-navy-700 transition-colors hover:bg-silver-50"
            >
              Reject optional cookies
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
