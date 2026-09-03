type TaskbarItemProps = {
    icon: string;
    isOpen?: boolean;
    onClick: () => void;
    className?: string;
}

export default function TaskbarItem({
    icon,
    isOpen = false,
    onClick,
    className="",
} : TaskbarItemProps) {
    return (
        <div className={`w-10 flex items-center justify-center text-2xl px-2 rounded-md cursor-pointer select-none ${
            isOpen ? "bg-slate-700" : "hover:bg-slate-700"
            }`}
            onClick={onClick}
            >
            {icon}
        </div>
    )
}