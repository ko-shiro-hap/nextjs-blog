/* eslint-disable @next/next/no-typos */
import { client } from "../../libs/client";

//SSG
// データをテンプレートに受け渡す部分の処理
export const getStaticProps = async (context: any) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "blog", contentId: id });

  return {
    props: {
      blog: data,
    }
  }
}

// 静的生成のためのパスを指定
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blog"})

  const paths = data.contents.map((content: any) => `/blog/${content.id}`);
  return {
    paths,
    fallback: false,
  }
}


export default function BlogId({ blog }: any) {
  return (
    <main className="">
      <h1 className="">{blog.title}</h1>
      <p className="">{blog.publishedAt}</p>
      <div dangerouslySetInnerHTML={{__html: `${blog.body}`}} className="" />
    </main>
  )
}
