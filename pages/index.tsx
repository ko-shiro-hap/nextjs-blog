import { BLOCKED_PAGES } from "next/dist/shared/lib/constants";
import { client } from "../libs/client";
import Link from "next/link";
import { Pagination } from "../src/components/Pagination";

//SSG
// データをテンプレートに受け渡す部分の処理
export const getStaticProps = async() => {
  // ブログコンテンツの取得
  const data = await client.get({endpoint: "blog", queries: {limit: 5, offset: 0}});
    // カテゴリーコンテンツの取得
  const categoryData = await client.get({endpoint: "categories"});
    // タグコンテンツの取得
  const tagData = await client.get({endpoint: "tags"});
  return {
    props: {
      blog: data.contents,
      category: categoryData.contents,
      tag: tagData.contents,
      totalCount: data.totalCount,
    }
  }
}

export default function Home({blog, category, tag, totalCount}: any) {

  return (
    <div>
          <h1 className="text-3xl">
      Hello world!
    </h1>
      {/* ブログコンテンツの表示 */}
      <div>ブログ</div>
      {blog.map((blog: any) => (
        <li key={blog.id}>
          <Link href={`blog/${blog.id}`}>
            {blog.title}
          </Link>
        </li>
      ))}
      {/* カテゴリーコンテンツの表示 */}
      <p>カテゴリー</p>
      {category.map((category: any) => (
        <li key={category.id}>
          <Link href={`category/${category.id}`}>
            {category.name}
          </Link>
        </li>
      ))}
      <p>タグ</p>
      {tag.map((tag: any) => (
        <li key={tag.id}>
          <Link href={`tag/${tag.id}`}>
            {tag.name}
          </Link>
        </li>
      ))}
      {/* ペジネーション */}
      <p>ペジネーション</p>
      <Pagination totalCount={totalCount} />
    </div>
  )
}
