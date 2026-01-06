"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button, Input } from "@/components/ui/shared";

export default function LoginPage() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    });

    interface LoginFormValues {
        email?: string;
        password?: string;
    }

    const onSubmit = (data: LoginFormValues) => {
        console.log(data);
        router.push("/products");
    };

    return (
        <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-[420px] bg-white rounded-3xl shadow-sm border-t-[6px] border-primary p-10 space-y-8">
                <div className="text-center space-y-2">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center">
                            <svg width="20" height="20" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M256 32L128 96V224C128 320 256 416 256 416C256 416 384 320 384 224V96L256 32Z" fill="white" />
                                <path d="M256 64L160 112V208C160 272 256 352 256 352C256 352 352 272 352 208V112L256 64Z" fill="#FF5C35" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-black text-gray-900 tracking-tight">SPORT<span className="text-primary">ON</span> <span className="text-gray-400 font-medium text-lg italic">Admin</span></h1>
                    </div>
                    <p className="text-gray-400 font-medium text-sm">Enter your credentials to access the dashboard</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-900 block">Email</label>
                        <Input
                            type="email"
                            placeholder="admin@store.com"
                            autoFocus
                            error={errors.email?.message}
                            {...register("email", { required: "Email is required" })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-900 block">Password</label>
                        <Input
                            type="password"
                            placeholder="..................."
                            error={errors.password?.message}
                            {...register("password", { required: "Password is required" })}
                        />
                    </div>

                    <div className="pt-2">
                        <Button
                            type="submit"
                            className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20"
                        >
                            Sign In
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
