---
title: "改良版アプリをリリースするためにやったこと"
path: blog/uni-tool-v2
tags: [flutter]
date: 2021-09-06
emoji: "✨"
excerpt: 前作のアプリと比較して「ゆにつーる」はどこが進化しているのかという話
---

「ゆにつーる for ユニエア」は「ユニエア 期待値計算機」というアプリの改良版です。そこで今回はゆにつーるの何が「改良版」なのかという話をしたいと思います。

[以前のアプリやユニエアについての説明は以前のブログから](https://www.zoniha.icu/blog/uoa-ev-calculator)

## 新機能

---

アプリに追加された新機能を紹介します。


### 計算モードの追加

ゲームではスコアボーナスのスキルが完全な一強なので、他のスキルの計算は必要ないと思い、以前はスコアボーナスの計算しかできませんでしたが、需要があるということでコンボボーナスの計算にも対応しました。計算モードの切替にはトグルボタンを採用することでUI的にもスッキリとした形で実装することができました。

### システム画面の追加

システム画面ではアプリのバージョンやアプリの使い方、プライバシーポリシー、免責事項を確認できます。特に、計算モードの切り替えやカスタムキーボードを使用しているので、使い方をユーザーに説明することでより快適に使ってもらえると思い、使用方法を書いたブログページへ遷移できるようにしました。また、プライバシーポリシーなどはApp Storeから確認できましたが、アプリ内からも確認できるようにしました。

そして、画面が増えたのでボトムナビゲーションバーを実装して画面切り替えをできるようにしました。実装には[convex_bottom_bar](https://pub.dev/packages/convex_bottom_bar)というパッケージを使いました。FlutterはGoogleが開発した人気のフレームワークということで、多くのパッケージが開発されているので、こういう時にとても楽です。

### スプラッシュ画面の追加

スプラッシュ画面を追加することで、読み込みによるユーザーのストレスを軽減すると同時にアプリに対する期待感を高めることに繋げました。

## 技術的な改良点

---

### screenファイルとデザインファイルを分けた

ゆにつーるは意外にもデザインにも時間をかけて作られているので、背景やテキストなど独自の色を指定していることが多いです。さらに、今回は以前と比較して画面が増えたので、色や背景テーマなどをWidgetファイルと分けて管理しやすくしました。また、以前は色を`MaterialColor`で作成していたのですが、`MaterialColor`は好きな色を生成するのが難しく、自身で生成用のコードを書く必要がありました。この場合、生成用のコードを書くことはそれほど問題ではなく、`const`を使えないことでした。そこで、`Color`として定義することで`const`をつけてコンパイル時定数として扱えるようになり、実行速度の向上に繋げました。

### Widgetに`const`をつける

前回もやっていたことですが、厳しめのlinterを導入することでつけ忘れをなくし、Widgetの余計な再構築を減らしてパフォーマンスの向上に繋げました。

### Riverpodの再勉強

知識不足が原因で書かれた無駄なコードを整理しました。具体的には状態管理を行っている`Riverpod`では監視してる変数などの変更を検知してその変数が使われているWidgetなどを更新するのですが、必要のないところでも変数の変更の監視をしていたので、その部分を削除しました。

### アプリサイズの削減

クロスプラットフォームアプリはネイティブアプリと比較してアプリサイズが大きくなってしまうことがデメリットの1つとなっています。さすがにネイティブアプリのサイズまでは無理ですが、改良前と比較してゆにつーるでは約6MBのアプリサイズ削減に成功しました。機能や画面が増えているにもかかわらず、アプリサイズを削減できたのは、上記の工夫と前回のアプリリリースからの勉強の成果ということで。

## 最後に

---

以上で、前作のアプリと比較して「ゆにつーる」はどこが進化しているのかという話を終わります。ありがとうございました。
