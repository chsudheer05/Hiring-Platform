import { useEffect, useRef } from 'react';

const AuroraBg = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: true, antialias: true });
    if (!gl) {
      console.warn("WebGL not supported");
      return;
    }

    const dpr = () => Math.min(2, window.devicePixelRatio || 1);

    const resize = () => {
      const r = dpr();
      canvas.width = Math.floor(window.innerWidth * r);
      canvas.height = Math.floor(window.innerHeight * r);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const vsSource = `
      attribute vec2 p;
      void main() {
        gl_Position = vec4(p, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision highp float;
      uniform float time;
      uniform vec2 resolution;
      uniform float scrollY;

      float rand(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }

      float noise(vec2 p) {
        vec2 i = floor(p), f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(rand(i), rand(i + vec2(1.0, 0.0)), u.x),
          mix(rand(i + vec2(0.0, 1.0)), rand(i + vec2(1.0, 1.0)), u.x),
          u.y
        );
      }

      float fbm(vec2 p) {
        float v = 0.0, a = 0.5;
        for (int i = 0; i < 5; i++) {
          v += a * noise(p);
          p *= 2.0;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec2 frag = vec2(gl_FragCoord.x, gl_FragCoord.y + scrollY);
        vec2 uv = frag / resolution.xy;

        uv -= 0.5;
        uv.x *= resolution.x / resolution.y;

        vec2 flow = uv * 2.6;
        flow.y += time * 0.06;

        float n = fbm(flow + fbm(flow + time * 0.12));
        float light = smoothstep(0.22, 0.78, n);

        vec3 col1 = vec3(0.02, 0.06, 0.10);
        vec3 col2 = vec3(0.00, 0.85, 0.75);
        vec3 col3 = vec3(0.35, 0.55, 1.00);

        vec3 color = mix(col1, col2, light);
        color = mix(color, col3, n * 0.35);

        float vignette = smoothstep(0.95, 0.15, length(uv));
        color *= vignette;

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const compile = (type, src) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        return null;
      }
      return shader;
    };

    const vs = compile(gl.VERTEX_SHADER, vsSource);
    const fs = compile(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const pLoc = gl.getAttribLocation(program, "p");
    gl.enableVertexAttribArray(pLoc);
    gl.vertexAttribPointer(pLoc, 2, gl.FLOAT, false, 0, 0);

    const timeLoc = gl.getUniformLocation(program, "time");
    const resLoc = gl.getUniformLocation(program, "resolution");
    const scrollLoc = gl.getUniformLocation(program, "scrollY");

    let currentScrollY = 0;
    const handleScroll = () => {
      currentScrollY = window.scrollY * dpr();
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    let animationId;
    const start = performance.now();
    const render = (now) => {
      gl.uniform1f(timeLoc, (now - start) / 1000);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.uniform1f(scrollLoc, currentScrollY);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationId = requestAnimationFrame(render);
    };
    render(start);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="gl"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  );
};

export default AuroraBg;
