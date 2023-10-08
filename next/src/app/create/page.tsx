"use client";

import Banner from "@/components/Banner";
import Header from "@/components/Header";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiFillEdit } from "react-icons/ai";
import { GiCancel } from "react-icons/gi";

export default function Create() {
  const router = useRouter();

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <div className="relative min-h-screen flex flex-col w-full px-4">
        <Header />
        <div className="mt-10 flex">
          <form
            className="w-full"
            onSubmit={(e: any) => {
              e.preventDefault();
              const title = e.target.title.value;
              const contents = e.target.contents.value;
              const time = getCurrentDate();

              const options = {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, contents, time }),
              };

              fetch(`http://localhost:9999/topics`, options)
                .then((res) => res.json())
                .then((result) => {
                  console.log(result);
                  const lastid = result.id;
                  router.refresh();
                  router.push(`/read/${lastid}`);
                });
            }}
          >
            <div className="my-6 w-full border border-gray-300 py-2 px-4 rounded-md">
              <input
                type="text"
                name="title"
                placeholder="title"
                className="w-full"
              />
            </div>
            <div className="mt-8 border border-gray-300 py-2 px-4 rounded-md">
              <textarea
                name="contents"
                placeholder="contents"
                className="w-full h-96 resize-y"
              />
            </div>
            <div>
              <button type="submit" className="absolute bottom-28 right-14">
                <AiFillEdit className="w-8 h-8" />
              </button>
            </div>
            <Link href={`/community`}>
              <GiCancel className="absolute bottom-28 right-4 w-8 h-8" />
            </Link>
          </form>
        </div>
      </div>
      <Banner />
    </>
  );
}
