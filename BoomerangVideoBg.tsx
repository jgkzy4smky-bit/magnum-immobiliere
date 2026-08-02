import { useEffect, useRef, useState } from 'react';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260715_090628_7052d8a6-a094-4341-a4a2-ad58493a67a9.mp4';

const CAPTURE_WIDTH = 960;
const FPS = 30;
const FRAME_INTERVAL = 1000 / FPS;

// requestVideoFrameCallback isn't in the default TS DOM lib yet.
type VideoWithRVFC = HTMLVideoElement & {
  requestVideoFrameCallback?: (callback: () => void) => number;
};

export default function BoomerangVideoBg() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLCanvasElement[]>([]);
  const lastCaptureTimeRef = useRef<number>(-1);
  const capturingRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);

  const [framesReady, setFramesReady] = useState(false);

  // Pass 1: play the source video once and capture every frame to an
  // offscreen canvas, downscaled to CAPTURE_WIDTH.
  useEffect(() => {
    const video = videoRef.current as VideoWithRVFC | null;
    if (!video) return;

    const captureFrame = () => {
      const vw = video.videoWidth;
      const vh = video.videoHeight;
      if (!vw || !vh) return;

      const t = video.currentTime;
      if (t === lastCaptureTimeRef.current) return;
      lastCaptureTimeRef.current = t;

      const scale = CAPTURE_WIDTH / vw;
      const cw = CAPTURE_WIDTH;
      const ch = Math.round(vh * scale);

      const frame = document.createElement('canvas');
      frame.width = cw;
      frame.height = ch;
      const fctx = frame.getContext('2d');
      if (!fctx) return;
      fctx.drawImage(video, 0, 0, cw, ch);
      framesRef.current.push(frame);
    };

    const rvfcLoop = () => {
      if (!capturingRef.current) return;
      captureFrame();
      video.requestVideoFrameCallback?.(rvfcLoop);
    };

    const rafLoop = () => {
      if (!capturingRef.current) return;
      captureFrame();
      rafIdRef.current = requestAnimationFrame(rafLoop);
    };

    const handlePlay = () => {
      capturingRef.current = true;
      if (video.requestVideoFrameCallback) {
        video.requestVideoFrameCallback(rvfcLoop);
      } else {
        rafLoop();
      }
    };

    const handleEnded = () => {
      capturingRef.current = false;
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      if (framesRef.current.length > 0) {
        setFramesReady(true);
      }
    };

    const handleLoadedData = () => {
      video.play().catch(() => {
        // Autoplay may be blocked until user interaction; the source
        // video stays visible (still muted/looping-free) in that case.
      });
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('play', handlePlay);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('ended', handleEnded);
      capturingRef.current = false;
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  // Pass 2: once frames are captured, ping-pong them on the display
  // canvas at a fixed 30fps, forward to the last frame then back to
  // the first, forever.
  useEffect(() => {
    if (!framesReady) return;
    const canvas = canvasRef.current;
    const frames = framesRef.current;
    if (!canvas || frames.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = frames[0].width;
    canvas.height = frames[0].height;

    let index = 0;
    let direction = 1;
    let lastTime = 0;
    let animId = 0;

    const draw = (time: number) => {
      if (time - lastTime >= FRAME_INTERVAL) {
        lastTime = time;
        const frame = frames[index];
        if (frame) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
        }
        index += direction;
        if (index >= frames.length - 1) {
          index = frames.length - 1;
          direction = -1;
        } else if (index <= 0) {
          index = 0;
          direction = 1;
        }
      }
      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animId);
  }, [framesReady]);

  return (
    <div className="absolute inset-0 z-0 scale-[1.15] origin-top overflow-hidden">
      <video
        ref={videoRef}
        src={VIDEO_URL}
        muted
        autoPlay
        playsInline
        preload="auto"
        crossOrigin="anonymous"
        className="w-full h-full object-cover object-top"
        style={{ display: framesReady ? 'none' : 'block' }}
      />
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover object-top"
        style={{ display: framesReady ? 'block' : 'none' }}
      />
    </div>
  );
}
