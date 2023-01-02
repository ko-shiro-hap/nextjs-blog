import Router from "next/router";
import Link from "next/link";

export const Pagination = ({ totalCount }: any) => {
  const PRE_PAGE: number = 5;

  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i)

    return (
      <ul>
        {range(1, Math.ceil(totalCount / PRE_PAGE)).map((number, index) => (
          <li key={index}>
            <Link href={`/blog/page/${number}`}>
              {number}
            </Link>
          </li>
        ))}
      </ul>
    )
}
