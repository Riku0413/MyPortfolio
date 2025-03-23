import matter from "gray-matter";

export async function fetchAllMarkdownFromPrivateRepo() {
  const repo = "Riku0413/MyBlogCMS";
  const dirPath = "posts";
  const url = `https://api.github.com/repos/${repo}/contents/${dirPath}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (!res.ok) {
    throw new Error(`GitHub API error (list): ${res.status}`);
  }

  const files = await res.json();

  const mdFiles = files.filter((file: { name: string }) => file.name.endsWith(".md"));

  const markdowns = await Promise.all(
    mdFiles.map(async (file: { download_url: string; name: string }) => {
      const mdRes = await fetch(file.download_url, {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3.raw",
        },
      });

      if (!mdRes.ok) {
        throw new Error(`GitHub API error (file): ${mdRes.status}`);
      }

      const rawMarkdown = await mdRes.text();
      const { data, content } = matter(rawMarkdown); // ←ここで分離！

      console.log(data);

      return {
        filename: file.name,
        metadata: data, // title, date, id など
        content: content, // 純粋な本文
      };
    })
  );

  return markdowns;
}
