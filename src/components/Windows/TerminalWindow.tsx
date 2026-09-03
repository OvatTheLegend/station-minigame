"use client";

import { useState, useRef, useEffect} from "react";
import Window, { BaseWindowProps } from "@/components/Windows/Window";

type TerminalWindowProps = BaseWindowProps & {
  isRecorded?: boolean;
  onLaunchFirewall?: () => void;
};

export default function TerminalWindow({
  mode,
  onClose,
  onMinimize,
  onMaximize,
  isRecorded = false,
  onLaunchFirewall
}: TerminalWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [output, setOutput] = useState("");

  useEffect(() => {
    bottomRef.current?.scrollIntoView( {
      behavior: "smooth"
    });
  }, [output]);

  const [input, setInput] = useState("");
  const [terminalMessage] = useState(
    "SIGNAL//TERMINAL v3.4.1\nstation@signal-03 connected.\nType /help for station commands."
  );
  

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const raw = input.trim();
      const cmd = raw.toLowerCase();

      if (cmd === "/help" || cmd === "help") {
        setOutput(
          "station@signal-03> available commands:\n" +
          "  /status        - Station diagnostics & sensor health\n" +
          "  /scan          - Wideband frequency scan (88-108 MHz)\n" +
          "  /decode <KEY>  - Run decryptor cipher \n" +
          "  /clear         - Clear terminal output"
        );
      } else if (cmd === "/status" || cmd === "status") {
        setOutput(
          "station@signal-03> [SYSTEM DIAGNOSTICS]\n" +
          "  STATION: SIGNAL-03 (SECTOR 7 DEEP VALE)\n" +
          `  CARRIER INTERCEPT: ${isRecorded ? "1 CAPTURED (intercept-104.5.txt)" : "0 (IDLE)"}\n` +
          "  SECURITY LEVEL: 1 (RESTRICTED)\n" +
          "  ALL SENSORS NOMINAL."
        );
      } else if (cmd === "/scan" || cmd === "scan") {
        if (isRecorded) {
          setOutput(
            "station@signal-03> [SCAN COMPLETE]\n" +
            "  Carrier harmonic at 104.5 MHz already detected.\n" +
            "  Intercept transcript saved to Files as 'intercept-104.5.txt'."
          );
        } else {
          setOutput(
            "station@signal-03> [SCANNING FREQUENCY BANDS: 88.0 - 108.0 MHz...]\n" +
            "  [!] Anomaly detected near Sector 7\n" +
            "  [!] Harmonic carrier peak located at 104.5 MHz\n" +
            "  Recommendation: Tune Receiver window to 104.5 MHz to confirm source."
          );
        }
      } else if (cmd.startsWith("/decode")) {
        const parts = raw.split(" ");
        const key = parts[1]?.toUpperCase();

        if (!key) {
          setOutput(
            "station@signal-03> [CIPHER ERROR]: Missing decryption key.\n" +
            "  Usage: /decode <KEY>"
          );
        } else if (key === "SIG-774-ALPHA") {
          if (!isRecorded) {
            setOutput(
              "station@signal-03> [DECRYPT ERROR]: No active captured carrier data found.\n" +
              "  Extract the 104.5 MHz transmission in the Receiver app first."
            );
          } else {
            setTimeout(() => {
            setOutput((prev) => prev + "\n01001011 01000101 01011001 // BYPASSING HASH MATRIX...");
          }, 400);
          setTimeout(() => {
            setOutput((prev) => prev + "\n▒▓▒░░▓█ 7F 45 4C 46 02 01 01 00 [MEMORY UNPACK]");
          }, 900);
          setTimeout(() => {
            setOutput((prev) => prev + "\n0x8048000 ... 0x8048FFF [CHECKSUM: 100%]");
          }, 1400);
          setTimeout(() => {
            setOutput((prev) => prev + "\n0x8048000 ... 0x8048FFF [CHECKSUM: 100%]");
          }, 1400);
          setTimeout(() => {
            setOutput((prev) => prev + "\n\n==============================================\n\"STATION 03... OPERATOR LOGAN IS NO LONGER HERE.\"\n\"WHY HAVE YOU RESUMED TRANSMISSIONS?\"\n\"WE REMEMBER THIS STATION.\"\n==============================================\n\n[WARNING: EXTERNAL NETWORK ATTEMPTING HANDSHAKE]\n[FIREWALL BREACH DETECTED — TYPE '/hack' TO DEFEND NODE]");
          }, 2000);
          }
        } else {
          setOutput(
            `station@signal-03> [CIPHER FAILED]: Key "${parts[1]}" failed checksum verification.\n` +
            "  Check your intercepted files for the valid protocol key."
          );
        }
      } else if (cmd === "/hack" || cmd === "hack") {
        const hackAudio = new Audio("/sounds/hacking.mp3");
        hackAudio.volume = 0.25;
        hackAudio.play()

        const matrixStream = "01101000 01101001 01100011 01101011 00100000 01101111 01110110 01100101 01110010 01110010 01101001 01100100 01100101 01110010 01110010 01101001 01100100 01100101 01110010 01110010 01101001 01100100 01100101 01110010 01110010 01101001 01100100 01100101 01110010 01110010 01101001 01100100 01100101 01110010 01110010 01101001 01100100 01100101 01110010 01110010 01101001 01100100 01100101 01110010 01110010 01101001 01100100 01100101 01110010 01110010 01101001 01100100 01100101 01110010 01110010 01101001 01100100 01100101 01110010 01110010 01101001 01100100 01100101 01110010 01110010 01101001 01100100 01100101 01110010 01110010 01101001 01100100 01100101 0x7FFF5FBFF ... [BYPASSING PORT 8080] ... [DEFENSE GRID ACTIVATED] .... REDIRECTING...\n";

        setOutput("station@signal-03> [INITIATING COUNTERMEASURES...]\n");

        let i = 0;
        const timer = setInterval(() => {
          if (i < matrixStream.length){
            const char = matrixStream[i];
            setOutput((prev) => prev + char);
            i++;
          }
          else {
            clearInterval(timer);
            hackAudio.pause();
            setTimeout(() => {
              onLaunchFirewall?.();
            }, 500)
          }
        }, 2)

      } else if (cmd === "/clear" || cmd === "clear") {
        setOutput("");
      } else {
        setOutput(
          `station@signal-03> unknown command: "${input}". Type /help for available commands.`
        );
      }
      setInput("");
    }
  };

  return (
    <Window
      title={<span>TERMINAL</span>}
      mode={mode}
      onClose={onClose}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      bgClassName="bg-slate-950"
    >
      {/* MAIN TEXT AREA */}
      <div className="p-3 flex-1 flex flex-col justify-between font-mono text-green-400 whitespace-pre-line overflow-y-auto">
        <div className="whitespace-pre-line">
          {terminalMessage} <br />
          {output}
        </div>

        <div ref={bottomRef} />

        <div className="flex flex-row">
          <span className="mr-2">station@signal-03&gt;</span>

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-transparent text-green-400 outline-none flex-1"
            onKeyDown={handleKeyDown}
          />
        </div>

      </div>
    </Window>
  );
}