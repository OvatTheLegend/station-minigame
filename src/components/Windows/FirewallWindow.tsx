"use client"

import { useEffect, useState } from "react"

type FirewallWindowProps = {
    onSuccess: () => void;
}
export default function FirewallWindow({
    onSuccess,
}: FirewallWindowProps) {

    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve,ms));

    async function startRound() {
        setIsFlashing(true);
        setPlayerIndex(0)

        const newSeq = Array.from({ length: 5 }, () => Math.floor(Math.random() * 9));
        setSequence(newSeq);

        for (let i = 3; i >= 1; i--){
            setCountdown(i);
            await sleep(1000);
        }
        
        setCountdown(null);
        await sleep(300)

        for (const node of newSeq){
            setActiveNode(node);
            await sleep(500);
            setActiveNode(null);
            await sleep(200);
        }

        setIsFlashing(false);
    }

    const [stage, setStage] = useState< "intro" | "briefing" | "game" | "won" | "failed">("intro")

    const [nodeColor, setNodeColor] = useState<"cyan" | "red">("cyan");
    const [countdown, setCountdown] = useState<number | null>(null);
    const [sequence, setSequence] = useState<number[]>([]);
    const [activeNode, setActiveNode] = useState<number | null>(null);
    const [playerIndex, setPlayerIndex] = useState(0);
    const [isFlashing, setIsFlashing] = useState(false);
    const [attempts, setAttempts] = useState(3);

    useEffect(() => {
        if (stage === "game"){
            startRound();
        }
    }, [stage])

    const handleNodeClick = (clickedIndex: number) => {
        if (isFlashing) {
            return;
        }
        
        setActiveNode(clickedIndex);
        setTimeout(() => setActiveNode(null), 150);

        if (clickedIndex === sequence[playerIndex]) {
            if (playerIndex === sequence.length - 1) {
                setTimeout(() => {
                    setStage("won");
                }, 300);
            } else {
                setPlayerIndex((prev) => prev + 1);
            }
        } else {

            setIsFlashing(true)

            setNodeColor("red");
            setActiveNode(clickedIndex)

            const remaining = attempts - 1;
            setAttempts(remaining);
            
            
            setTimeout(() => {
                setActiveNode(null);
                setNodeColor("cyan"); // Reset back to cyan
                if (remaining <= 0) {
                setStage("failed");
                } else {
                startRound();
                }
            }, 1000);
        }
    };

    return (
        <div className="absolute inset-0 bg-black z-50 flex flex-col items-center 
            justify-center font-mono p-6 select-none" 
        >
            {stage === "intro" && (
                <div className="flex flex-col items-center gap-4 text-center max-w-md">
                    <div className="text-red-500 text-6xl animate-pulse"
                    >
                      ⚠
                    </div>
                    <div className="text-xl font-bold tracking-widest text-red-500 animate-pulse">
                        CRITICAL FIREWALL BREACH
                    </div>
                    <div className="text-xs text-slate-400"
                    >
                        Hostile entity attempting to hijack station storage. Defense protocol required.
                    </div>

                    <button className="px-6 py-3 bg-red-950/80 hover:bg-red-900
                        border-2 border-red-500 text-red-300 hover:text-white
                        rounded-md font-bold tracking-widest text-sm uppercase
                        shadow-[0_0_15px_rgba(239,68,68,0.3)] hover:shadow-[0_0_25px_rgba(239,68,68,0.6)]
                        transition-all select-none cursor-pointer"
                        onClick={() => setStage("briefing")}
                    >
                        INITIALIZE DEFENSE PROTOCOL
                        
                    </button>
                </div>
            )}

            {stage === "briefing" && (
                <div className="flex flex-col items-center gap-6 max-w-lg text-center animate-fade-in">
                    <div className="flex flex-col gap-1">
                        <span className="text-xs text-cyan-600 uppercase tracking-widest">
                            Defensive Countermeasure
                        </span>

                        <h2 className="text-2xl font-bold text-white tracking-wider">
                            FIREWALL NODE CALIBRATION
                        </h2>
                    </div>

                    <div className="border border-slate-700/80 bg-slate-900/60 rounded-lg p-5 text-left text-xs font-mono text-slate-300 flex flex-col gap-3 shadow-lg">
                        <div className="text-cyan-400 font-bold tracking-wider">
                            [ SYSTEM PROTOCOL INSTRUCTIONS ]
                        </div>
                        <p>1. The defense matrix will flash a <span className="text-cyan-400 font-bold">5-node sequence</span> across the grid.</p>
                        <p>2. Memorize the pattern and <span className="text-cyan-400 font-bold">click the nodes in the exact order</span>.</p>
                        <p>3. You have <span className="text-red-400 font-bold">3 attempts</span> before permanent station lockout.</p>
                    </div>

                    <button
                        onClick={() => setStage("game")}
                        className="px-6 py-3 bg-cyan-950/80 hover:bg-cyan-900 border-2 border-cyan-500 text-cyan-300 hover:text-white rounded-md font-bold tracking-widest text-sm uppercase shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] transition-all cursor-pointer select-none"
                        >
                        [ INITIATE NODE GRID ]
                        </button>
                </div>
            )}

            {stage === "game" && (
                <div className="flex flex-col items-center gap-6 max-w-md w-full animate-fade-in">
                    
                    {/* STATUS BAR & NUMBER OF ATTEMPTS */}
                    <div className="flex justify-between w-full">
                        <span className="text-red-400 font-bold">
                            ATTEMPTS: {attempts}/3
                        </span>

                        <span className="text-cyan-400">
                            STATUS: {isFlashing
                                ? (countdown !== null 
                                    ? "CALIBRATING..."
                                    : "MEMORIZE PATTERN"
                                )
                                : "YOUR TURN"
                            }
                        </span>
                    </div>

                    <div className="relative">
                        {/* 3x3 grid (w-72 h-72) */}
                        <div className="grid grid-cols-3 w-100 h-100 gap-3">
                            {Array.from({ length: 9 }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleNodeClick(index)}
                                    className={`rounded-lg flex flex-col items-center justify-center text-xs font-mono transition-all select-none cursor-pointer ${
                                        activeNode === index
                                            ? nodeColor === "red"
                                                ? "bg-red-500 border-2 border-red-400 text-white font-bold shadow-[0_0_25px_rgba(239,68,68,0.9)] scale-105"
                                                : "bg-cyan-400 border-2 border-cyan-300 text-black font-bold shadow-[0_0_25px_rgba(6,182,212,0.9)] scale-105"
                                            : "bg-transparent border border-slate-900"
                                    }`}
                                >
                                </button>
                            ))}
                        </div>

                        {countdown !== null && (
                            <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center rounded-lg z-10 pointer-events-none">
                                <span className="text-7xl font-bold text-cyan-400 animate-pulse font-mono">
                                    {countdown}
                                </span>
                                <span className="text-xs text-slate-400 mt-2 uppercase tracking-widest">
                                    STANDBY FOR PATTERN
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {stage === "won" && (
                <div className="flex flex-col items-center gap-6 text-center max-w-md animate-fade-in">
                    <div className="text-6xl text-green-400 font-bold animate-pulse">
                        ✓
                    </div>
                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl font-bold text-green-400 tracking-widest">
                            FIREWALL RESTORED
                        </h2>
                        <p className="text-xs text-slate-400">
                            Hostile handshake isolated and purged. Storage nodes recalibrated successfully.
                        </p>
                    </div>
                    <button
                        onClick={onSuccess}
                        className="px-6 py-3 bg-green-950/80 hover:bg-green-900 border-2 border-green-500 text-green-300 hover:text-white rounded-md font-bold tracking-widest text-sm uppercase shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.6)] transition-all cursor-pointer select-none"
                    >
                        [ RETURN TO STATION DESKTOP ]
                    </button>
                </div>
            )}

            {stage === "failed" && (
                <div className="flex flex-col items-center gap-6 text-center max-w-md animate-fade-in">
                    <div className="text-6xl text-red-500 font-bold animate-pulse">
                        ✕
                    </div>
                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl font-bold text-red-500 tracking-widest">
                            SYSTEM OVERRIDE FAILED
                        </h2>
                        <p className="text-xs text-slate-400">
                            Maximum security attempts exceeded. Node lockout triggered.
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            setAttempts(3);
                            setStage("game");
                            startRound();
                        }}
                        className="px-6 py-3 bg-red-950/80 hover:bg-red-900 border-2 border-red-500 text-red-300 hover:text-white rounded-md font-bold tracking-widest text-sm uppercase shadow-[0_0_15px_rgba(239,68,68,0.3)] hover:shadow-[0_0_25px_rgba(239,68,68,0.6)] transition-all cursor-pointer select-none"
                    >
                        [ REBOOT DEFENSE SYSTEM ]
                    </button>
                </div>
            )}
        </div>
    )
}