import BackButton from "@/components/BackButton";
import Banner from "@/components/Banner";
import Header from "@/components/Header";
import Link from "next/link";
import { useRouter } from "next/router";
import Control from "./Control";

export default async function Read(props: any) {
  const resp = await fetch(`http://localhost:9999/topics/${props.params.id}`, {
    cache: "no-store",
  });
  const topic = await resp.json();

  return (
    <>
      <div className="relative min-h-screen flex flex-col w-full px-4">
        <Header />
        <div className="mt-10 flex flex-col w-full">
          <div className="my-6 w-full border-b-2 border-gray-300 py-2 px-4 rounded-md">
            {topic.title}
          </div>
          <div className="mt-8 py-2 px-4 h-96">
            <div>{topic.contents}</div>
          </div>
        </div>
      </div>
      <Control />
      <Banner />
    </>
  );
}
