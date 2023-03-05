import * as PIXI from 'pixi.js';

export const MyFilter = class extends PIXI.Filter {
  constructor() {
    // colorには元の画像のピクセルの色が収められています。
    //
    // 今回、元の画像に対して加算（Add）したい色は #909000 です。
    // rgbを0から255までの数値で表現すると、rgb(144, 144, 0)です。
    // 
    // 一方、シェーダでは色は0.0から1.0までの範囲で表現されます。
    // たとえば、255は1.0、51は0.2となります。よって、
    // color.r += 0.2;
    // と書くと、rに51を加算（Add）するのと同じです。
    // 
    // GLSLでは一般的な四則演算 + - * /
    // if文、三項演算子、
    // そのほか、次のようなビルトイン関数が使えます。
    //   min(x, y)   xとyのより小さい値を返す
    //   max(x, y)   xとyのより大きい値を返す
    // 
    // 式に数値を書くときはは 144.0 のように必ず浮動小数点数で書いてください。
    // 色の値が 1.0 を超えたら 1.0 にしてください。

    const fragmentSrc = `
        varying vec2 vTextureCoord;
        uniform sampler2D uSampler;
  
        void main(void) {
          vec4 color = texture2D(uSampler, vTextureCoord);

          // 下記は例です。修正してください。
          color.r += 0.2;
          color.g += 0.2;
          color.b += 0.2;
          

          gl_FragColor = color;
        }
      `;

    super(
      null, // vertex shader
      fragmentSrc, // fragment shader
      {} // uniforms
    );
  }
};
