"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled client error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="flex size-20 items-center justify-center rounded-3xl bg-destructive/10 text-destructive mb-6">
        <AlertTriangle className="size-10" />
      </div>
      <h2 className="text-2xl font-black text-foreground sm:text-3xl">
        حدث خطأ غير متوقع / Something went wrong
      </h2>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        نعتذر عن هذا الخطأ المؤقت. يمكنك إعادة تحميل الصفحة أو المحاولة مرة أخرى.
      </p>
      <button
        onClick={() => reset()}
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 font-bold text-white shadow-lg shadow-brand/20 transition-all hover:bg-brand-dark hover:shadow-xl"
      >
        <RefreshCcw className="size-4" />
        إعادة المحاولة / Try Again
      </button>
    </div>
  );
}
