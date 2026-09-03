export default function TopBar() {
    return (
        <div className="bg-black z-10 w-full flex items-center 
                justify-between border-b-2 border-b-green-600 px-6 py-4">
                
            <div className="text-base font-medium uppercase 
                    tracking-wider text-green-500 select-none">
                    SIGNAL//LOST
            </div>

            <div className="text-base font-medium uppercase 
                    tracking-wider text-green-500 select-none">
                    SIGNAL-03
            </div>

            <div className="text-base font-medium uppercase 
                    tracking-wider text-green-500 select-none">
                    SYSTEM ONLINE
            </div>

        </div>
    )
}