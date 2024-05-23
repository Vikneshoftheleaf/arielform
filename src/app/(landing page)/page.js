import Image from "next/image";
import Link from "next/link";
export const metadata = {
  title: "ArielForm",
  description:"The best Form endpoint provider"
}

export default function Home() {
  return (
    <main>
      <div className="w-full flex justify-end gap-4 p-4">
      <Link href={'login'}>Login</Link>
      <Link href={'signup'}>Signup</Link>
      <Link href={'dashboard'}>Dashboard</Link>

      </div>
    </main>

  );
}
