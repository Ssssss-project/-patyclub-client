import Quasar from "quasar";

//interface definition
export interface response {
    message: string;
    sysErrMsg: null | string;
}
export interface EventList {
    id: number;
    categoryId: number;
    categoryName: string;
    eventTitle: string;
    eventIntroduction: string;
    signUpStDate: null | string;
    signUpEdDate: null | string;
    eventStDate: string;
    eventEdDate: string;
    owner: string;
    coverPath: string;
    timeStatus: string;
}

export interface Event extends response {
    data: EventList[];
}

export interface categoryNode {
    cateId: number;
    cateName: string;
    childNode: categoryNode[];
}

export interface EventCategory extends response {
    data: categoryNode;
}

export interface QuasartreeNode {
    id: number;
    label: string;
    children: QuasartreeNode[];
}

export interface EventType {
    id: number;
    eventTitle: string;
    eventIntroduction: string;
    signUpStDate: string;
    signUpEdDate: string;
    eventStDate: string;
    eventEdDate: string;
    owner: string;
}

export interface GetEventWithCondition {
    category?: number;
    tag?: string;
    queryList?: Array<string>;
    nonCompleteEvent?: string;
    sortBy?: string;
    eventPersonnel?: string;
    [x: string]: any;
}
