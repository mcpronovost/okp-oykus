import type { AppDispatch, RootState } from "@/services/utils/types";
import { useDispatch, useSelector } from "react-redux";
import { commonActions } from "@/services/store/slices/common";

export default function Test2() {
    const dispatch = useDispatch<AppDispatch>();
    const lang = useSelector((state: RootState) => state.common.lang);

    return (
        <>
            <div>lang : {lang}</div>
            <button onClick={() => dispatch(commonActions.setLang(lang === "en" ? "fr" : "en"))}>
                click me
            </button>
        </>
    );
}
