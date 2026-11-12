# yama × yama. Website

`site/` が公開するLPです。元のClaudeデザインとZIPはローカルに保存し、Gitと公開対象から除外しています。ビルドや依存ライブラリのインストールは不要です。

## 編集するファイル

- `site/index.html`: 文言、アプリ紹介、リンク、問い合わせ先
- `site/styles.css`: デザイン、レスポンシブ表示、アニメーション
- `site/main.js`: 初回イントロ、スキップ、リプレイ。JavaScriptが無効でも本文を表示します。

問い合わせ先: `taiki@ourpins.app`

App StoreのリンクはOurPins、ほんのメモ、語録部に設定済みです。Day MaxerとLacrosse BoardはComing soon表示です。アプリ画面は元デザインのイメージです。

## 初回のGitHub Pages設定

1. GitHubで公開用の **Public** リポジトリ `yamayama-web` を作成します。Organizationを新しく作る場合はFreeプランで構いません。
2. このフォルダーをリポジトリのルートとして、`site/` と `.github/` を含むコードを `main` ブランチにpushします。親の `yamayama/` をルートにしないでください。
3. リポジトリの **Settings → Pages → Build and deployment → Source** を **GitHub Actions** にします。
4. **Actions → Deploy landing page to GitHub Pages → Run workflow** から初回公開を実行します。以後 `main` 上の `site/` を更新すると自動公開されます。
5. **Settings → Pages → Custom domain** に `yamaxyama.com` を入力して保存します。Actions公開では `site/CNAME` だけで独自ドメインは設定されません。
6. 下記のCloudflare DNSを設定し、GitHubのDNS確認と証明書発行が完了したら **Enforce HTTPS** を有効にします。

FreeプランでGitHub Pagesを使う場合はPublicリポジトリが必要です。公開ファイルのみを置き、秘密情報を追加しないでください。

## Cloudflare DNS

GitHub側に独自ドメインを登録してから、Cloudflareで `yamaxyama.com` の **DNS → Records** を開きます。

| Type | Name | Content | Proxy status |
| --- | --- | --- | --- |
| A | @ | 185.199.108.153 | DNS only |
| A | @ | 185.199.109.153 | DNS only |
| A | @ | 185.199.110.153 | DNS only |
| A | @ | 185.199.111.153 | DNS only |
| AAAA | @ | 2606:50c0:8000::153 | DNS only |
| AAAA | @ | 2606:50c0:8001::153 | DNS only |
| AAAA | @ | 2606:50c0:8002::153 | DNS only |
| AAAA | @ | 2606:50c0:8003::153 | DNS only |
| CNAME | www | yama-x-yama.github.io | DNS only |

公開先は [yama-x-yama/yamayama-web](https://github.com/yama-x-yama/yamayama-web) です。`www` の接続先は `yama-x-yama.github.io` です。リポジトリ名や `https://` は付けません。

既存の同じホスト名のA/AAAA/CNAMEがある場合は、用途を確認してから置き換えます。メール用のMX/TXTは変更しません。DNSの反映には最大24時間かかることがあります。

必要に応じてGitHubのアカウントまたはOrganizationの **Settings → Pages** でドメイン所有権を確認し、指定のTXTレコードをCloudflareに追加します。

## 公開するファイル

GitHub Actionsは `site/` のみを公開します。faviconは提供された `site/favicon.png` を使用します。公開先の設定とCloudflareのDNS設定は、上記の手順に従って行います。

## 公式ドキュメント

- [GitHub Pagesの公開元設定](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [独自ドメインの接続](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)

