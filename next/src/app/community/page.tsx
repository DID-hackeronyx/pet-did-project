import Banner from "@/components/Banner";
import Header from "@/components/Header";
import Link from "next/link";
import { AiOutlinePlusCircle } from "react-icons/ai";

// server 명령어 : npx json-server --port 9999 --watch db.json

const Community = async () => {
  const resp = await fetch("http://localhost:9999/topics", {
    cache: "no-store",
    // 또는 next: { revalidate: 0 },  사용하면 됨. 캐시문제임.
  });
  const topics = await resp.json();

  // 글자 "..."으로 생략
  const truncateText = (text: any, maxLength: any) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <>
      <div className="relative min-h-screen flex flex-col w-full px-4">
        <Header />
        <div className="mt-10 flex">
          <ol className="w-10 text-center">
            <div className="font-bold text-xl mb-4 py-2 border-b-2 border-gray-300">
              No.
            </div>
            {topics.map((topic: any) => {
              return <li className="my-6 text-xl font-medium">{topic.id}</li>;
            })}
          </ol>
          <ol className="ml-8">
            <div className="font-bold text-xl mb-4 py-2 text-center border-b-2 border-gray-300">
              Title
            </div>
            {topics.map((topic: any) => {
              return (
                <li className="my-6 text-xl font-medium">
                  <Link href={`/read/${topic.id}`}>
                    {truncateText(topic.title, 30)}
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
        <div className="absolute bottom-28 right-4 flex justify-end">
          <Link href="/create">
            <AiOutlinePlusCircle className="w-10 h-10" />
          </Link>
        </div>
      </div>
      <Banner />
    </>
  );
};

export default Community;
