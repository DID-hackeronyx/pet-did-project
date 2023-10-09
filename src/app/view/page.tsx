"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GrFormView } from "react-icons/gr";

export default function View() {
  const [view, setView] = useState();
  const [title, setTitle] = useState();
  const [contents, setContents] = useState();
  const [time, setTime] = useState();

  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const getView = async () => {
    try {
      const response = await fetch(`http://localhost:9999/topics/${id}`, {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log(result);

      const view = (await result.view) + 1;
      const title = await result.title;
      const contents = await result.contents;
      const time = await result.time;

      setView(result.view + 1);
      setTitle(result.title);
      setContents(result.contents);
      setTime(result.time);

      // 서버에 업데이트된 view 값을 PUT 요청으로 전송
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ view: result.view + 1, title, time, contents }),
      };

      const updateResponse = await fetch(
        `http://localhost:9999/topics/${id}`,
        options
      );
      if (!updateResponse.ok) {
        throw new Error("Network response was not ok");
      }
      const updateResult = await updateResponse.json();
      console.log(updateResult);
      router.refresh();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getView();
  }, []);

  return (
    <>
      <div className="flex flex-col text-sm justify-center items-center">
        {view}
        <GrFormView />
      </div>
    </>
  );
}
