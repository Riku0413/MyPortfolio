# MyPortfolio

## 1. Source

### デプロイ先

- [Vercel](https://vercel.com/riku0413s-projects/my-portfolio/deployments)

### コンテンツ

- [Notion](https://www.notion.so/1d37e0613c5180fd8c76ea8843282b6d?v=1d37e0613c5180118bb9000c1ae5974b&pvs=4)
- [Notion API](https://www.notion.so/profile/integrations/internal/28e939cc-a9ff-491d-b476-0c160af612ca)
- [Cloudinary](https://console.cloudinary.com/console/c-3f6c6fa7138254d5d0b1b4d18e1bb6/media_library/folders/home?view_mode=mosaic)

## 2. ヘッドレス CMS の検討

- Notion API → 読み込み遅すぎ、offset 使えない
- microCMS → バッド UI
- wordpress → 自由度低い
- zenn→ogp なし、RSS 読み込み必要
- Contentful → 画像埋め込み可否が不明
- wordpress → 無料だと容量制限 1GB
- Sanity → エディタのデプロイ必要
- Github でごりおし → 本文と分離したメタデータを作れない
- Qiita

## 3. デプロイ先の検討

- Vercel → 共有リンク 1 つだけ
- Netlify → SSR 不可
- Github Pages → 静的サイトのみ
- レンタルサーバー → SSR 不可
- VPS
- Cloudflare Pages
- Firebase Hosting

## 4. To Do

- .heic への対応
- 記事の中身を書く
- works、research も notion に統合する
　- DBは作ったので、あとはAPIの調整のみ！
- 余計な microCMS のコードを消す
- エラーと警告の解決
- CSR と SSR を適切に分ける
- rikukobayashi.com を割り当てる
- worksに以下を追加
  - 初回ハッカソン作品、Google Map API、CVで何か、世界遺産探訪、複数画像の追加学習、ものゼミの作品
- 日英切り替え
- ページネーション
- コード整理
- サーバーどれにするか決める

## 5. 参考リンク

### CSS アニメーション

- [CSS 1](https://animate-club.com/text/css_text_animation/)
- [CSS 2](https://deshinon.com/2019/03/04/simpl-osyare-title-css/#google_vignette)

### UI コンポーネント

- [Aceternity UI](https://ui.aceternity.com/components)

### Notion API

- [Notion API](https://developers.notion.com/docs/create-a-notion-integration#step-3-importing-the-notion-sdk-serverjs)

### 見本サイト

- [No.1](https://www.takuyasasatani.com/cv/)
- [No.2](https://takuonon.com/)
- [No.3](https://www.miyashita.com/)
- [No.4](https://www.starbucks.co.jp/recruit/)