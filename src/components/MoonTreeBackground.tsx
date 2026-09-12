import React, { useEffect, useRef, useState } from 'react';
import moonPinkTreeImg from '../assets/images/moon_pink_tree_1789208751057.jpg';
import { Sparkles, Moon, Wind } from 'lucide-react';

interface Leaf {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  oscillationSpeed: number;
  oscillationDistance: number;
  angle: number;
  rotationSpeed: number;
  flipAngle: number;
  flipSpeed: number;
  color: string;
  glowColor: string;
  opacity: number;
  maxOpacity: number;
  life: number;
  maxLife: number;
  isLanded: boolean;
  landY: number;
}

interface Star {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  twinkleSpeed: number;
}

export const MoonTreeBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [particlesActive, setParticlesActive] = useState(true);
  const [windMode, setWindMode] = useState<'gentle' | 'breeze'>('gentle');
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !particlesActive) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Color palettes for glowing pink tree leaves
    const pinkPalettes = [
      { fill: '#ff499e', glow: 'rgba(255, 73, 158, 0.85)' },
      { fill: '#ff70a6', glow: 'rgba(255, 112, 166, 0.8)' },
      { fill: '#f43f5e', glow: 'rgba(244, 63, 94, 0.75)' },
      { fill: '#ff9ebb', glow: 'rgba(255, 158, 187, 0.85)' },
      { fill: '#fbcfe8', glow: 'rgba(251, 207, 232, 0.9)' },
      { fill: '#f472b6', glow: 'rgba(244, 114, 182, 0.85)' },
    ];

    // Starfield for deep space
    const stars: Star[] = [];
    const starCount = 65;
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * (height * 0.75),
        radius: Math.random() * 1.2 + 0.4,
        alpha: Math.random() * 0.8 + 0.2,
        twinkleSpeed: (Math.random() * 0.02 + 0.008) * (Math.random() > 0.5 ? 1 : -1)
      });
    }

    // Leaf generator
    const speedMultiplier = windMode === 'breeze' ? 1.4 : 1.0;

    const createLeaf = (initialSpawn = false): Leaf => {
      const palette = pinkPalettes[Math.floor(Math.random() * pinkPalettes.length)];
      // Moon surface starts roughly from 68% to 92% of screen height
      const moonSurfaceY = height * (0.70 + Math.random() * 0.22);

      return {
        x: Math.random() * width,
        y: initialSpawn ? Math.random() * (height * 0.8) : -20 - Math.random() * 60,
        size: Math.random() * 8 + 6,
        speedY: (Math.random() * 1.0 + 0.55) * speedMultiplier,
        speedX: ((Math.random() - 0.4) * 0.6) * speedMultiplier,
        oscillationSpeed: Math.random() * 0.025 + 0.015,
        oscillationDistance: (Math.random() * 2.0 + 1.0) * (windMode === 'breeze' ? 1.5 : 1),
        angle: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.04,
        flipAngle: Math.random() * Math.PI,
        flipSpeed: Math.random() * 0.03 + 0.02,
        color: palette.fill,
        glowColor: palette.glow,
        opacity: Math.random() * 0.4 + 0.6,
        maxOpacity: Math.random() * 0.3 + 0.7,
        life: 0,
        maxLife: Math.random() * 450 + 400,
        isLanded: false,
        landY: moonSurfaceY
      };
    };

    const leaves: Leaf[] = [];
    const leafCount = windMode === 'breeze' ? 68 : 50;
    for (let i = 0; i < leafCount; i++) {
      leaves.push(createLeaf(true));
    }

    // Interactive mouse wind effect
    let mouseX = width / 2;
    let mouseY = height / 2;
    let mouseInfluence = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      mouseInfluence = 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Draw realistic petal/leaf path
    const drawPetal = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      angle: number,
      flipAngle: number,
      color: string,
      glowColor: string,
      opacity: number
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate(angle);
      
      // Simulate 3D tumbling by scaling Y axis with cosine
      const scaleY = Math.cos(flipAngle);
      context.scale(1, scaleY);

      // Glow effect
      context.shadowColor = glowColor;
      context.shadowBlur = 12;
      context.globalAlpha = opacity;

      // Realistic leaf / cherry blossom petal geometry
      context.beginPath();
      context.moveTo(0, -size);
      context.bezierCurveTo(size * 0.75, -size * 0.6, size * 0.75, size * 0.6, 0, size);
      context.bezierCurveTo(-size * 0.75, size * 0.6, -size * 0.75, -size * 0.6, 0, -size);
      context.closePath();

      // Subtle gradient fill
      const grad = context.createRadialGradient(0, 0, 1, 0, 0, size);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.35, color);
      grad.addColorStop(1, glowColor);

      context.fillStyle = grad;
      context.fill();

      // Delicate central leaf vein
      context.beginPath();
      context.moveTo(0, -size * 0.85);
      context.lineTo(0, size * 0.85);
      context.strokeStyle = 'rgba(255, 255, 255, 0.45)';
      context.lineWidth = 0.8;
      context.stroke();

      context.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render Twinkling Stars in space
      for (const star of stars) {
        star.alpha += star.twinkleSpeed;
        if (star.alpha > 0.95 || star.alpha < 0.2) {
          star.twinkleSpeed = -star.twinkleSpeed;
        }
        ctx.save();
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 245, 250, ${Math.max(0.1, star.alpha)})`;
        ctx.shadowColor = 'rgba(255, 215, 240, 0.8)';
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.restore();
      }

      // Wind decay
      mouseInfluence *= 0.96;

      // Render falling pink leaves
      for (let i = 0; i < leaves.length; i++) {
        const leaf = leaves[i];
        leaf.life++;

        if (!leaf.isLanded) {
          // Downward gravity drift
          leaf.y += leaf.speedY;

          // Sinusoidal wind swaying
          leaf.angle += leaf.rotationSpeed;
          leaf.flipAngle += leaf.flipSpeed;
          leaf.x += Math.sin(leaf.life * leaf.oscillationSpeed) * leaf.oscillationDistance + leaf.speedX;

          // Mouse wind interaction
          const dx = leaf.x - mouseX;
          const dy = leaf.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180 && dist > 0) {
            const force = (1 - dist / 180) * 1.5 * mouseInfluence;
            leaf.x += (dx / dist) * force;
            leaf.y += (dy / dist) * force * 0.5;
            leaf.rotationSpeed += (dx > 0 ? 0.01 : -0.01);
          }

          // Check if leaf has reached the surface of the moon!
          if (leaf.y >= leaf.landY) {
            leaf.isLanded = true;
            leaf.speedY = 0;
            leaf.speedX = 0;
          }
        } else {
          // Slowly settle and fade on the moon's surface
          leaf.opacity -= 0.003;
          // Very gentle surface jitter / wind roll
          leaf.x += Math.sin(leaf.life * 0.01) * 0.1;
        }

        // Reset if finished life or faded out or offscreen
        if (leaf.y > height + 30 || leaf.opacity <= 0.05 || leaf.life > leaf.maxLife) {
          leaves[i] = createLeaf(false);
        }

        // Draw the leaf
        drawPetal(
          ctx,
          leaf.x,
          leaf.y,
          leaf.size,
          leaf.angle,
          leaf.flipAngle,
          leaf.color,
          leaf.glowColor,
          leaf.opacity
        );
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [particlesActive, windMode]);

  return (
    <>
      <div 
        aria-hidden="true" 
        className="fixed inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden select-none"
      >
        {/* 1. Realistic Moon with Glowing Pink Tree Photographic Artwork */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={moonPinkTreeImg}
            alt="Realistic Moon and Glowing Pink Tree in Deep Cosmic Atmosphere"
            className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.08] transform scale-[1.02] transition-transform duration-1000"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* 2. Ethereal Neon Pink Glow Pulsing Aura from Tree Foliage */}
        <div 
          className="absolute top-[28%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-pink-500/15 blur-[140px] pointer-events-none animate-pulse" 
          style={{ animationDuration: '6s' }} 
        />
        <div className="absolute top-[35%] left-[52%] -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-rose-400/20 blur-[100px] pointer-events-none" />

        {/* 3. Celestial Moonlight Vignette & Radial Light Diffusion */}
        <div className="absolute inset-0 bg-radial-[ellipse_at_center] from-transparent via-[#06070b]/35 to-[#06070b]/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#08090d]/60 via-transparent to-[#08090d]/75" />

        {/* 4. Canvas for Animated Glowing Pink Leaves Falling on Moon Surface */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ opacity: particlesActive ? 1 : 0, transition: 'opacity 0.5s ease' }}
        />

        {/* 5. Moon Horizon Dust & Light Rim */}
        <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-[#08090d] via-[#08090d]/50 to-transparent pointer-events-none" />
      </div>

      {/* Floating Lunar & Petal Ambience Pill in bottom-left corner */}
      <div className="fixed bottom-6 left-6 z-30 flex items-center gap-2">
        <div className="bg-[#12141c]/90 backdrop-blur-md border border-pink-500/30 rounded-2xl p-1.5 shadow-2xl shadow-black/80 flex items-center gap-2 text-xs">
          <button
            onClick={() => setShowControls(!showControls)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-pink-500/15 hover:bg-pink-500/25 border border-pink-400/30 text-pink-200 transition-all cursor-pointer font-medium"
            title="Lunar Ambience Settings"
          >
            <Moon className="w-3.5 h-3.5 text-pink-300 animate-pulse" />
            <span className="hidden sm:inline">Moon & Pink Tree</span>
            <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-ping" />
          </button>

          {showControls && (
            <div className="flex items-center gap-1.5 pr-1">
              <button
                onClick={() => setParticlesActive(!particlesActive)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer border ${
                  particlesActive 
                    ? 'bg-pink-600/30 text-pink-200 border-pink-500/40' 
                    : 'bg-white/5 text-stone-400 border-white/10 hover:text-white'
                }`}
              >
                {particlesActive ? 'Falling Leaves On' : 'Leaves Paused'}
              </button>
              
              <button
                onClick={() => setWindMode(windMode === 'gentle' ? 'breeze' : 'gentle')}
                className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white/5 hover:bg-white/10 text-stone-300 border border-white/10 transition-colors cursor-pointer flex items-center gap-1"
              >
                <Wind className="w-3 h-3 text-pink-300" />
                <span>{windMode === 'gentle' ? 'Gentle' : 'Breeze'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
