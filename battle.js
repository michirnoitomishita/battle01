// "use strict";

// start.html

// 配列練習
// let meibo = ["富下哲基", "蔡真基", "蔡倫基"];
// let name = meibo[2];
// console.log(name);

// // 配列練習;
// let meibo = ["富下哲基", "蔡真基", "蔡倫基"];
// meibo[2] = "富下昌亮";
// console.log(meibo[2]);

// 繰り返し指定した数だけ繰り返す（for）
// for (初期化式; 条件式; 加算式){

// }
// // 例
// let total = 0;

// for (let i = 1; i <= 10; i++) {
//   total = total + i;
// }
// console.log("合計は" + total);
// ※無制限はwhile
// function 関数　let 変数

// RPG
// ■主人公クラス
class Player {
  #energy;
  #power;

  constructor(energy, power) {
    this.#energy = energy;
    this.#power = power;
  }

  // アクセサ
  get energy() {
    return this.#energy;
  }

  set energy(energy) {
    this.#energy = energy;
  }
  get power() {
    return this.#power;
  }

  set power(power) {
    this.#power = power;
  }

  // 攻撃
  attack(enemy) {
    if (Math.random() < 0.3) {
      // 30%の確率で体力を６回復
      this.#heal(6);
    } else {
      // それ以外の場合、攻撃して相手の体力を減らす
      enemy.energy -= this.power;
      console.log(this.power + "のダメージを与えた！");
    }
  }
  // 体力回復
  #heal(recovery) {
    this.energy += recovery;
    console.log(recovery + "回復した！");
  }
}

// ■ドラゴンクラス
class Dragon extends Player {
  // コンスタラクタ
  constructor(energy, power) {
    super(energy, power);
  }
  // 攻撃
  attack(enemy) {
    enemy.energy -= this.power;
    console.log(this.power + "のダメージを与えた！");
  }
}

// 主人公とドラゴンのインスタンスを生成
const player = new Player(15, 5);
// プレイヤーの体力:15,攻撃力:5
const dragon = new Dragon(25, 4);

const battleResult = $("#battle-result");

function displayMessage(message) {
  const p = $("<p>");
  p.text(message);
  battleResult.append(p);
}

while (player.energy > 0 && dragon.energy > 0) {
  // 主人公の行動
  console.log("あなたの攻撃！\n");
  player.attack(dragon);
  if (dragon.energy <= 0) {
    console.log("ドラゴンを倒した！");
    break;
  }
  // ドラゴンの行動
  console.log("ドラゴンの攻撃!\n");
  dragon.attack(player);
  if (player.energy <= 0) {
    console.log("ドラゴンに敗れた！");
    break;
  }
}
