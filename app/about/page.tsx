'use client';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

export default function Home() {
  const router = useRouter();
  return (
  <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-white">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <h1 className="text-3xl text-center font-bold text-gray-900">About</h1>
          </div>
        </header>
      </div>
  );
}
