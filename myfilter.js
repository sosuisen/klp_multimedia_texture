import * as PIXI from 'pixi.js';

export const MyFilter = class extends PIXI.Filter {
  constructor() {
    const fragmentSrc = `
        varying vec2 vTextureCoord;
        uniform sampler2D uSampler;
  
        void main(void) {
          vec4 color = texture2D(uSampler, vTextureCoord);
          color.r += min(144.0/255.0, 255.0);
          color.g += min(144.0/255.0, 255.0);

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
