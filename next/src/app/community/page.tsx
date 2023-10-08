import Banner from "@/components/Banner";
import Header from "@/components/Header";
import Link from "next/link";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { GrFormView } from "react-icons/gr";
import View from "../view/page";

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
        <div className="mt-4 flex flex-col">
          <div className="font-bold text-xl">Community</div>
          <div className="text-gray-400 text-sm">
            Share a tip or ask for advice
          </div>
          <ul className="w-full">
            {topics.map((topic: any) => {
              return (
                <li className="my-5 py-2 font-medium border-b-2 border-gray-200">
                  <Link href={`/read/${topic.id}`}>
                    <div className="flex justify-between">
                      <div>{truncateText(topic.title, 30)}</div>
                      <div className="flex justify-between items-center text-xs">
                        <div className="flex flex-col justify-center items-center mx-4">
                          {topic.view}
                          <GrFormView />
                        </div>
                        <div>{topic.time}</div>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="absolute bottom-24 right-4 flex justify-end">
        <Link href="/create">
          <AiOutlinePlusCircle className="w-8 h-8" />
        </Link>
      </div>
      <Banner />
    </>
  );
};

export default Community;
