import * as PIXI from 'pixi.js';
import { AddFilter } from './addfilter.js';
import { MultiplyFilter } from './multiplyfilter.js';
import { ScreenFilter } from './screenfilter.js';
// 重ねる色を指定
const color = 0x909000;

// 絵の縦横サイズ
const imgSize = 256;

let app = new PIXI.Application({ antialias: true, width: imgSize * 3, height: imgSize * 2 });

document.body.appendChild(app.view);

const kyoco = PIXI.Texture.from('kyocotan.png');
const bg1 = PIXI.Sprite.from(kyoco);
const bg2 = PIXI.Sprite.from(kyoco);
bg2.x = imgSize;
const bg3 = PIXI.Sprite.from(kyoco);
bg3.x = imgSize * 2;
const bg4 = PIXI.Sprite.from(kyoco);
bg4.y = imgSize;
const bg5 = PIXI.Sprite.from(kyoco);
bg5.x = imgSize;
bg5.y = imgSize;
const bg6 = PIXI.Sprite.from(kyoco);
bg6.x = imgSize * 2;
bg6.y = imgSize;

app.stage.addChild(bg1);
app.stage.addChild(bg2);
app.stage.addChild(bg3);
app.stage.addChild(bg4);
app.stage.addChild(bg5);
app.stage.addChild(bg6);

const createCircle = (color) => {
  const circle = new PIXI.Graphics();
  circle.beginFill(color);
  circle.drawCircle(0, 0, 100);
  circle.endFill();
  circle.position.set(imgSize / 2, imgSize / 2);
  return circle;
}

const style = new PIXI.TextStyle({
  stroke: '#ffffff',
  strokeThickness: 3,
});

// 通常（NORMAL）（デフォルト）
const c1 = createCircle(color);
c1.alpha = 0.5; // 透明度50%
bg1.addChild(c1);
bg1.addChild(new PIXI.Text('Normal（Alpha 0.5）', style));

// 乗算（Multiply）
const c2 = createCircle(color);
c2.blendMode = PIXI.BLEND_MODES.MULTIPLY;
bg2.addChild(c2);
bg2.addChild(new PIXI.Text('Multiply', style));

// 加算（Add）
const c3 = createCircle(color);
c3.blendMode = PIXI.BLEND_MODES.ADD;
bg3.addChild(c3);
bg3.addChild(new PIXI.Text('Add', style));

// スクリーン（Screen）
const c4 = createCircle(color);
c4.blendMode = PIXI.BLEND_MODES.SCREEN;
bg4.addChild(c4);
bg4.addChild(new PIXI.Text('Screen', style));

// tint プロパティは Multiply と同じ効果
bg5.addChild(new PIXI.Text('tint', style));
bg5.tint = color;

/**
 * 発展課題
 */ 
// カスタムフィルタを適用
const addFilter = new AddFilter(144, 144, 0);
const multiplyFilter = new MultiplyFilter(144, 144, 0);
const screenFilter = new ScreenFilter(144, 144, 0);
bg6.filters = [addFilter];
bg6.addChild(new PIXI.Text('シェーダ版（発展）', style));

document.getElementById('blendModeSelector').addEventListener('change', (e) => {  
  const value = e.target.value;
  switch (value) {
    case 'add':
      bg6.filters = [addFilter];
      break;
    case 'multiply':
      bg6.filters = [multiplyFilter];
      break;
    case 'screen':
      bg6.filters = [screenFilter];
      break;
  }
});