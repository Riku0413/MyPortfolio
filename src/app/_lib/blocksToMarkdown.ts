export default function blocksToMarkdown(blocks: any[]): string {
  return blocks
    .map((block) => {
      const type = block.type;
      const data = block[type];

      switch (type) {
        case "paragraph":
          return getRichText(data.rich_text);
        case "heading_1":
          return `# ${getRichText(data.rich_text)}`;
        case "heading_2":
          return `## ${getRichText(data.rich_text)}`;
        case "heading_3":
          return `### ${getRichText(data.rich_text)}`;
        case "bulleted_list_item":
          return `- ${getRichText(data.rich_text)}`;
        case "numbered_list_item":
          return `1. ${getRichText(data.rich_text)}`;
        case "quote":
          return `> ${getRichText(data.rich_text)}`;
        case "code":
          return `\`\`\`${data.language || ""}\n${getRichText(data.rich_text)}\n\`\`\``;
        case "image":
          const url = data.external?.url || data.file?.url;
          return `![image](${url})`;
        default:
          return ""; // 対応していないタイプは無視
      }
    })
    .join("\n\n");
}

function getRichText(richText: any[]): string {
  return richText.map((t) => t.plain_text).join("");
}
