import * as PIXI from 'pixi.js';
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

const app = new PIXI.Application({ antialias: true, width: 640, height: 480 });
app.ticker.stop();
gsap.ticker.add(time => {
  app.ticker.update();
});

document.body.appendChild(app.view);

// タイムライン
const tl = gsap.timeline()

// コンテナの作成
const container = new PIXI.Container();
app.stage.addChild(container);

// テクスチャの作成
const texture = PIXI.Texture.from('kyoco_small.png');
// テクスチャからスプライトを作成
const sprite1 = new PIXI.Sprite(texture);
container.addChild(sprite1);
tl.to(sprite1, { x: 520, duration: 2, repeat: -1, ease: 'power1.inOut', yoyo: true });

// テクスチャは他のスプライトでも使い回すことができます。
// 一方、PIXI.Sprite.from()では、毎回新たにメモリが確保されてしまいます。
const sprite2 = new PIXI.Sprite(texture);
sprite2.position.set(520, 150);
container.addChild(sprite2);
tl.to(sprite2, { x: 0, duration: 2, repeat: -1, ease: 'power1.inOut', yoyo: true }, '<');

// 動画もテクスチャにできます（音も鳴ります）
// 「動画再生」ボタンで再生
/*
const vTexture = PIXI.Texture.from('nhk.mp4');
vTexture.baseTexture.resource.autoPlay = false;
const sprite3 = new PIXI.Sprite(vTexture);
// １番最初（0）の子、つまり１番奥へ追加
container.addChildAt(sprite3, 0);
// タイムライン開始の0秒後に開始
tl.to(sprite3, { x: -100, duration: 2, repeat: -1, ease: 'power1.inOut', yoyo: true }, '<');
*/

const mask1 = new PIXI.Graphics();
mask1.beginFill();
mask1.drawCircle(370, 150, 100);
mask1.endFill();

// 動画にマスクを追加すると、動画だけがクリッピングされます。
// sprite3.mask = mask1;

// さらにマスクを動画の子にすると、動画とともに移動します。
// sprite3.addChild(mask1);

// さらにマスクをコンテナの子にすると、コンテナ全体がクリッピングされます。
// container.mask = mask1;

// スプライトでマスクすることもできます。
// mask1 を全て外して、下記を有効にしてください。
// container.mask = sprite1;


app.stage.addChild(container);

/**
 * 動画の一時停止・再生
 */
document.getElementById('pauseBtn').addEventListener('click', () => vTexture.baseTexture.resource.source.pause());
document.getElementById('resumeBtn').addEventListener('click', () => vTexture.baseTexture.resource.source.play());
