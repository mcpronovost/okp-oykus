export type RouteType = {
    view: string;
    props?: Record<string, unknown>;
    paths: {
        en: string;
        fr: string;
    };
    children?: RouteMapType;
};

export type RouteMapType = {
    [key: string]: RouteType;
};
