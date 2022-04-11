# DDLDoor
ICカードで施錠および解錠を行うデバイスと連携する入退室および勤怠管理社内システムです。

# 仕様
## 互換性
Chrome, Edge, Android Chrome, iOS Safari, iOS Chromeに対応し、PWA対応ブラウザではPWA(主にアプリをインストール)が使えます。
スマホ版は情報量が制限され、必要最低限の機能になります。


## 認証
管理者アカウントがメールアドレスを元にアカウントを払い出すことができます。初回ログイン後は生成されたパスワードを変更してください。<br>
PCならサイドバーの下部、スマホならツールバーの右部にあるトグルボタンを押すとパスワード変更およびログアウト、メンバーリンクができます。<br>
Webアプリ上のアカウントと後述するメンバーの間に直接的な関係はありませんが、メンバーリンクからアカウントに対して、各自のメンバーを紐づけることを推奨します。メンバーリンクにおけるアカウントとメンバーはシステム通して一対一対応します。

## メニュー
- メンバー<br>
二つのタブに分かれます。
  - 一覧タブ<br>
  メンバーの一覧です。それぞれのボタンから登録、編集、削除ができるダイアログが表示されます。メンバーの削除はそれに紐づく全てのカードIDmも同時に削除されます。<br>**アンチパスバックエラーになった場合、対応するメンバーの状況コラムに!のアイコンが出現しますので、それを押して解除してください。**<br>メンバーリンクで紐づいているメンバーは手動打刻が利用できます。Webアプリ上でデバイスを選択して、疑似タッチができるもので、出張や在宅時の利用を想定しています。アクションコラムの黄色アイコンを押すとそのダイアログが表示されます。
  
  - 状況タブ<br>
  メンバーの在外状況等がシンプルに表示されます。

- ログ<br>
カードタッチや一時解錠等のイベント情報を出力します。期間指定でフィルターができ、CSV出力ができます。

- カードID<br>
Felicaカードの登録、編集、削除ができます。同様にボタンからダイアログが表示されます。登録ダイアログでは、外付けカードリーダーからカード情報を取得し、アプリ内に反映させることができますが、何らかの操作で取得したIDmを直打ちしても同様に登録が可能です。無許可デバイスIDでは、カードに対して、解錠を許可しないデバイスを設定することができます。<br>
すべてのカードはあるメンバーに紐づける必要があります。

- デバイス<br>
実際の運用における端末の設定情報を管理できます。現在、DDLには社員用出入口、来客用出入口が存在します。一部制限がありますが、登録および編集ができます。管理者アカウントでは削除などの運用に影響を及ぼす機能も利用できます。<br>
出口の役割を持つデバイスのみ一時解錠機能が利用できます。また、最大解錠時間が設定でき、編集機能からその値を変更できます。

- 勤務時間<br>
二つのタブに分かれます。
  - 一覧<br>
  すべてのメンバーの任意月における勤務時間に関する情報が表示されます。原則、前日までの打刻データが計算対象になります。ここにおける打刻データは30分の丸め処理がされ、実務時間は休憩時間として1時間分が引かれます。
  - 出力<br>
  すべてのメンバーの生の打刻データを細かいフィルター機能をもって、表示およびCSV出力ができます。

- メンテナンス(管理者アカウントのみ)<br>
  - アカウント<br>
  管理者かどうかを選択してメールアドレスを元にアカウントを発行および削除ができます。
  - 休日設定<br>
  勤務時間の一覧に表示される休日を設定できます。
  - Danger Zone<br>
  状態管理をしないモードへの変更、期間を指定したログの一括削除ができます。

## 開発者向け
- クライアント<br>
  Angular (v13), Angular Material. 言語はTypescript, HTML/SCSS<br>
  PWAに対応し、主にキャッシュによる高速化とバージョンの制御
- サーバー<br>
  Amazon Linux 2上でNode.js (Express)アプリをpm2でデーモン化。言語はJavascript<br>
  ビルド済みクライアントアプリを静的ファイルとしてホスト。
- DB<br>
  MongoDB. MongoDB Compassをクライアントソフトとして利用。
- Webサーバー<br>
  Apache (リバースプロキシにて利用) Let's EncryptでSSL化。証明書は自動更新。<br>
- バックアップ戦略<br>
  サーバーにおけるAMIそのものを毎週日曜の深夜にAWS上に保存ないしは更新します。加えて、二時間に一回、DBの全データをAWSのS3上に保存します。DBの全データの有効期限は1日です。AWSの認証情報は環境ファイルに格納しています。
