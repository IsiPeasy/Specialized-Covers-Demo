"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export interface Cover3DProps {
  side: string;
  centre: string;
  piping: string;
  stripe: string;
  stripeOn: boolean;
  view: "three" | "side" | "top";
  className?: string;
}

/** Builds the cover's cross-section from the same SVG path every 2D preview uses. */
function carShape(): THREE.Shape {
  const s = new THREE.Shape();
  const k = 0.01, cx = 400, cy = 160;
  const P = (x: number, y: number): [number, number] => [(x - cx) * k, (cy - y) * k];
  const m = P(70, 200); s.moveTo(m[0], m[1]);
  const C = (a: number, b: number, c: number, d: number, e: number, f: number) => { const p1 = P(a, b), p2 = P(c, d), p3 = P(e, f); s.bezierCurveTo(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]); };
  const L = (a: number, b: number) => { const p = P(a, b); s.lineTo(p[0], p[1]); };
  C(62, 175, 70, 160, 95, 152); L(190, 140); C(250, 135, 290, 100, 340, 82); C(380, 68, 440, 66, 480, 72); C(530, 80, 570, 110, 610, 128); L(700, 145); C(735, 152, 745, 170, 735, 200);
  L(648, 200); C(643, 165, 577, 165, 572, 200); L(228, 200); C(223, 165, 157, 165, 152, 200); L(70, 200);
  return s;
}

/**
 * Real-time 3D cover (three.js). One extruded mesh per cover shape in production —
 * here the Coupé — with separate materials for side panels (caps), centre panel (walls),
 * piping (tubes) and racing stripe. Colours update without rebuilding geometry.
 */
export default function Cover3D(props: Cover3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rig = useRef<{ side: THREE.MeshStandardMaterial; centre: THREE.MeshStandardMaterial; pipe: THREE.MeshStandardMaterial; stripeMat: THREE.MeshStandardMaterial; stripe: THREE.Mesh; group: THREE.Group; camTarget: THREE.Vector3; view: string } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const W = canvas.clientWidth || 1040, H = canvas.clientHeight || 830;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio)); renderer.setSize(W, H, false); renderer.shadowMap.enabled = true;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, W / H, 0.1, 100);
    const camTarget = new THREE.Vector3(4.2, 3.2, 12.6); camera.position.copy(camTarget); camera.lookAt(0, 0, 0);
    scene.add(new THREE.HemisphereLight(0xffffff, 0x9a9484, 0.95));
    const sun = new THREE.DirectionalLight(0xfff4e0, 1.0); sun.position.set(4, 7, 5); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048); scene.add(sun);
    const group = new THREE.Group(); scene.add(group);
    const depth = 2.0;
    const geo = new THREE.ExtrudeGeometry(carShape(), { depth, bevelEnabled: true, bevelThickness: 0.16, bevelSize: 0.14, bevelSegments: 5, curveSegments: 24 });
    geo.translate(0, 0, -depth / 2);
    const side = new THREE.MeshStandardMaterial({ color: props.side, roughness: 0.92 });
    const centre = new THREE.MeshStandardMaterial({ color: props.centre, roughness: 0.92 });
    const body = new THREE.Mesh(geo, [side, centre]); body.castShadow = true; group.add(body);
    const wheelGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.34, 32); wheelGeo.rotateX(Math.PI / 2);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x0e0f10, roughness: 0.6 });
    for (const [x, y, z] of [[-2.1, -0.45, 1.05], [2.1, -0.45, 1.05], [-2.1, -0.45, -1.05], [2.1, -0.45, -1.05]]) { const w = new THREE.Mesh(wheelGeo, wheelMat); w.position.set(x, y, z); w.castShadow = true; group.add(w); }
    const pipe = new THREE.MeshStandardMaterial({ color: props.piping, roughness: 0.5 });
    const ridge = [[70, 168], [250, 157], [400, 156], [600, 158], [740, 168]];
    for (const z of [depth / 2 + 0.15, -depth / 2 - 0.15]) {
      const pts = ridge.map(([x, y]) => new THREE.Vector3((x - 400) * 0.01, (160 - y) * 0.01, z));
      group.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 40, 0.035, 10, false), pipe));
    }
    const stripeMat = new THREE.MeshStandardMaterial({ color: props.stripe, roughness: 0.8 });
    const top = [[95, 152], [190, 140], [340, 82], [480, 72], [610, 128], [700, 145]].map(([x, y]) => new THREE.Vector3((x - 400) * 0.01, (160 - y) * 0.01 + 0.16, 0));
    const stripe = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(top), 60, 0.12, 4, false), stripeMat);
    stripe.scale.z = 0.35; stripe.visible = props.stripeOn; group.add(stripe);
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), new THREE.ShadowMaterial({ opacity: 0.18 }));
    ground.rotation.x = -Math.PI / 2; ground.position.y = -0.85; ground.receiveShadow = true; scene.add(ground);

    rig.current = { side, centre, pipe, stripeMat, stripe, group, camTarget, view: props.view };
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      camera.position.lerp(camTarget, 0.06); camera.lookAt(0, 0, 0);
      if (rig.current?.view === "three") group.rotation.y += 0.003;
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); renderer.dispose(); geo.dispose(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const r = rig.current; if (!r) return;
    r.side.color.set(props.side); r.centre.color.set(props.centre); r.pipe.color.set(props.piping); r.stripeMat.color.set(props.stripe);
    r.stripe.visible = props.stripeOn; r.view = props.view;
    if (props.view === "side") { r.camTarget.set(0, 0.8, 13.5); r.group.rotation.y = 0; }
    else if (props.view === "top") { r.camTarget.set(0.01, 13.5, 0.01); r.group.rotation.y = 0; }
    else r.camTarget.set(4.2, 3.2, 12.6);
  }, [props.side, props.centre, props.piping, props.stripe, props.stripeOn, props.view]);

  return <canvas ref={canvasRef} className={props.className} aria-label="3D preview of your cover" />;
}
