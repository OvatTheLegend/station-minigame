"use client";

import { useState } from "react";
import Window, { BaseWindowProps } from "@/components/Windows/Window";
import { FileItem } from "@/app/game/page";

type FilesWindowProps = BaseWindowProps & {
  files: FileItem[];
  setFiles: React.Dispatch<React.SetStateAction<FileItem[]>>;
}

export default function FilesWindow({
  mode,
  onClose,
  onMinimize,
  onMaximize,
  files,
  setFiles,
}: FilesWindowProps) {


  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);

  function handleContentChange(newContent: string) {
    if (!selectedFile) return;

    const updatedFile = { ...selectedFile, content: newContent };

    setSelectedFile(updatedFile);

    setFiles((prevFiles) =>
      prevFiles.map((file) =>
        file.id === selectedFile.id ? updatedFile : file
      )
    );
  }

  const titleNode = (
    <div className="flex flex-row items-center gap-2">
      <span>{!selectedFile ? "FILES" : selectedFile.name}</span>

      {selectedFile && (
        <div
          onClick={() => setSelectedFile(null)}
          className="w-6 h-6 px-1 flex items-center justify-center cursor-pointer select-none rounded-md hover:bg-slate-700"
        >
          ↩
        </div>
      )}
    </div>
  );

  return (
    <Window
      title={titleNode}
      mode={mode}
      onClose={onClose}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      bgClassName="bg-slate-900"
    >
      {/* MAIN TEXT AREA */}
      {!selectedFile ? (
        <div className="px-1 py-1 flex flex-col">
          {files.map((file) => (
            <div
              key={file.id}
              onClick={() => setSelectedFile(file)}
              className="cursor-pointer select-none hover:bg-slate-800 p-1 rounded"
            >
              {file.name}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col flex-1 px-3 py-2">
          <textarea
            value={selectedFile.content}
            onChange={(e) => handleContentChange(e.target.value)}
            spellCheck={false}
            className="w-full flex-1 bg-transparent font-mono text-sm resize-none outline-none text-slate-200"
          />
        </div>
      )}
    </Window>
  );
}