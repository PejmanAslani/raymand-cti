export enum PlineActions {
    "SIP User" = 0,
    "Ring Group" = 1,
    "IVR" = 2,
    "Queue" = 3,
    "Time Condition" = 4,
    "Announcement" = 5,
    "SIP Trunk Transit" = 6,
    "Call On SIP Trunk" = 7,
    "Direct Dial" = 8,
    "API Interface" = 9,
    "Reject" = 10,
    'none'=999,
};
export interface IPlineActions {
    id?: any;
    inboundRoute: {
        id: any
    },
    action: PlineActions;
    value: any;
    options: any;
}