# install
npm install

# サーバー起動
npm run start

# ツイート取得
npm run tweet
変数screenNameにツイッターアカウント名を設定すること。

# 動作環境
OSX ElCapitan 10.11.6
node v4.4.7
npm 3.10.8

# 準備
## 同一ネットワークにつないだPCとタブレットを用意する
PCを管理者画面
タブレットをアプリ画面として使用する
※無線環境の場合、同一ネットワーク内で通信ができる環境に設定しているか確認すること

## サーバーを起動する
VSCODEの場合は、Shift + Command + B

## タブレットとPCに画面を表示する
・PC
http://localhost:3030/admin.html
https://personality-insights-livedemo.mybluemix.net/
・タブレット
http://{ipaddress}:3030/app.html

IPアドレスは、ターミナルでifconfigを叩いて調べる

# 使い方
1. (app) タブレット画面でツメノアカを作成する対象の有名人と比較するツイッターのアカウント名を入力する
2. (app) generateボタンを押下
3. (admin) ツイートを最大千件取得すると、取得結果に結果が表示される
4. 取得結果をコピペして、https://personality-insights-livedemo.mybluemix.net/ にアクセス
5. テキスト入力＞任意のテキストにペーストして、分析ボタン押下
6. (admin) ビッグファイブの値をツイッターアカウントの解析結果に入力する
7. (admin) 送信するボタン押下
8. 解析結果の調合を紙に記述する
9. その通りに調合する
※ユーザー画面の初期化押下でapp.htmlを初期表示状態にする
