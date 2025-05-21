import { PageObjectResponse, BlockObjectResponse, PartialBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export interface NotionPageProperties {
  Title: {
    title: Array<{
      plain_text: string;
    }>;
  };
  Description: {
    rich_text: Array<{
      plain_text: string;
    }>;
  };
  Date: {
    date: {
      start: string;
    };
  };
  OGP: {
    files: Array<{
      external: {
        url: string;
      };
    }>;
  };
}

export interface ResearchNotionPageProperties {
  Title: {
    title: Array<{
      plain_text: string;
    }>;
  };
  Publication: {
    rich_text: Array<{
      plain_text: string;
    }>;
  };
  Author: {
    rich_text: Array<{
      plain_text: string;
    }>;
  };
  Date: {
    date: {
      start: string;
    };
  };
  URL: {
    url: string;
  };
  OGP: {
    files: Array<{
      file: {
        url: string;
      };
    }>;
  };
  PublishedAt: {
    date: {
      start: string;
    };
  };
  RevisedAt: {
    date: {
      start: string;
    };
  };
}

export interface WorksNotionPageProperties {
  Title: {
    title: Array<{
      plain_text: string;
    }>;
  };
  Description: {
    rich_text: Array<{
      plain_text: string;
    }>;
  };
  Date: {
    date: {
      start: string;
    };
  };
  OGP: {
    files: Array<{
      file: {
        url: string;
      };
    }>;
  };
  Slug: {
    rich_text: Array<{
      plain_text: string;
    }>;
  };
}

export type NotionPage = PageObjectResponse & {
  properties: NotionPageProperties;
};

export type ResearchNotionPage = PageObjectResponse & {
  properties: ResearchNotionPageProperties;
};

export type WorksNotionPage = PageObjectResponse & {
  properties: WorksNotionPageProperties;
};

export type NotionBlock = BlockObjectResponse | PartialBlockObjectResponse; 