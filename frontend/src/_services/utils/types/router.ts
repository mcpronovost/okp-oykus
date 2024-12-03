export type RouteType = {
    view: string;
    props?: Record<string, unknown>;
    params?: Record<string, string>;
    paths: {
        en: string;
        fr: string;
    };
    children?: RouteMapType;
};

export type RouteMapType = {
    [key: string]: RouteType;
};
