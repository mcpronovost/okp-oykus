export type RouteType = {
    component: string;
    paths: {
        en: string;
        fr: string;
    };
};

export type RouteMapType = {
    [key: string]: RouteType;
};
