import { BlockObjectResponse, PartialBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export interface RichText {
  plain_text: string;
  href: string | null;
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
}

type BlockType =
  | "paragraph"
  | "heading_1"
  | "heading_2"
  | "heading_3"
  | "bulleted_list_item"
  | "numbered_list_item"
  | "quote"
  | "code"
  | "image";

interface BaseBlock {
  type: BlockType;
  object: "block";
  id: string;
  created_time: string;
  last_edited_time: string;
  has_children: boolean;
  archived: boolean;
}

interface TextBlock extends BaseBlock {
  type: "paragraph" | "heading_1" | "heading_2" | "heading_3" | "bulleted_list_item" | "numbered_list_item" | "quote";
  paragraph?: {
    rich_text: RichText[];
  };
  heading_1?: {
    rich_text: RichText[];
  };
  heading_2?: {
    rich_text: RichText[];
  };
  heading_3?: {
    rich_text: RichText[];
  };
  bulleted_list_item?: {
    rich_text: RichText[];
  };
  numbered_list_item?: {
    rich_text: RichText[];
  };
  quote?: {
    rich_text: RichText[];
  };
}

interface CodeBlock extends BaseBlock {
  type: "code";
  code: {
    rich_text: RichText[];
    language: string;
  };
}

interface ImageBlock extends BaseBlock {
  type: "image";
  image: {
    type: "external" | "file";
    external?: {
      url: string;
    };
    file?: {
      url: string;
    };
  };
}

export type NotionBlock = TextBlock | CodeBlock | ImageBlock;

export function isNotionBlock(block: PartialBlockObjectResponse | BlockObjectResponse): block is NotionBlock {
  if (!('type' in block) || typeof block.type !== 'string') return false;
  
  const validTypes: BlockType[] = [
    "paragraph",
    "heading_1",
    "heading_2",
    "heading_3",
    "bulleted_list_item",
    "numbered_list_item",
    "quote",
    "code",
    "image"
  ];
  
  return validTypes.includes(block.type as BlockType);
} 