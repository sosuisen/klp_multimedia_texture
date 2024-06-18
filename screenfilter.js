import * as PIXI from 'pixi.js';

// Blendモード Screen
export const ScreenFilter = class extends PIXI.Filter {
  constructor(r, g, b) {
    const fragmentSrc = `
        varying vec2 vTextureCoord;
        uniform sampler2D uSampler;
  
        void main(void) {
          vec4 color = texture2D(uSampler, vTextureCoord);
          color.r = 1.0 - ((1.0 - color.r) * (1.0 - ${r}.0/255.0));
          color.g = 1.0 - ((1.0 - color.g) * (1.0 - ${g}.0/255.0));
          color.b = 1.0 - ((1.0 - color.b) * (1.0 - ${b}.0/255.0));
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
