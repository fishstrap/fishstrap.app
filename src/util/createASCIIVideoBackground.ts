/** @format */

// ASCII Video Background for Svelte 5 + Three.js + TypeScript
import { onMount } from "svelte";
import * as THREE from "three";

export function createASCIIVideoBackground(
    container: HTMLElement,
    videoPath: string,
) {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Video texture setup
    const video = document.createElement("video");
    video.src = videoPath;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;

    // Create texture from video
    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    videoTexture.format = THREE.RGBFormat;

    // Create shader material
    const shaderMaterial = new THREE.ShaderMaterial({
        uniforms: {
            iChannel0: { value: videoTexture },
            iResolution: {
                value: new THREE.Vector2(window.innerWidth, window.innerHeight),
            },
            iTime: { value: 0.0 },
            zoom: { value: 1.0 },
        },
        vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
        fragmentShader: `
      uniform sampler2D iChannel0;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform float zoom;
      varying vec2 vUv;

      // Helper function to calculate grayscale value
      float gray(vec3 color) {
        return color.x * 0.299 + color.y * 0.587 + color.z * 0.114;
      }

      // Character bitmap function
      float getBit(int n, int pos) {
        return floor(mod(float(n) / pow(2.0, float(pos)), 2.0));
      }

      // Character pattern macro replacement
      float getCharacter(int charPos, int x, int y) {
        // Space
        if (charPos == 0) {
          return 0.0;
        }
        // Dot
        else if (charPos == 1) {
          if ((y == 4 || y == 3) && (x == 3 || x == 4)) {
            return 1.0;
          }
        }
        // Comma
        else if (charPos == 2) {
          if (((y == 4 || y == 3) && (x == 3 || x == 4)) || (y == 2 && x == 4) || (y == 1 && x == 3)) {
            return 1.0;
          }
        }
        // Dash
        else if (charPos == 3) {
          if (y == 6) {
            return 1.0;
          }
        }
        // Plus
        else if (charPos == 4) {
          if ((y == 9 || y == 8 || y == 7 || y == 5 || y == 4 || y == 3) && x == 3) {
            return 1.0;
          }
          if (y == 6) {
            return 1.0;
          }
        }
        // Asterisk
        else if (charPos == 5) {
          if (y == 10 || y == 6 || y == 2) {
            if (x == 3) {
              return 1.0;
            }
          }
          if (y == 9 || y == 3) {
            if (x == 1 || x == 3 || x == 6) {
              return 1.0;
            }
          }
          if (y == 8 || y == 4) {
            if (x == 2 || x == 3 || x == 5) {
              return 1.0;
            }
          }
          if (y == 7 || y == 5) {
            if (x == 3 || x == 4 || x == 5) {
              return 1.0;
            }
          }
        }
        // Hash
        else if (charPos == 6) {
          if ((y == 10 || y == 9 || y == 6 || y == 5 || y == 4 || y == 1) && (x == 2 || x == 5)) {
            return 1.0;
          }
          if ((y == 8 || y == 3) && (x >= 0 && x <= 6)) {
            return 1.0;
          }
        }
        // At symbol
        else if (charPos == 7) {
          if (y == 10 && (x >= 2 && x <= 5)) {
            return 1.0;
          }
          if ((y == 9 || y == 2) && (x == 1 || x == 6)) {
            return 1.0;
          }
          if (y == 8 && (x == 0 || x == 3 || x == 4 || x == 5 || x == 6)) {
            return 1.0;
          }
          if ((y == 7 || y == 6 || y == 5 || y == 4) && (x == 0 || x == 3 || x == 6)) {
            return 1.0;
          }
          if (y == 3 && (x == 0 || x >= 2 && x <= 6)) {
            return 1.0;
          }
          if (y == 1 && (x >= 2 && x <= 6)) {
            return 1.0;
          }
        }
        return 0.0;
      }

      void main() {
        vec2 fragCoord = vUv * iResolution;
        vec2 uv = vec2(floor(fragCoord.x / (8.0 * zoom)) * 8.0 * zoom, floor(fragCoord.y / (12.0 * zoom)) * 12.0 * zoom) / iResolution;
        ivec2 charPos = ivec2(int(mod(fragCoord.x / zoom, 8.0)), int(mod(fragCoord.y / zoom, 12.0)));
        
        vec4 tex = texture2D(iChannel0, uv);
        float g = gray(tex.rgb);
        float cha = 0.0;
        
        // Determine which character to use based on the grayscale value
        int charIndex;
        if (g < 0.125) {
          charIndex = 0; // Space
        } else if (g < 0.25) {
          charIndex = 1; // Dot
        } else if (g < 0.375) {
          charIndex = 2; // Comma
        } else if (g < 0.5) {
          charIndex = 3; // Dash
        } else if (g < 0.625) {
          charIndex = 4; // Plus
        } else if (g < 0.75) {
          charIndex = 5; // Asterisk
        } else if (g < 0.875) {
          charIndex = 6; // Hash
        } else {
          charIndex = 7; // At symbol
        }
        
        cha = getCharacter(charIndex, charPos.x, charPos.y);
        
        // Normalize color to maintain hue
        vec3 col = tex.rgb / max(tex.r, max(tex.g, tex.b));
        
        // Output final color
        gl_FragColor = vec4(cha * col, 1.0);
      }
    `,
        transparent: false,
    });

    // Create a plane to render the shader on
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), shaderMaterial);
    scene.add(plane);

    // Handle resize
    const handleResize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        shaderMaterial.uniforms.iResolution.value.set(
            window.innerWidth,
            window.innerHeight,
        );
    };

    window.addEventListener("resize", handleResize);

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
        requestAnimationFrame(animate);
        shaderMaterial.uniforms.iTime.value = clock.getElapsedTime();
        renderer.render(scene, camera);
    };

    // Start animation and video
    const start = async () => {
        try {
            await video.play();
            animate();
        } catch (error) {
            console.error("Error playing video:", error);
        }
    };

    // Cleanup function
    const destroy = () => {
        window.removeEventListener("resize", handleResize);
        video.pause();
        video.src = "";
        renderer.dispose();
        container.removeChild(renderer.domElement);
    };

    return {
        start,
        destroy,
        setZoom: (value: number) => {
            shaderMaterial.uniforms.zoom.value = value;
        },
    };
}
