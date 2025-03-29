import { BlogData } from "../blog/BlogCard";

export async function fetchAllMetaFromPrivateRepo(): Promise<BlogData[]> {
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
    throw new Error(`GitHub API error (list folders): ${res.status}`);
  }

  const folders = await res.json();

  const metaList: (BlogData | null)[] = await Promise.all(
    folders.map(
      async (folder: { name: string; type: string; path: string }) => {
        if (folder.type !== "dir") return null;

        const metaUrl = `https://api.github.com/repos/${repo}/contents/${folder.path}/meta.json`;

        const metaRes = await fetch(metaUrl, {
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            Accept: "application/vnd.github.v3.raw",
          },
        });

        if (!metaRes.ok) {
          console.warn(`meta.json not found in ${folder.name}`);
          return null;
        }

        const json = await metaRes.json();

        const blog: BlogData = {
          id: folder.name,
          title: json.title,
          description: json.description,
          date: json.date,
          url: json.url,
          tags: json.tags,
          coverImage: json.coverImage,
        };

        return blog;
      }
    )
  );

  return metaList.filter(Boolean) as BlogData[];
}
