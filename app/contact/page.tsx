// ...existing code...
'use client';
import Image from "next/image";
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

export default function ContactPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // Simulate API call — replace with real API when ready
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    setSuccess(true);
    // Optional: navigate to a thank-you page
    // router.push('/thank-you');
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-white font-sans">
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid gap-10 items-center md:grid-cols-2">
          {/* Left: hero content */}
          <div>
            <h2 className="text-sm font-semibold text-indigo-600 uppercase">Contact</h2>
            <h1 className="mt-3 text-3xl font-extrabold text-zinc-900 sm:text-4xl">
              Let’s build something great together
            </h1>
            <p className="mt-4 text-zinc-600">
              Questions, project inquiries, or a quick hello — send a message and I’ll reply within 1–2 business days.
            </p>

            <div className="mt-6 rounded-lg overflow-hidden shadow-sm">
              {/* Replace src with an asset from /public or your preferred image */}
              <Image
                src="/images/contact-illustration.png"
                alt="Contact illustration"
                width={720}
                height={420}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>

          {/* Right: contact form */}
          <section className="bg-white dark:bg-neutral-50 shadow-lg rounded-lg p-6 md:p-8">
            {success ? (
              <div className="text-center">
                <h3 className="text-lg font-semibold text-zinc-900">Thanks — message sent</h3>
                <p className="mt-2 text-zinc-600">I'll reply as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block">
                  <span className="text-sm font-medium text-zinc-700">Name</span>
                  <input name="name" required className="mt-1 block w-full rounded-md border border-zinc-200 px-3 py-2 bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-zinc-700">Email</span>
                  <input name="email" type="email" required className="mt-1 block w-full rounded-md border border-zinc-200 px-3 py-2 bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-zinc-700">Message</span>
                  <textarea name="message" rows={5} required className="mt-1 block w-full rounded-md border border-zinc-200 px-3 py-2 bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </label>

                <div className="flex items-center justify-between">
                  <button type="submit" disabled={loading} className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-60">
                    {loading ? 'Sending...' : 'Send message'}
                  </button>
                  <span className="text-sm text-zinc-500">Or email hello@yourdomain.com</span>
                </div>
              </form>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
// ...existing code...