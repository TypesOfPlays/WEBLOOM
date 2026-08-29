"use client";

import { useEffect, useRef } from "react";

/**
 * The page's one extraordinary moment: a live aurora rendered on the GPU.
 *
 * Domain-warped fbm noise, coloured only in the world's palette, that leans
 * toward the pointer and stretches with scroll velocity. It is strictly an
 * enhancement — the baked PNG field underneath is the real design, and this
 * fades in over it only when the device can carry it. When it goes live it
 * stamps `shader-live` on <html> so the PNG layers fade out.
 *
 * Never mounted on touch, narrow viewports, or reduced-motion.
 */

const VERT = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;

uniform float uTime;
uniform vec2  uRes;
uniform vec2  uMouse;
uniform float uVel;
uniform float uFade;

varying vec2 vUv;

vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return fract(sin(p) * 43758.5453) * 2.0 - 1.0;
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(dot(hash2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
        dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
    mix(dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
        dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
    u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.02;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 p = (gl_FragCoord.xy * 2.0 - uRes) / uRes.y;

  // Scroll velocity stretches the field vertically, like a long exposure.
  p.y *= 1.0 + uVel * 0.55;

  // The field leans toward the pointer rather than tracking it exactly.
  p += uMouse * 0.30;

  float t = uTime * 0.045;

  vec2 q = vec2(fbm(p * 0.85 + t), fbm(p * 0.85 + vec2(3.2, 1.7) - t));
  vec2 r = vec2(
    fbm(p * 1.25 + 2.0 * q + vec2(1.7, 9.2) + t * 0.6),
    fbm(p * 1.25 + 2.0 * q + vec2(8.3, 2.8) - t * 0.45));
  float f = fbm(p * 1.05 + 2.3 * r);

  vec3 col = vec3(0.017, 0.024, 0.049);

  // Blue body. Deliberately narrow: the field should read as filaments of
  // light inside a dark room, never as a wall of blue behind the type.
  float blue = smoothstep(0.02, 0.92, f + 0.26);
  col = mix(col, vec3(0.09, 0.28, 0.92), blue * 0.62);

  // A tight bright core only where the warp actually piles up
  float core = smoothstep(0.55, 1.05, f + 0.30);
  col = mix(col, vec3(0.34, 0.58, 1.0), core * 0.34);

  // Mint, threaded through the warp
  float mint = smoothstep(0.34, 0.92, r.x + 0.30);
  col = mix(col, vec3(0.0, 0.88, 0.80), mint * 0.17);

  // Amber, low and warm
  float amber = smoothstep(0.42, 1.05, q.y + 0.40);
  col = mix(col, vec3(1.0, 0.64, 0.02), amber * 0.19);

  // The headline owns the left. Bloom the field into the empty upper right,
  // so the light fills the composition instead of fighting the type.
  vec2 v = (gl_FragCoord.xy / uRes) - vec2(0.66, 0.76);
  v.x *= uRes.x / uRes.y;
  float vig = 1.0 - smoothstep(0.16, 1.15, length(v));
  col *= vig;

  gl_FragColor = vec4(col * uFade, uFade);
}
`;

export default function ShaderField() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches)
      return;

    let disposed = false;
    let cleanup = () => {};

    const boot = async () => {
      let mod: typeof import("ogl");
      try {
        mod = await import("ogl");
      } catch {
        return; // fallback field stays; nothing else to do
      }
      if (disposed) return;

      const { Renderer, Program, Mesh, Triangle } = mod;

      let renderer;
      try {
        renderer = new Renderer({
          dpr: Math.min(window.devicePixelRatio || 1, 1.5),
          alpha: true,
          antialias: false,
          powerPreference: "high-performance",
        });
      } catch {
        return; // no WebGL — fallback field stays
      }

      const gl = renderer.gl;
      gl.canvas.style.cssText =
        "position:absolute;inset:0;width:100%;height:100%;display:block";
      host.appendChild(gl.canvas);

      const program = new Program(gl, {
        vertex: VERT,
        fragment: FRAG,
        uniforms: {
          uTime: { value: 0 },
          uRes: { value: [1, 1] },
          uMouse: { value: [0, 0] },
          uVel: { value: 0 },
          uFade: { value: 0 },
        },
      });
      const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

      const resize = () => {
        const w = host.clientWidth;
        const h = host.clientHeight;
        renderer.setSize(w, h);
        program.uniforms.uRes.value = [
          gl.drawingBufferWidth,
          gl.drawingBufferHeight,
        ];
      };
      resize();

      let mx = 0;
      let my = 0;
      let tmx = 0;
      let tmy = 0;
      const onMove = (e: PointerEvent) => {
        tmx = (e.clientX / window.innerWidth - 0.5) * 2;
        tmy = -(e.clientY / window.innerHeight - 0.5) * 2;
      };

      let lastScroll = window.scrollY;
      let vel = 0;
      const onScroll = () => {
        const now = window.scrollY;
        vel = Math.min(Math.abs(now - lastScroll) / 90, 1);
        lastScroll = now;
      };

      let visible = !document.hidden;
      const onVisibility = () => {
        visible = !document.hidden;
        if (visible) loop(performance.now());
      };

      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", resize);
      document.addEventListener("visibilitychange", onVisibility);

      let raf = 0;
      let start = 0;
      let fade = 0;

      const loop = (now: number) => {
        if (disposed || !visible) {
          raf = 0;
          return;
        }
        if (!start) start = now;

        mx += (tmx - mx) * 0.045;
        my += (tmy - my) * 0.045;
        vel *= 0.9;
        fade = Math.min(fade + 0.012, 1);

        program.uniforms.uTime.value = (now - start) / 1000;
        program.uniforms.uMouse.value = [mx, my];
        program.uniforms.uVel.value = vel;
        program.uniforms.uFade.value = fade;

        renderer.render({ scene: mesh });
        raf = requestAnimationFrame(loop);
      };

      document.documentElement.classList.add("shader-live");
      raf = requestAnimationFrame(loop);

      cleanup = () => {
        if (raf) cancelAnimationFrame(raf);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", resize);
        document.removeEventListener("visibilitychange", onVisibility);
        document.documentElement.classList.remove("shader-live");
        gl.canvas.remove();
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      };
    };

    // Never compete with the first paint.
    const idle =
      window.requestIdleCallback?.(boot, { timeout: 1500 }) ??
      window.setTimeout(boot, 400);

    return () => {
      disposed = true;
      if (typeof idle === "number") clearTimeout(idle);
      window.cancelIdleCallback?.(idle as number);
      cleanup();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ contain: "strict" }}
    />
  );
}
