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

export interface EventMst {
    id: number; // 活動ID
    categoryId: number; // 類別ID
    eventTitle: string; // 活動標題
    status: string; // 活動狀態
    cost: string; // 活動費用
    eventStDate: string; // 活動開始日期
    eventEdDate: string; // 活動結束日期
    eventCreateDate: string; // 活動創建日期
    examinationPassedDate: string; // 審核通過日期
    signUpStDate: string; // 報名開始日期
    signUpEdDate: string; // 報名結束日期
    eventIntroduction: string; // 活動簡介
    eventDetail: string; // 活動細項
    eventAttantion: string; // 活動注意事項
    tag: string; // 活動標籤
    personLimit: string; // 人數限制
    ageLimit: string; // 年齡限制
}

export interface EventAppendix {
    id: number; // 附件ID
    eventMstId: number; // 活動ID
    category: string; // 附件類別
    appendixPath: string; // 附件路徑
}

export interface GetEventWithCondition {
    rownumPerPage?: number;
    requestPageNum?: number;
    category?: number;
    tag?: string;
    queryList?: Array<string>;
    nonCompleteEvent?: string;
    sortBy?: string;
    eventPersonnel?: string;
    [x: string]: any;
}

export interface sysCodeMst {
    keyword?: string;
    name?: string;
    remark?: string;
}
export interface sysCodeDtl {
    id?: number;
    sysCodeMstKeyword?: string;
    codeName?: string;
    codeDesc?: string;
    orderSeq?: number;
}

export interface APItoken {
    token: string;
}

export interface AddFavoriteEvent extends APItoken {
    eventId: number;
}
