PIXI.filters.MyFilter = class extends PIXI.Filter {
  constructor() {
    const fragmentSrc = `
        precision mediump float;
        varying vec2 vTextureCoord;
        uniform sampler2D uSampler;
  
        void main(void) {
          vec4 color = texture2D(uSampler, vTextureCoord);
          color.r = min(color.r + 144.0/255.0, 1.0);
          color.g = min(color.g + 144.0/255.0, 1.0);
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