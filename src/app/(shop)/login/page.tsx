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
                    <div className="flex items-center justify-center mb-4">
                        <img src="/Frame 5.png" alt="SportOn Logo" className="h-12 w-auto" />
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
