export default {
  async fetch(request, env) {
    const html = `
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>3D Engine</title>
    <style>
        body { margin: 0; overflow: hidden; background: #111; color: #555; font-family: sans-serif; }
        canvas { display: block; }
        #info { position: absolute; bottom: 10px; right: 10px; font-size: 12px; }
    </style>
</head>
<body>
    <div id="info">Cloudflare Workers + Three.js</div>
    <script type="importmap">
    {
        "imports": {
            "three": "https://unpkg.com/three@0.160.0/build/three.module.js"
        }
    }
    </script>
    <script type="module">
        import * as THREE from 'three';

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // 立方体
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshNormalMaterial();
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        camera.position.z = 3;

        function animate() {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        }

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        animate();
    </script>
</body>
</html>
    `;

    return new Response(html, {
      headers: { 
        "content-type": "text/html;charset=UTF-8",
        // 全方位の読み込みを許可して拡張機能のエラーを抑制
        "Content-Security-Policy": "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; img-src * data: blob:;"
      }
    });
  }
};
