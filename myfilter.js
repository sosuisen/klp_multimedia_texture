import * as PIXI from 'pixi.js';

export const MyFilter = class extends PIXI.Filter {
  constructor(r, g, b) {
    const fragmentSrc = `
        varying vec2 vTextureCoord;
        uniform sampler2D uSampler;
  
        void main(void) {
          vec4 color = texture2D(uSampler, vTextureCoord);
          color.r = min(color.r + ${r}.0/255.0, 1.0);
          color.g = min(color.g + ${g}.0/255.0, 1.0);
          color.b = min(color.b + ${b}.0/255.0, 1.0);
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
