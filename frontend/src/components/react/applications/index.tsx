import Providers from "@/components/react/Providers";
import OkpTest from "@/components/react/common/Test";
import OkpTest2 from "@/components/react/common/Test2";

export const Test1 = () => {
    return (
        <Providers>
            <OkpTest />
        </Providers>
    );
};

export const Test2 = () => {
    return (
        <Providers>
            <OkpTest2 />
        </Providers>
    );
};
