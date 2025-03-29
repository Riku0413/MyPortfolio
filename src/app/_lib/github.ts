// // import matter from "gray-matter";

// // export async function fetchAllMarkdownFromPrivateRepo() {
// //   const repo = "Riku0413/MyBlogCMS";
// //   const dirPath = "posts";
// //   const url = `https://api.github.com/repos/${repo}/contents/${dirPath}`;

// //   const res = await fetch(url, {
// //     headers: {
// //       Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
// //       Accept: "application/vnd.github.v3+json",
// //     },
// //   });

// //   if (!res.ok) {
// //     throw new Error(`GitHub API error (list): ${res.status}`);
// //   }

// //   const files = await res.json();

// //   const mdFiles = files.filter((file: { name: string }) => file.name.endsWith(".md"));

// //   const markdowns = await Promise.all(
// //     mdFiles.map(async (file: { download_url: string; name: string }) => {
// //       const mdRes = await fetch(file.download_url, {
// //         headers: {
// //           Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
// //           Accept: "application/vnd.github.v3.raw",
// //         },
// //       });

// //       if (!mdRes.ok) {
// //         throw new Error(`GitHub API error (file): ${mdRes.status}`);
// //       }

// //       const rawMarkdown = await mdRes.text();
// //       const { data, content } = matter(rawMarkdown); // ←ここで分離！

// //       console.log(data);

// //       return {
// //         filename: file.name,
// //         metadata: data, // title, date, id など
// //         content: content, // 純粋な本文
// //       };
// //     })
// //   );

// //   return markdowns;
// // }




// // import matter from "gray-matter";

// // export async function fetchMarkdownsFromSubdir(subDir: string) {
// //   const repo = "Riku0413/MyBlogCMS";
// //   const dirPath = `posts/${subDir}`; // ← 引数を使ってサブディレクトリ指定
// //   const url = `https://api.github.com/repos/${repo}/contents/${dirPath}`;

// //   const res = await fetch(url, {
// //     headers: {
// //       Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
// //       Accept: "application/vnd.github.v3+json",
// //     },
// //   });

// //   if (!res.ok) {
// //     throw new Error(`GitHub API error (list ${dirPath}): ${res.status}`);
// //   }

// //   const files = await res.json();

// //   const mdFiles = files.filter((file: { name: string }) =>
// //     file.name.endsWith(".md")
// //   );

// //   const markdowns = await Promise.all(
// //     mdFiles.map(async (file: { download_url: string; name: string }) => {
// //       const mdRes = await fetch(file.download_url, {
// //         headers: {
// //           Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
// //           Accept: "application/vnd.github.v3.raw",
// //         },
// //       });

// //       if (!mdRes.ok) {
// //         throw new Error(`GitHub API error (file): ${mdRes.status}`);
// //       }

// //       const rawMarkdown = await mdRes.text();
// //       const { data, content } = matter(rawMarkdown);

// //       return {
// //         filename: file.name,
// //         metadata: data, // title, date, id など
// //         content: content,
// //       };
// //     })
// //   );

// //   return markdowns;
// // }




// export async function fetchPostFromSubdir(subDir: string) {
//   const repo = "Riku0413/MyBlogCMS";
//   const dirPath = `posts/${subDir}`;
//   const baseUrl = `https://api.github.com/repos/${repo}/contents/${dirPath}`;

//   // フォルダの中身を一覧取得
//   const res = await fetch(baseUrl, {
//     headers: {
//       Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
//       Accept: "application/vnd.github.v3+json",
//     },
//   });

//   if (!res.ok) {
//     throw new Error(`GitHub API error (list ${dirPath}): ${res.status}`);
//   }

//   const files: any[] = await res.json();

//   // meta.json ファイル取得
//   const metaFile = files.find((f) => f.name === "meta.json");
//   if (!metaFile) {
//     throw new Error(`meta.json not found in ${subDir}`);
//   }

//   const metaRes = await fetch(metaFile.download_url, {
//     headers: {
//       Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
//       Accept: "application/vnd.github.v3.raw",
//     },
//   });

//   if (!metaRes.ok) {
//     throw new Error(`GitHub API error (meta.json): ${metaRes.status}`);
//   }

//   const metadata = await metaRes.json();

//   // .md ファイル取得（1つ目を使う）
//   const mdFile = files.find((f) => f.name.endsWith(".md"));
//   if (!mdFile) {
//     throw new Error(`Markdown file not found in ${subDir}`);
//   }

//   const mdRes = await fetch(mdFile.download_url, {
//     headers: {
//       Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
//       Accept: "application/vnd.github.v3.raw",
//     },
//   });

//   if (!mdRes.ok) {
//     throw new Error(`GitHub API error (Markdown): ${mdRes.status}`);
//   }

//   const content = await mdRes.text();

//   // 戻り値
//   return {
//     slug: subDir,
//     metadata,
//     content,
//   };
// }
