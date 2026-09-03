"use client"

import { useState } from "react";
import Window, { BaseWindowProps } from "@/components/Windows/Window";

type NotesWindowProps = BaseWindowProps & {
  content: string;
  onContentChange: (newContent: string) => void;
};

export default function NotesWindow({
    mode,
    onMinimize,
    onMaximize,
    onClose,
    content,
    onContentChange,
} : NotesWindowProps) {

    return (
        <Window title={<span>Notes</span>}
            mode={mode}
            onClose={onClose}
            onMaximize={onMaximize}
            onMinimize={onMinimize}
            bgClassName="bg-slate-900"
        >
            <div className="flex flex-col flex-1 px-3 py-2">
                <textarea
                value={content}
                onChange={(e) => onContentChange(e.target.value)}
                spellCheck={false}
                className="w-full flex-1 bg-transparent
                    font-mono text-sm resize-none outline-none text-slate-200"
                />

            </div>

        </Window>
    )
}