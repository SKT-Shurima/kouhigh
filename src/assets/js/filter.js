
// 数字超过9显示省略号
export const num_filter = val =>{
    val = val?val-0:0;
     if (val > 9 ) {
        return "9+"
     }else{
      return val;
     }
}
// 年月
export const dateYM = time =>{
    time *= 1000 
    var newDate = new Date(time);
    let {y,m,d}={y:newDate.getFullYear(),m:newDate.getMonth()+1,d:newDate.getDate()};
    m = trans(m);
    d = trans(d);
    return `${y}年${m}月${d}号`;
}
export const dateym = time =>{
    time *= 1000 
    var newDate = new Date(time);
    let {y,m,d}={y:newDate.getFullYear(),m:newDate.getMonth()+1,d:newDate.getDate()};
    y = trans(y);
    m = trans(m);
    return `${y}-${m}` ;
}
export const dateymd = time =>{
    time *= 1000 
    var newDate = new Date(time);
    let {y,m,d}={y:newDate.getFullYear(),m:newDate.getMonth()+1,d:newDate.getDate()};
    y = trans(y);
    m = trans(m);
    d = trans(d);
    return `${y}-${m}-${d}` ;
}
// 时分秒
export const timeHMS = time =>{
    time *= 1000
    var newDate = new Date(time);
    let {h,m,s}={h:newDate.getHours(),m:newDate.getMinutes(),s:newDate.getSeconds()};
    h = trans(h);
    m = trans(m);
    s = trans(s);
    return h +':' + m + ':' + s;
}
export const timeHM = time =>{
    time *= 1000
    var newDate = new Date(time);
    let {h,m,s}={h:newDate.getHours(),m:newDate.getMinutes(),s:newDate.getSeconds()};
    h = trans(h);
    m = trans(m);
    s = trans(s);
    return h +':' + m ;
}
// 年月日 时分
export const dateTime = time =>{
    time *= 1000 
    var newDate = new Date(time);
    let {y,M,d,h,m}={y:newDate.getFullYear(),M:newDate.getMonth()+1,d:newDate.getDate(),h:newDate.getHours(),m:newDate.getMinutes()};
    y = trans(y);
    M = trans(M);
    d = trans(d);
    h = trans(h);
    m = trans(m);
    return `${y}-${M}-${d}  ${h}:${m}`;
}
// 倒计时
export const countTime = time =>{
    time -= 0;
    var h = parseInt(time/3600),m=parseInt(time/60%60),s=parseInt(time%60);
    h = trans(h);
    m = trans(m);
    s = trans(s);
    return h+':'+m+':'+s;
}
export const trans =  (val)=>{
    if (val < 10) {
      val = "0" + val ;
    }
    return val ;
};