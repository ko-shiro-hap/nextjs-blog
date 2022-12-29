import { BLOCKED_PAGES } from "next/dist/shared/lib/constants";
import { client } from "../libs/client";
import styles from '../styles/Home.module.scss'
import Link from "next/link";

//SSG
// データをテンプレートに受け渡す部分の処理
export const getStaticProps = async() => {
  // ブログコンテンツの取得
  const data = await client.get({endpoint: "blog"});
    // カテゴリーコンテンツの取得
  const categoryData = await client.get({endpoint: "categories"});
  return {
    props: {
      blog: data.contents,
      category: categoryData.contents,
    }
  }
}

export default function Home({blog, category}: any) {
  return (
    <div className={styles.container}>
      {/* ブログコンテンツの表示 */}
      {blog.map((blog: any) => (
        <li key={blog.id}>
          <Link href={`blog/${blog.id}`}>
            {blog.title}
          </Link>
        </li>
      ))}
      {/* カテゴリーコンテンツ */}
      {category.map((category: any) => (
        <li key={category.id}>
          <Link href={`category/${category.id}`}>
            {category.name}
          </Link>
        </li>
      ))}
    </div>
  )
}
