"use client"
type DekstopIconProps = {
    label: string;
    icon: string;
    isSelected: boolean;
    onSelect: () => void;
    onOpen: () => void;
}

export default function DekstopIcon({
    label,
    icon,
    isSelected,
    onSelect,
    onOpen
} : DekstopIconProps) {
    return (
        <div
            className={`w-24 border rounded-md flex flex-col 
                p-0.5 gap-1 cursor-pointer select-none transition-colors duration-200
                ${isSelected
                ? "border-cyan-500/10 bg-slate-700 text-cyan-500"
                : "border-transparent hover:border-cyan-500/10 hover:bg-slate-700 hover:text-cyan-500"
                }`} 
                onClick={onSelect}
                onDoubleClick={onOpen}
        >
            <div className="flex items-center justify-center text-5xl">
                {icon}
            </div>

            <div className="flex items-center justify-center">
                {label}
            </div>
        </div>
    )
    
}