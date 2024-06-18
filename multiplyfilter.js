import * as PIXI from 'pixi.js';

// Blendモード Multiply
export const MultiplyFilter = class extends PIXI.Filter {
  constructor(r, g, b) {
    const fragmentSrc = `
        varying vec2 vTextureCoord;
        uniform sampler2D uSampler;
  
        void main(void) {
          vec4 color = texture2D(uSampler, vTextureCoord);
          color.r = color.r * ${r}.0/255.0;
          color.g = color.g * ${g}.0/255.0;
          color.b = color.b * ${b}.0/255.0;
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
