import { cn } from "../../lib/cn";

const variants = {
    primary:
        "bg-gradient-to-r from-royal to-lavender text-white shadow-[0_10px_30px_rgba(92,51,204,0.4)] hover:-translate-y-0.5",
    ghost:
        "border border-white/15 text-white hover:border-lavender/60 hover:text-lavender",
    subtle:
        "bg-white/5 text-neutral-300 hover:bg-white/10 hover:text-white",
};

const sizes = {
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-sm",
};

export default function Button({
    as: Tag = "button",
    variant = "primary",
    size = "md",
    className,
    ...rest
}) {
    return (
        <Tag
            className={cn(
                "inline-flex items-center justify-center gap-2 rounded-full font-medium transition duration-200",
                variants[variant],
                sizes[size],
                className,
            )}
            {...rest}
        />
    );
}
