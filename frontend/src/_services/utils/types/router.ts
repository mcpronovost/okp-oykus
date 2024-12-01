export type RouteType = {
    component: string;
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
