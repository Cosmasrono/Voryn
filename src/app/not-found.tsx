import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center bg-navy-900 text-center text-white">
      <div className="container-x">
        <p className="font-display text-6xl font-extrabold text-gold-500">404</p>
        <h1 className="mt-4 font-display text-3xl font-bold">Page not found</h1>
        <p className="mx-auto mt-3 max-w-md text-silver-300">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/" className="rounded-full bg-gold-500 px-7 py-3 font-semibold text-navy-900">
            Back home
          </Link>
          <Link
            href="/products"
            className="rounded-full border border-white/25 px-7 py-3 font-semibold text-white hover:bg-white/10"
          >
            View loans
          </Link>
        </div>
      </div>
    </section>
  );
}
