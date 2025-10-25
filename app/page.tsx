'use client';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-white">
    </div>
  );
}
