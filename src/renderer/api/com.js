var haXNs = 'GFzbzAyMTkzb2FzamRkOTA4dTJuYm5jc2FuODMyaGFkMjFk';
import md5 from 'js-md5';
const comjs = {

}

comjs.addmi = function(tag) {
    var text = JSON.stringify(tag);
    text = Base64.encode(text);
    var num = GetRandomNum(2, text.length - 2);
    var first = text.substring(0, num);
    var last = text.substring(num, text.length);
    text = first + haXNs + last;
    return text;
}

comjs.gethttp = function() {
    var commerImg = Base64.decode('aHR0cDovL2FwaXBheS5lc3Nubi5jb20v');
    var commerImg1 = Base64.decode('aHR0cDovL2FwaXBheS5lc3Nubi5jb20vaW5kZXgucGhwL0hvbWUvQXBpL0FwcGRpc2gyL3Bvc3RhcGk');
    var myDate = new Date();
    var nian = String(myDate.getFullYear());
    var yue = String(myDate.getMonth() + 1);
    var tian = String(myDate.getDate());
    var hours = String(myDate.getHours());
    if (yue.length == 1) {
        yue = '0' + yue;
    };
    if (tian.length == 1) {
        tian = '0' + tian;
    };
    var data = nian + yue + tian;
    var url = md5(data + '116abc');
    var commerhttp = commerImg1 + '?key=' + url;
    return commerhttp; 
};

comjs.unadd = function(tag) {
    var str = String(tag);
    var length = str.length;
    var text = Base64.decode(str.replace(haXNs, ''));
    var text = JSON.parse(text);
    if (text['state'] == 999) {
        
    } else {
        return text;
    }
}

comjs.RndNum = function(n) {
    var rnd = "";
    for (var i = 0; i < n; i++)
        rnd += Math.floor(Math.random() * 10);
    return rnd;
}

comjs.getNowFormatDate = function() {
    var date = new Date();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var seconds = date.getSeconds();
    var hours = date.getHours();
    var min = date.getMinutes();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    if (seconds >= 0 && seconds <= 9) {
        seconds = "0" + seconds;
    }
    if (hours >= 0 && hours <= 9) {
        hours = "0" + hours;
    }
    if (min >= 0 && min <= 9) {
        min = "0" + min;
    }
    if (status) {
        var currentdate = date.getFullYear() + '-' + month + '-' + strDate;
    } else {
        var currentdate = date.getFullYear() + String(month) + String(strDate) + String(hours) + String(min) + String(seconds);
    }
    return currentdate;
}

function GetRandomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return (Min + Math.round(Rand * Range));
}

export default comjs;





