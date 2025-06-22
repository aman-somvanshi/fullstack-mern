import Button from '@mui/material/Button';

// We start by assuming that this will be for the full width of the screen. Whoever uses this component can adjust the width as needed using grid-cols or flex classes.
const RevenueCard = ({title,
    orderCount,
    amount
}) => {
    return (
        <div className="bg-white rounded shadow-md p-4">
            <div className="flex text-gray-700 items-center">
                <div className="pr-1">
                    {title}
                </div>
                {/* <div>This below element is just to show how mui works.</div> */}
                <div>
                    <Button variant="contained">Contained</Button>
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                </svg>
                </div>
                
            </div>
            <div className="flex justify-between pt-2 items-center">
                <div className="text-2xl font-semibold">₹ {amount}</div>
                <div>
                    {orderCount ? 
                    <div className="flex underline cursor-pointer font-medium items-center">
                            <div className="text-blue-700">
                                {orderCount} order(s) 
                            </div> 
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5.5 text-blue-700 ">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </div>
                        
                    </div> : null}
                </div>
            </div>
        </div>
        
    )
}

export default RevenueCard;