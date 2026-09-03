"use client"

import DekstopIcon from '@/components/DekstopIcons/DekstopIcon';
import TaskbarItem from '@/components/DekstopIcons/TaskBarItem';
import BottomBar from '@/components/Layout/BottomBar';
import TopBar from '@/components/Layout/TopBar';
import FilesWindow from '@/components/Windows/FilesWindow';
import FirewallWindow from '@/components/Windows/FirewallWindow';
import NotesWindow from '@/components/Windows/NotesWindow';
import ReceiverWindow from '@/components/Windows/ReceiverWindow';
import TerminalWindow from '@/components/Windows/TerminalWindow';
import { useStationTime } from '@/hooks/useStationTime';
import { useState, useEffect} from 'react';
    
export type FileItem = {
        id: string;
        name: string;
        content: string;
        };

export default function GameWindow() {
    
    /* TIME */
    const time = useStationTime();
    /* FILES */
    const [filesOpen, setFilesOpen] = useState(false);
    const [filesWindowMode, setFilesWindowMode] = useState<"normal" | "maximized">("normal");
    const [filesMinimized, setFilesMinimized] = useState(false);
    const [files, setFiles] = useState<FileItem[]>([
        {
          id: "1",
          name: "station-overview.txt",
          content: "STATION 03 // RESEARCH MONITORING OS\nSECTOR: 07-DEEP VALE\nSTATUS: OPERATIONAL\n\nDUTIES:\n1. Maintain frequency band surveillance (88.0 - 108.0 MHz).\n2. Log atmospheric and carrier fluctuations.\n3. Report anomalies to Central Archive.\n\nNOTICE: Do not attempt two-way communication without authorization.",
        },
        {
          id: "2",
          name: "operator-notes.txt",
          content: "LOG 42 — OPERATOR LOGAN\n\"Static interference on 104.5 MHz is repeating in 12-second pulses. It's not celestial noise. Something is pulsing back whenever we calibrate the antenna.\"\n\nLOG 43 — OPERATOR LOGAN\n\"Central ordered me to cease all logging on 104.5 MHz. I left the cipher protocol key in the intercept logs. If you are reading this, don't ignore the carrier wave.\"",
        },
        {
          id: "3",
          name: "transmission-unknown.sig",
          content: "[RAW SIGNAL ENCRYPTED STREAM]\n01001000 01100101 01101100 01110000 00100000 01101101 01100101\n[CHECKSUM: ???]\n[STATUS: CIPHER KEY REQUIRED TO DECODE]",
        },
    ]);

    /* TERMINAL */
    const [terminalOpen, setTerminalOpen] = useState(false);
    const [terminalWindowMode, setTerminalWindowMode] = useState<"normal" | "maximized">("normal");
    const [terminalMinimized, setTerminalMinimized] = useState(false);
    
    /* RECEIVER */
    const [receiverOpen, setReceiverOpen] = useState(false);
    const [receiverWindowMode, setReceiverWindowMode] = useState<"normal" | "maximized">("normal");
    const [receiverMinimized, setReceiverMinimized] = useState(false);
    const [receiverFrequency, setReceiverFrequency] = useState(98.0)
    const [isSignalRecorded, setIsSignalRecorded] = useState(false);

    const handleExtractSignal = () => {
        if (isSignalRecorded) return;

        setIsSignalRecorded(true);

        const newFile : FileItem = {
            id: "4",
            name: "intercept-104.5.txt",
            content: "RECORDED TRANSMISSION INTERCEPT\nFREQUENCY: 104.5 MHz\nSTATUS: ENCRYPTED CARRIER CAPTURED\n\nDECODED HEADER:\nCIPHER PROTOCOL: SIG-774-ALPHA\n\nSYSTEM NOTE:\nTo decrypt this payload in Terminal, execute:\n/decode SIG-774-ALPHA"
        }
        setFiles((prev) => [...prev, newFile]);
    }
    /* NOTES */
    const [notesOpen, setNotesOpen] = useState(false);
    const [notesWindowMode, setNotesWindowMode] = useState<"normal" | "maximized">("normal");
    const [notesMinimized, setNotesMinimized] = useState(false);
    const [notesContent, setNotesContent] = useState("");
    
    const [firewallOpen, setFirewallOpen] = useState(false);
    const [selectedApp, setSelectedApp] = useState<string | null>(null);

    useEffect(() => {
        const bgAudio = new Audio("/sounds/computer_lab.mp3")
        bgAudio.loop = true;
        bgAudio.volume = 0.30;

        const startAudio = () => {
            bgAudio.play().catch(() => {});
            window.removeEventListener("click", startAudio);
        }

        window.addEventListener("click", startAudio)

        return () => {
            bgAudio.pause();
            window.removeEventListener("click", startAudio)
        }
    }, [])
    return (
        <main className="h-screen w-full flex flex-col bg-gray-800
            text-white">

            {/* TOPBAR */}
            <TopBar/>
            
            <div className="relative flex-1 flex flex-col overflow-hidden">

                {/* MAIN SCREEN AREA */}
                <div className="relative flex-1 overflow-hidden">
                    {filesOpen && !filesMinimized && <FilesWindow 
                        mode={filesWindowMode}
                        onClose={() => setFilesOpen(false)}
                        onMinimize={() => setFilesMinimized(true)}
                        onMaximize={() => setFilesWindowMode((current) => current === "maximized" ? "normal" : "maximized")}
                        files={files}
                        setFiles={setFiles}
                    />}

                    {terminalOpen && !terminalMinimized && <TerminalWindow 
                        mode={terminalWindowMode}
                        onClose={() => setTerminalOpen(false)}
                        onMinimize={() => setTerminalMinimized(true)}
                        onMaximize={() => setTerminalWindowMode((current) => current === "maximized" ? "normal" : "maximized")}
                        isRecorded={isSignalRecorded}
                        onLaunchFirewall={() => setFirewallOpen(true)}
                    />}

                    {receiverOpen && !receiverMinimized && <ReceiverWindow 
                        mode={receiverWindowMode}
                        onClose={() => setReceiverOpen(false)}
                        onMinimize={() => setReceiverMinimized(true)}
                        onMaximize={() => setReceiverWindowMode((current) => current === "maximized" ? "normal" : "maximized")}
                        frequency={receiverFrequency}
                        onFrequencyChange={setReceiverFrequency}
                        isRecorded={isSignalRecorded}
                        onExtractSignal={handleExtractSignal}
                    />}

                    {notesOpen && !notesMinimized && <NotesWindow 
                        mode={notesWindowMode}
                        onClose={() => setNotesOpen(false)}
                        onMinimize={() => setNotesMinimized(true)}
                        onMaximize={() => setNotesWindowMode((current) => current === "maximized" ? "normal" : "maximized")}
                        content={notesContent}
                        onContentChange={setNotesContent}
                    />}

                    
                    <div className="absolute inset-0 pointer-events-none 
                        select-none flex items-center justify-center z-0 text-3xl
                        font-medium uppercase tracking-wider text-slate-400">
                        RESEARCH STATION <br /> CONTROL DESKTOP
                    </div>

                    {/* FILES */}
                    <div className="mx-5 relative z-2 flex flex-col my-5 
                        gap-4 overflow-hidden w-24">
                        
                        <DekstopIcon
                            label="Files"
                            icon="◈"
                            isSelected={selectedApp === "files"}
                            onSelect={() => setSelectedApp("files")}
                            onOpen={() => {
                                if (!filesOpen) {
                                    setFilesOpen(true);
                                    setFilesMinimized(false);
                                }
                                else if (filesMinimized){
                                    setFilesMinimized(false);
                                }
                                else {
                                    setFilesMinimized(true);
                                }
                                setSelectedApp(null)
                            }}
                        />

                        <DekstopIcon
                            label="Terminal"
                            icon=">_"
                            isSelected={selectedApp === "terminal"}
                            onSelect={() => setSelectedApp("terminal")}
                            onOpen={() => {
                                if (!terminalOpen) {
                                    setTerminalOpen(true);
                                    setTerminalMinimized(false);
                                }
                                else if (terminalMinimized){
                                    setTerminalMinimized(false);
                                }
                                else {
                                    setTerminalMinimized(true);
                                }
                                setSelectedApp(null)
                            }}
                        />

                        <DekstopIcon
                            label="Receiver"
                            icon="◇"
                            isSelected={selectedApp === "receiver"}
                            onSelect={() => setSelectedApp("receiver")}
                            onOpen={() => {
                                if (!receiverOpen) {
                                    setReceiverOpen(true);
                                    setReceiverMinimized(false);
                                }
                                else if (receiverMinimized){
                                    setReceiverMinimized(false);
                                }
                                else {
                                    setReceiverMinimized(true);
                                }
                                setSelectedApp(null)
                            }}
                        />

                        <DekstopIcon
                            label="Notes"
                            icon="▤"
                            isSelected={selectedApp === "notes"}
                            onSelect={() => setSelectedApp("notes")}
                            onOpen={() => {
                                if (!notesOpen) {
                                    setNotesOpen(true);
                                    setNotesMinimized(false);
                                }
                                else if (notesMinimized){
                                    setNotesMinimized(false);
                                }
                                else {
                                    setNotesMinimized(true);
                                }
                                setSelectedApp(null)
                            }}
                        />
                        
                    </div>

                </div>

                {/* PC BOTTOM BAR */}

                <div className=" bg-slate-800 w-full flex items-center justify-between gap-1 border-t border-t-white p-1">
                    
                    {/* LEFT */}
                    <div className="flex items-center">
                        <TaskbarItem 
                            icon="⊞" 
                            onClick={() => {
                            // Future: open start menu popup!
                            }} 
                        />
                    </div>

                    {/* CENTER */}
                    <div className="flex items-center gap-1">
                        <TaskbarItem
                            icon="◈"
                            isOpen={filesOpen}
                            onClick={() => {
                                if (!filesOpen) {
                                    setFilesOpen(true);
                                    setFilesMinimized(false);
                                }
                                else if (filesMinimized){
                                    setFilesMinimized(false);
                                }
                                else {
                                    setFilesMinimized(true);
                                }
                            }}
                        />

                        <TaskbarItem
                            icon=">_"
                            isOpen={terminalOpen}
                            onClick={() => {
                                if (!terminalOpen) {
                                    setTerminalOpen(true);
                                    setTerminalMinimized(false);
                                }
                                else if (terminalMinimized){
                                    setTerminalMinimized(false);
                                }
                                else {
                                    setTerminalMinimized(true);
                                }
                            }}
                        />
                        
                        <TaskbarItem
                            icon="◇"
                            isOpen={receiverOpen}
                            onClick={() => {
                                if (!receiverOpen) {
                                    setReceiverOpen(true);
                                    setReceiverMinimized(false);
                                }
                                else if (receiverMinimized){
                                    setReceiverMinimized(false);
                                }
                                else {
                                    setReceiverMinimized(true);
                                }
                            }}
                        />

                        <TaskbarItem
                            icon="▤"
                            isOpen={notesOpen}
                            onClick={() => {
                                if (!notesOpen) {
                                    setNotesOpen(true);
                                    setNotesMinimized(false);
                                }
                                else if (notesMinimized){
                                    setNotesMinimized(false);
                                }
                                else {
                                    setNotesMinimized(true);
                                }
                            }}
                        />
                    </div>
                    
                    {/* RIGHT */}
                    <div className="flex items-center pr-2 select-none font-mono">
                        {time}
                    </div>
                </div>

                {firewallOpen && <FirewallWindow
                    onSuccess={() => setFirewallOpen(false)}
                />}

            </div>

            {/* BOTTOM BAR */}
            <BottomBar/>
        </main>
    )
}