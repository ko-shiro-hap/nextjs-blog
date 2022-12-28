import { BLOCKED_PAGES } from "next/dist/shared/lib/constants";
import { client } from "../libs/client";
import styles from '../styles/Home.module.scss'
import Link from "next/link";

//SSG
export const getStaticProps = async() => {
  const data = await client.get({endpoint: "blog"});
  console.log(data);
  return {
    props: {
      blog: data.contents,
    }
  }
}

export default function Home({blog}: any) {
  return (
    <div className={styles.container}>
      {blog.map((blog: any) => (
        <li key={blog.id}>
          <Link href={`blog/${blog.id}`}>
            {blog.title}
          </Link>
        </li>
      ))}
    </div>
  )
}
