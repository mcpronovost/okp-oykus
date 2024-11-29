export type RouteType = {
    component: string;
    paths: {
        en: string;
        fr: string;
    };
    children?: RouteMapType;
};

export type RouteMapType = {
    [key: string]: RouteType;
};
