import fs from 'fs';
import path from 'path';

// Netlifyのデプロイプレビュー（*.netlify.app）には、Netlify自身が
// `data-netlify-deploy-id` 属性付きのdivを画面下部に固定表示で挿入してくる
// （本番ドメインには挿入されない）。
// 地図と無関係な表示が画面下に重なり、印刷時にも部分的に印字されてしまう問題
// （geolonia/takamatsu-ops-2026#164, 2026-08-24 指摘）の再発防止として、
// グローバルCSSで常時非表示にしていることを固定する。
describe('Netlifyデプロイプレビューのバナー非表示', () => {
  const css = fs.readFileSync(path.join(__dirname, 'index.css'), 'utf-8');

  test('data-netlify-deploy-id を持つ要素を display: none にしている', () => {
    const rule = /div\[data-netlify-deploy-id\]\s*\{[^}]*display:\s*none\s*!important;[^}]*\}/;
    expect(css).toMatch(rule);
  });
});
