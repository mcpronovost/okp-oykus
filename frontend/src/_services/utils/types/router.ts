export type RouteType = {
    view: string;
    props?: Record<string, unknown>;
    params?: Record<string, string>;
    paths: {
        en: string;
        fr: string;
    };
    auth?: boolean;
    children?: RouteMapType;
};

export type RouteMapType = {
    [key: string]: RouteType;
};
