import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={cn("bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden", className)}>
            {children}
        </div>
    );
}

export function Button({
    variant = 'primary',
    children,
    className,
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'danger' | 'ghost' }) {
    const variants = {
        primary: "bg-[#FF4D00] hover:bg-[#FF4D00]/90 text-white shadow-xl shadow-[#FF4D00]/20",
        secondary: "bg-white text-gray-900 border border-gray-100 hover:bg-gray-50 shadow-sm",
        danger: "bg-rose-50 text-rose-600 hover:bg-rose-100",
        ghost: "bg-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-900"
    };

    return (
        <button
            className={cn(
                "px-5 py-2.5 rounded-xl font-bold transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 h-10 text-[13px] tracking-wide",
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}

export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string }>(
    ({ label, error, className, ...props }, ref) => {
        return (
            <div className="space-y-1.5 w-full text-left">
                {label && <label className="text-[12px] font-bold text-gray-900 ml-1 block">{label}</label>}
                <input
                    ref={ref}
                    className={cn(
                        "w-full px-4 py-2.5 rounded-xl border-2 border-transparent bg-gray-50 focus:bg-white focus:border-[#FF4D00]/20 focus:outline-none focus:shadow-lg focus:shadow-[#FF4D00]/5 transition-all font-bold text-gray-900 text-sm placeholder:text-gray-300 placeholder:font-medium",
                        error && "border-rose-500 focus:ring-rose-500/10",
                        className
                    )}
                    {...props}
                />
                {error && <p className="text-[10px] text-rose-500 font-bold ml-1 text-left">{error}</p>}
            </div>
        );
    }
);
Input.displayName = "Input";
