"use client";

import Window, { BaseWindowProps } from "@/components/Windows/Window";
import { useEffect, useRef, useState } from "react";

/* type ReceiverWindowProps = BaseWindowProps & {
  frequency: string;
  onFrequencyChange: (newFrequency: string) => void;
} */
type RecieverWindowProps = BaseWindowProps & {
  frequency: number;
  onFrequencyChange: (newContent : number) => void;
  isRecorded: boolean;
  onExtractSignal: () => void;
}

export default function ReceiverWindow({
  mode,
  onClose,
  onMinimize,
  onMaximize,
  frequency,
  onFrequencyChange,
  isRecorded,
  onExtractSignal,
}: RecieverWindowProps) {

  const targetFrequency = 104.5
  const diff = Math.abs(frequency - targetFrequency)

  const signalStrength = diff > 1.0 ? 0 : Math.round((1 - diff / 1.0) * 100)
  const isLocked = diff < 0.05;

  const equalizerPattern = [10,20,40,70,30, 60, 45, 80, 65, 75, 90, 95, 100, 95, 78, 65, 70, 50, 85, 40,80,90,60,40,20,10];

  const [isListening, setIsListening] = useState(false);

  const staticRef = useRef<HTMLAudioElement | null>(null);
  const droneRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // 1. If listening is turned OFF, stop both sounds
    if (!isListening) {
      staticRef.current?.pause();
      staticRef.current = null;
      droneRef.current?.pause();
      droneRef.current = null;
      return;
    }

    // 2. Handle the Radio Static Track (Always plays when listening)
    if (!staticRef.current) {
      const staticAudio = new Audio("/sounds/radio_static.mp3");
      staticAudio.loop = true;
      staticAudio.play().catch(() => {});
      staticRef.current = staticAudio;
    }
    // When locked: low volume (0.06), when searching: normal volume (0.25)
    staticRef.current.volume = isLocked ? 0.05 : 0.25;

    // 3. Handle the Mystery Drone Track (Only plays when locked!)
    if (isLocked) {
      if (!droneRef.current) {
        const droneAudio = new Audio("/sounds/pulsing_drone.mp3");
        droneAudio.loop = true;
        droneAudio.volume = 0.35;
        droneAudio.play().catch(() => {});
        droneRef.current = droneAudio;
      }
    } else {
      // If we move away from 104.5 MHz, pause the drone
      droneRef.current?.pause();
      droneRef.current = null;
    }

    // 4. Cleanup on window close
    return () => {
      staticRef.current?.pause();
      staticRef.current = null;
      droneRef.current?.pause();
      droneRef.current = null;
    };
  }, [isListening, isLocked]);

  return (
    <Window
      title={<span>RECEIVER</span>}
      mode={mode}
      onClose={onClose}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      bgClassName="bg-slate-900"
    >
      {/* MAIN AREA */}
      <div className="p-3 flex-1 flex flex-col gap-1 font-mono text-white whitespace-pre-line overflow-y-auto overflow-">
        {/* FREQUENCY TUNER */}
        <div className="border border-slate-700/60 flex-1 rounded-md 
          p-3 bg-slate-950/40 flex flex-col gap-2">
          <span className="text-xs text-slate-400 uppercase tracking-wider">
            FREQUENCY TUNER
          </span>
          
          {/* FREQUENCY */}
          <div className="flex flex-row items-baseline justify-center gap-2 py-1">
            <span className="text-3xl font-bold text-cyan-400 tracking-widest">
              {frequency.toFixed(1)}
            </span>
            <span className="text-sm font-semibold text-cyan-600 uppercase">
              MHz
            </span>
          </div>

          {/* BUTTONS + SLIDER */}
          <div className="flex flex-row items-center justify-between gap-2 px-2">

            <button
              onClick={() => onFrequencyChange(Math.max(88, Number((frequency - 1).toFixed(1))))}
              className="px-2 py-1 bg-slate-800/80 hover:bg-slate-700 
                border border-slate-700 hover:border-cyan-500/40
                rounded text-xs text-slate-300 hover:text-cyan-300 select-none transtion-colors cursor-pointer"
            >
              [-1.0]
            </button>

            <button
              onClick={() => onFrequencyChange(Math.max(88, Number((frequency - 0.1).toFixed(1))))}
              className="px-2 py-1 bg-slate-800/80 hover:bg-slate-700 
                border border-slate-700 hover:border-cyan-500/40
                rounded text-xs text-slate-300 hover:text-cyan-300 select-none transtion-colors cursor-pointer"
            >
              [-0.1]
            </button>

            <input
              type="range"
              min="88.0"
              max="108.0"
              step="0.01"
              value={frequency}
              onChange={(e) => onFrequencyChange(parseFloat(e.target.value))}
              className="flex-1 mx-2 cursor-pointer accent-cyan-400 h-1 bg-slate-700 rounded-lg appearance-none select-none"
            />

            <button
              onClick={() => onFrequencyChange(Math.min(108, Number((frequency + 0.1).toFixed(1))))}
              className="px-2 py-1 bg-slate-800/80 hover:bg-slate-700 
                border border-slate-700 hover:border-cyan-500/40
                rounded text-xs text-slate-300 hover:text-cyan-300 select-none transtion-colors cursor-pointer"
            >
              [+0.1]
            </button>

            <button
              onClick={() => onFrequencyChange(Math.min(108, Number((frequency + 1).toFixed(1))))}
              className="px-2 py-1 bg-slate-800/80 hover:bg-slate-700 
                border border-slate-700 hover:border-cyan-500/40
                rounded text-xs text-slate-300 hover:text-cyan-300 select-none transtion-colors cursor-pointer"
            >
              [+1.0]
            </button>

          </div>
        </div>

        {/* SIGNAL MOTOR */}
        <div className="border flex-1 border-slate-700/60 rounded-md 
          p-3 bg-slate-950/40 flex flex-col gap-2">
          
          <div className="flex justify-between items-center text-xs">
            <span className="text-xs text-slate-400 uppercase tracking-wider">
              SIGNAL MOTOR
            </span>

            <span className={isLocked
              ? "text-green-400 font-bold"
              : "text-slate-400"
            }>
              STRENGTH: {signalStrength}%
            </span>
          </div>
          
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-200
              ${isLocked
                ? "bg-green-400"
                : signalStrength > 0
                  ? "bg-cyan-400"
                  : "bg-slate-600"
              }`}
              style={{ width: `${signalStrength}%`}}>
            </div>
          </div>

          <div className="flex items-end justify-center h-16 gap-1.5 overflow-hidden
            bg-black/60 border border-slate-800 rounded-md select-none">
              {equalizerPattern.map((height, i) =>
                (
                  <div
                    key={i}
                    className={`w-5 rounded-t transition-all duration-200 
                      ${isLocked 
                      ? "bg-green-400 animate-pulse"
                      : signalStrength > 0
                        ? "bg-cyan-400/80 animate-pulse"
                        : "bg-slate-700/60"
                      }`}
                    style={{
                      height: isLocked
                      ? `${height}%`
                      : signalStrength > 0 
                        ? `${height * 0.35}%`
                        : "8%",
                    }}
                    />
                )
              )}

          </div>

          <div className="bg-transparent flex flex-row items-center justify-baseline gap-2">
            
            <span className="relative flex h-3.5 w-3.5 items-center justify-center select-none"
            >
              {isLocked && (
                <span className="animate-ping inset-0 absolute h-full w-full rounded-full bg-green-400 opacity-75"/>
              )}
                <span className={`h-3 w-3 rounded-full ${isLocked
                  ? "bg-green-400"
                  : signalStrength > 0 
                    ? "bg-cyan-400"
                    : "bg-slate-600"
                }`}>

                </span>
            </span>
            
            <span
              className={isLocked
                ? "text-green-400 font-bold"
                : signalStrength > 0 
                  ? "text-cyan-400"
                  : "text-slate-500"
              }>
              {isLocked
              ? "CARRIER LOCK: UNIDENTIFIED SIGNAL ACTIVE"
              : signalStrength > 0
                ? "SEARCHING: WEAK INTERFERENCE"
                : "STATUS: SCANING / NOISE"}
            </span>

          </div>

          
        </div>

        {/* AUDIO/DATA */}
        <div className="border border-slate-700/60  flex-1 rounded-md 
          p-3 bg-slate-950/40 flex flex-col gap-2">
          <span className="text-xs text-slate-400 uppercase tracking-wider">
            AUDIO/DATA STREAM
          </span>

          <div className="flex flex-row justify-between px-5 py-2">
            <button
              className="bg-slate-800/80 hover:bg-slate-700 
                border border-slate-700 hover:border-cyan-500/40
                  text-xs text-slate-300 hover:text-cyan-300 select-none transtion-colors cursor-pointer px-2 py-2 rounded-md"
              onClick={() => setIsListening(!isListening)}
            >
              {isListening
              ? "❚❚ STOP STREAM"
              : "▷ LISTEN STREAM"} 
            </button>

            <button
              className={`bg-slate-800/80 hover:bg-slate-700 
                border border-slate-700
                text-xs select-none transtion-colors px-2 py-2 rounded-md cursor-not-allowed
                ${isRecorded
                ? "text-green-400 cursor-pointer"
                : isLocked && isListening
                  ? "text-red-400 hover:border-red-500/40 cursor-pointer animate-pulse"
                  : "text-slate-500 cursor-not-allowed"
                }`}
              onClick={() => {
                if (isLocked && isListening && !isRecorded){
                  const chime = new Audio("/sounds/chime.mp3")
                  chime.volume = 0.5;
                  chime.play()
                  onExtractSignal();
                }
              }}
            >
              {isRecorded
              ? "✓ EXTRACTED TO FILES"
              : "● RECORD & EXTRACT"
              }
            </button>
          </div>

          
          <div className="flex-1 bg-black/60 border border-slate-800 rounded p-2 text-xs font-mono overflow-y-auto flex flex-col justify-center whitespace-pre-line">
            {!isListening
              ? "[AUDIO FEED MUTED — CLICK 'LISTEN STREAM' TO CONNECT]"
              : isListening && !isLocked
              ? "[AUDIO CONNECTED: STATIC NOISE]\n········································"
              : "[CARRIER 104.5 MHz DETECTED]\nPAYLOAD: 01010011 01001111 01010011 // SIG-RECV\nDECODED: \"...STATION 03... CAN ANYONE HEAR THIS?...\""}
          </div>
        </div>

      </div>
    </Window>
  );
}