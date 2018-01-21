
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
export const dateymdPoint = time =>{
    time *= 1000 
    var newDate = new Date(time);
    let {y,m,d}={y:newDate.getFullYear(),m:newDate.getMonth()+1,d:newDate.getDate()};
    y = trans(y);
    m = trans(m);
    d = trans(d);
    return `${y}.${m}.${d}` ;
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
// 银行卡号分割
export const bank_filter = val =>{
    val += '';
    val = val.replace(/(\s)/g,'').replace(/(\d{4})/g,'$1 ').replace(/\s*$/,'');
    return val;
}
// 时间转换
export const time_filter  = time =>{
        time-=0;
        let difTime = new Date().getTime() - time ;
        let {h,m} = {h:parseInt(difTime/(3600*1000)),m:parseInt(difTime/(60*1000))}; 
        let msg = "" ;
        if (h<1) {
          msg =  `${m}分钟前`;
        }else if(h>=1&&h<=24){
          msg = `${h}小时前`;
        }else if(h>24){
            h = parseInt(h/24)
            msg =`${h}天前`;
        }
        return msg ;
}
export const trans =  (val)=>{
    if (val < 10) {
      val = "0" + val ;
    }
    return val ;
};