import { useStationTime } from "@/hooks/useStationTime";


export default function Bottombar(){
    const time = useStationTime();
    return (
        <div className="bg-black z-10 w-full flex items-center 
                justify-between border-t-2 border-t-green-600 px-6 py-4">
                
            <div className="text-base font-medium uppercase 
                    tracking-wider text-green-500 select-none">
                    {time} UTC
            </div>

            <div className="text-base font-medium uppercase 
                    tracking-wider text-green-500 select-none">
                    CONNECTION: STABLE
            </div>

            <div className="text-base font-medium uppercase 
                    tracking-wider text-green-500 select-none">
                    CPU 18%
            </div>

            <div className="text-base font-medium uppercase 
                    tracking-wider text-green-500 select-none">
                    MEM 42%
            </div>

        </div>
    )
}