import { proxy } from "valtio";

export const loggeds = proxy(({
    value:false,
    profile:"",
    loading:false,
    route:"/",
    editcontent:"",
    quoteid:"",
    postpart:"",
    Rep:false,
    boxid:"",
    edit:{type:false},
    Repid:"",
    eid : "",
    name:"",
    quotemgs:"",
    Quote:false,
    Comment:[],
    send2:false,
    send:false,
    login:false
}))

