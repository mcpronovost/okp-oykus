type Props = {
    children: React.ReactNode;
    type?: string;
    size?: string;
};

export default function Tag({ children, type, size }: Props) {
    return (
        <span className={`okp-tag ${type ? `okp-tag-type-${type}` : ""} ${size ? `okp-tag-size-${size}` : ""}`}>
            {children}
        </span>
    );
}
