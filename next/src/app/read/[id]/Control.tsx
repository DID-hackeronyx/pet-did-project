"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import { AiFillEdit } from "react-icons/ai";
import { HiViewList } from "react-icons/hi";
import { RiDeleteBin6Fill } from "react-icons/ri";

export default function Control() {
  const params = useParams();
  const id = params.id;

  const router = useRouter();

  return (
    <ul>
      <li>
        <Link href="/create">Create</Link>
      </li>
      {id ? (
        <>
          <Link href={`/update/` + id}>
            <button className="absolute bottom-28 right-24">
              <AiFillEdit className="w-6 h-6" />
            </button>
          </Link>
          <button
            className="absolute bottom-28 right-14"
            value="delete"
            onClick={() => {
              const options = { method: "DELETE" };
              fetch(`http://localhost:9999/topics/` + id, options)
                .then((resp) => resp.json())
                .then((result) => {
                  router.push("/community");
                  router.refresh();
                });
            }}
          >
            <RiDeleteBin6Fill className="w-6 h-6 text-red-500" />
          </button>
          <Link href={`/community`}>
            <button className="absolute bottom-28 right-4">
              <HiViewList className="w-6 h-6" />
            </button>
          </Link>
        </>
      ) : null}
    </ul>
  );
}
