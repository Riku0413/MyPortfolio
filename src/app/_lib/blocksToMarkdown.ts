import { NotionBlock, RichText } from './types/notion';

export default function blocksToMarkdown(blocks: NotionBlock[]): string {
  return blocks
    .map((block) => {
      switch (block.type) {
        case "paragraph":
          return getRichText(block.paragraph?.rich_text || []);
        case "heading_1":
          return `# ${getRichText(block.heading_1?.rich_text || [])}`;
        case "heading_2":
          return `## ${getRichText(block.heading_2?.rich_text || [])}`;
        case "heading_3":
          return `### ${getRichText(block.heading_3?.rich_text || [])}`;
        case "bulleted_list_item":
          return `- ${getRichText(block.bulleted_list_item?.rich_text || [])}`;
        case "numbered_list_item":
          return `1. ${getRichText(block.numbered_list_item?.rich_text || [])}`;
        case "quote":
          return `> ${getRichText(block.quote?.rich_text || [])}`;
        case "code":
          return `\`\`\`${block.code?.language || ""}\n${getRichText(block.code?.rich_text || [])}\n\`\`\``;
        case "image":
          const url = block.image?.external?.url || block.image?.file?.url;
          return `![image](${url})`;
        default:
          return ""; // 対応していないタイプは無視
      }
    })
    .join("\n\n");
}

function getRichText(richText: RichText[]): string {
  if (!richText || !Array.isArray(richText)) {
    return "";
  }
  return richText.map((t) => t.plain_text).join("");
}
