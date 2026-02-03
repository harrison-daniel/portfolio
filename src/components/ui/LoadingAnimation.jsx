import { useEffect, useRef } from 'react';

const LoadingAnimation = ({
  isVisible,
  message = 'Processing your request...',
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!isVisible || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    let time = 0;
    let lastTime = 0;
    let animationId;

    const gridSize = 4;
    const spacing = 12;
    const breathingSpeed = 0.6;
    const maxDistance = (spacing * Math.sqrt(2) * (gridSize - 1)) / 2;

    function animate(timestamp) {
      if (!lastTime) lastTime = timestamp;
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;
      time += deltaTime * 0.001;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const breathingFactor = Math.sin(time * breathingSpeed) * 0.3 + 1.0;

      ctx.beginPath();
      ctx.arc(centerX, centerY, 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(16, 185, 129, 0.9)';
      ctx.fill();

      for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
          const isCenter =
            row === Math.floor(gridSize / 2) &&
            col === Math.floor(gridSize / 2);
          if (isCenter) continue;

          const baseX = (col - (gridSize - 1) / 2) * spacing;
          const baseY = (row - (gridSize - 1) / 2) * spacing;

          const distance = Math.sqrt(baseX * baseX + baseY * baseY);
          const normalizedDistance = distance / maxDistance;
          const angle = Math.atan2(baseY, baseX);

          const radialPhase = (time - normalizedDistance) % 1;
          const radialWave = Math.sin(radialPhase * Math.PI * 2) * 3;

          const waveX =
            centerX +
            baseX * breathingFactor +
            Math.cos(angle) * radialWave;
          const waveY =
            centerY +
            baseY * breathingFactor +
            Math.sin(angle) * radialWave;

          const baseSize = 1.2 + (1 - normalizedDistance) * 1.2;
          const pulseFactor =
            Math.sin(time * 2.5 + normalizedDistance * 4) * 0.7 + 1;
          const size = baseSize * pulseFactor;

          const emeraldAmount =
            Math.sin(time + normalizedDistance * 3) * 0.4 + 0.6;
          const opacity =
            0.4 +
            Math.sin(time * 1.8 + angle * 2) * 0.3 +
            normalizedDistance * 0.3;

          ctx.beginPath();
          ctx.arc(waveX, waveY, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(16, 185, 129, ${opacity * emeraldAmount})`;
          ctx.fill();
        }
      }

      animationId = requestAnimationFrame(animate);
    }

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div className='absolute inset-0 bg-black/20 backdrop-blur-sm duration-300 animate-in fade-in' />

      <div className='relative mx-4 rounded-2xl border border-white/20 bg-white/90 p-8 shadow-2xl backdrop-blur-md duration-300 animate-in fade-in zoom-in-95'>
        <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-50/50 to-blue-50/30' />

        <div className='relative flex flex-col items-center space-y-6'>
          <div className='relative'>
            <canvas
              ref={canvasRef}
              width={120}
              height={120}
              className='relative'
            />
            <div className='absolute inset-0 scale-150 animate-pulse rounded-full bg-emerald-400/20 blur-xl' />
          </div>

          <div className='space-y-2 text-center'>
            <h3 className='text-xl font-semibold tracking-tight text-gray-800'>
              {message}
            </h3>
          </div>

          <div className='h-1 w-48 overflow-hidden rounded-full bg-gray-200'>
            <div className='h-full animate-pulse rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
