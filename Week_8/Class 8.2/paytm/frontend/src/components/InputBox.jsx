export function InputBox({label, placeholder, onChange}) {
    return (
        <>
            <div>
                <div className="text-sm font-medium text-left py-2">{label}</div>
                <div>
                    <input onChange={onChange} placeholder={placeholder} className="border border-slate-200 rounded px-2 w-full py-1" />
                </div>
            </div>
        </>
    )
}