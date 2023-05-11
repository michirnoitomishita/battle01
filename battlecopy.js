// 以下の2行を追加

const rockImage = $("#rock-image");
rockImage.on("click", () => {
  battle("グー");
  // $("#rock-image_kekka").show();
  // $("#mannnaka_sita_right img").hide(); // 追加
});

const choImage = $("#cho-image");
choImage.on("click", () => {
  battle("チョキ");
  // $("#cho-image_kekka").show();
  // $("#mannnaka_sita_right img").hide(); // 追加
});

const paImage = $("#pa-image");
paImage.on("click", () => {
  battle("パー");
  // $("#pa-image_kekka").show();
  // $("#mannnaka_sita_right img").hide(); // 追加
});

// その他のコードはそのまま

// Playerクラス
class Player {
  #energy;
  #power;
  #maxEnergy;

  constructor(energy, power) {
    this.#energy = energy;
    this.#maxEnergy = energy; // 追加
    this.#power = power;
  }

  // アクセサ
  get energy() {
    return this.#energy;
  }

  set energy(energy) {
    this.#energy = energy;
  }

  get maxEnergy() {
    return this.#maxEnergy; // 追加
  }

  get power() {
    return this.#power;
  }

  set power(power) {
    this.#power = power;
  }

  reduceMaxEnergy(amount) {
    this.#maxEnergy = Math.max(0, this.#maxEnergy - amount);
  }

  // 攻撃
  attack(enemy) {
    let damage = 0;
    if (Math.random() < 0.3) {
      // 30%の確率で体力を６回復
      this.#heal(6);
    } else {
      // 10%の確率で会心の一撃
      const criticalHit = Math.random() < 0.1;
      damage = criticalHit ? this.power * 1.5 : this.power;
      enemy.energy -= damage;
      enemy.reduceMaxEnergy(damage);
      displayMessage(
        (criticalHit ? "会心の一撃！" : "") + damage + "のダメージを与えた！"
      );
    }
    return damage;
  }
  // 体力回復
  #heal(recovery) {
    this.energy += recovery;
    displayMessage("呼吸をととのえ" + recovery + "回復した！");
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
    // 10%の確率で会心の一撃
    const criticalHit = Math.random() < 0.1;
    const damage = criticalHit ? this.power * 2 : this.power;
    // enemy.energy -= damage;
    enemy.reduceMaxEnergy(damage);
    displayMessage(
      (criticalHit ? "会心の一撃！" : "") + damage + "のダメージを喰らった！"
    );
    return damage;
  }
}

// 主人公とドラゴンのインスタンスを生成
const player = new Player(15, 5);
// プレイヤーの体力:15,攻撃力:5
const dragon = new Dragon(25, 4);
// ドラゴンの体力:25,攻撃力:4

const battleResult = $("#battle-result");
const rockButton = $("#rock-button");
const scissorsButton = $("#scissors-button");
const paperButton = $("#paper-button");

function displayMessage(message) {
  const p = $("<p>");
  p.text(message);
  battleResult.append(p);
}

function disableButtons() {
  rockButton.prop("disabled", true);
  scissorsButton.prop("disabled", true);
  paperButton.prop("disabled", true);
}

function jankenResult(playerHand, dragonHand) {
  if (playerHand === dragonHand) {
    return "draw";
  } else if (
    (playerHand === "グー" && dragonHand === "チョキ") ||
    (playerHand === "チョキ" && dragonHand === "パー") ||
    (playerHand === "パー" && dragonHand === "グー")
  ) {
    return "win";
  } else {
    return "lose";
  }
}
const playerHandImages = {
  グー: $("#rock-image_kekka"),
  チョキ: $("#cho-image_kekka"),
  パー: $("#pa-image_kekka"),
};

function battle(playerHand) {
  battleResult.empty(); // ここで既存のメッセージをクリア
  displayMessage(
    `あなたの最大体力: ${player.maxEnergy}\nテッシンの最大体力: ${dragon.maxEnergy}\n`
  );

  // すべての画像を非表示にする
  for (const image of Object.values(playerHandImages)) {
    image.hide();
  }
  // プレイヤーの手の画像を表示
  playerHandImages[playerHand].show();

  const dragonHandChoices = ["グー", "チョキ", "パー"];
  const dragonHand = dragonHandChoices[Math.floor(Math.random() * 3)];
  const dragonHandImage = $(
    "#dragon_" + dragonHand.toLowerCase() + "-image_kekka"
  );
  dragonHandImage.show();
  // ドラゴンの手の画像を表示
  $("#dragon_" + dragonHand.toLowerCase() + "-image").show();

  displayMessage(`○あなたの拳: ${playerHand}\n●テッシンの拳: ${dragonHand}\n`);

  const result = jankenResult(playerHand, dragonHand);

  let dealtDamage;
  if (result === "win") {
    displayMessage("あなたの勝ち！\n");
    dealtDamage = player.attack(dragon);
    displayMessage("あなたが与えたダメージ: " + dealtDamage); //ダメージの表記
  } else if (result === "lose") {
    displayMessage("あなたの負け！\n");
    player.energy -= dragon.power;
    dealtDamage = dragon.attack(player);
    displayMessage("テッシンが与えたダメージ: " + dealtDamage);
  } else {
    displayMessage("引き分け！\n");
  }

  // for (const image of Object.values(playerHandImages)) {
  //   image.hide(); // 最初はすべての画像を非表示に
  // }

  if (player.energy <= 0) {
    displayMessage("あなたは敗れた！");
    disableButtons(); // 戦闘が終了したらボタンを無効化
    return;
  } else if (dragon.energy <= 0) {
    displayMessage("テッシンを倒した！");
    disableButtons(); // 戦闘が終了したらボタンを無効化
    return;
  }

  displayMessage(
    `あなたの体力: ${player.energy}\nテッシンの体力: ${dragon.energy}\n`
  );
}

rockButton.on("click", () => {
  battle("グー");
});

scissorsButton.on("click", () => {
  battle("チョキ");
});

paperButton.on("click", () => {
  battle("パー");
});
