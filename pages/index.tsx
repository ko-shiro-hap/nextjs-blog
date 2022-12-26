import { BLOCKED_PAGES } from "next/dist/shared/lib/constants";
import { client } from "../libs/client";
import styles from '../styles/Home.module.css'

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

export default function Home({blog}) {
  return (
    <div>
      {blog.map((blog) => (
        <li key={blog.id}>
          <a href="">{blog.title}</a>
        </li>
      ))}
    </div>
  )
}
