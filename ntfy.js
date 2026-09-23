(function(Scratch) {
  'use strict';

  class NtfyPushExtension {
    getInfo() {
      return {
        id: 'ntfypush',
        name: 'プッシュ通知', // 実用的な機能名
        color1: '#00C49A', // スマートな緑色
        color2: '#00A380',
        blocks: [
          {
            opcode: 'sendPush',
            blockType: Scratch.BlockType.COMMAND,
            text: '宛先 [TOPIC] に通知 [MESSAGE] を送る',
            arguments: {
              TOPIC: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'jibun-no-id-9876' // トピック名の例
              },
              MESSAGE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'ゲームがクリアされました！'
              }
            }
          }
        ]
      };
    }

    sendPush(args) {
      const topic = String(args.TOPIC);
      const message = String(args.MESSAGE);

      // 宛先が空っぽの場合は送らない
      if (topic.trim() === '') {
        console.log('宛先が入力されていません。');
        return;
      }

      // ntfy.shのURLを組み立てる
      const url = `https://ntfy.sh/${encodeURIComponent(topic)}`;

      // データを送信する
      return fetch(url, {
        method: 'POST',
        body: message
      })
      .then(response => {
        if (response.ok) {
          console.log('通知を送信しました。');
        } else {
          console.error('通信エラー:', response.statusText);
        }
      })
      .catch(error => {
        console.error('エラーが発生しました:', error);
      });
    }
  }

  Scratch.extensions.register(new NtfyPushExtension());
})(Scratch);
