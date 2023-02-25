PIXI.filters.MyFilter = class extends PIXI.Filter {
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
    // 式に数値を書くときはは 144.0 のように必ず浮動小数点数で書いてください。
    // 書く色の値が 1.0 を超えたら 1.0 にしてください。

    const fragmentSrc = `
        precision mediump float;
        varying vec2 vTextureCoord;
        uniform sampler2D uSampler;
  
        void main(void) {
          vec4 color = texture2D(uSampler, vTextureCoord);
          color.r += 144.0/255.0;
          color.r = color.r > 1.0 ? 1.0 : color.r;
          color.g += 144.0/255.0;
          color.g = color.g > 1.0 ? 1.0 : color.g;
          // color.b += 0;
          // color.b = color.r > 1.0 ? 1.0 : color.b;
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