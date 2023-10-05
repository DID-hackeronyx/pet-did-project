import Image from "next/image";

import Welcome from "@/components/Welcome";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center ">
      <Welcome />
    </main>
  );
}
