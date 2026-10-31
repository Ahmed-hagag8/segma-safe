import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[75vh] flex-col items-center justify-center px-4 text-center">
      <span className="font-mono text-8xl font-black text-brand/20 sm:text-9xl">
        404
      </span>
      <h1 className="mt-4 text-3xl font-black text-foreground sm:text-4xl">
        الصفحة غير موجودة / Page Not Found
      </h1>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        الصفحة التي تبحث عنها قد تكون تم نقلها أو حذفها أو أن الرابط غير صحيح.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 font-bold text-white shadow-lg shadow-brand/20 transition-all hover:bg-brand-dark hover:shadow-xl"
      >
        <Home className="size-4" />
        العودة للرئيسية / Back to Home
      </Link>
    </div>
  );
}
