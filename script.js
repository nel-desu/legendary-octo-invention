// ==UserScript==
// @name         FF14 签到
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  屑脚本，在进入官网时，自动打开积分商城和竞猜中心
// @author       Nel
// @match        *://*.sdo.com/*
// @match        *://bbs.nga.cn/*
// @match        *://nga.178.com/*
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// @connect      sdo.com
// ==/UserScript==

(function() {
    'use strict';

    GM_registerMenuCommand("每日签到", checkin, "a");

    const date = GM_getValue("date", null);
    if (!date || date !== getToDay()) {
        checkin();
        GM_setValue("date", getToDay());
    }

    console.log("脚本运行：" + window.location.host + " date: " + date);

    /* 给竞猜中心添加按钮 */
    function addButton() {
        const btns = document.querySelectorAll(".ibtn");
        if (!btns && btns.length <= 0) {
            return;
        }
        const newBtn = document.createElement("div");
        newBtn.innerText = "全部领取";
        newBtn.className = "ibtn";
        newBtn.onclick = () => {
            for(let i = 0; i < btns.length; i++) {
                btns[i].click();
            }
        };
        const parent = btns[0].parentElement;
        parent.insertBefore(newBtn, btns[0]);
        parent.style = "width: 450px";
    }

    /* 打开网页手动签到 */
    function checkin() {
        window.open("https://qu.sdo.com/personal-center?merchantId=1#pointsindex-1");
        window.open("https://actff1.web.sdo.com/20200908JingCai/index.html#/index");
    }

    if (window.location.host === "actff1.web.sdo.com") {
        addButton();
    }

    function getToDay() {
        const date = new Date();
        return (date.getMonth() + 1) + "-" + date.getDate();
    }
})();
