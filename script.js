// ==UserScript==
// @name         FF14 签到
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  积分商场签到与竞猜中心签到，参考 https://nga.178.com/read.php?tid=36759387
// @author       Nel
// @match        *://*.sdo.com/*
// @match        *://bbs.nga.cn/*
// @match        *://nga.178.com/*
// @match        *://ff14.huijiwiki.com/*
// @match        *://*.ffxiv.cn/*
// @icon         https://ff.web.sdo.com/favicon.ico
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// @connect      sdo.com
// ==/UserScript==

(function() {
    'use strict';

    // 自己的账号
    const ACCOUNT = "XXXXXX";
    // 自动打开的地址，不用时注释掉即可
    const ADDRESS = [
        // 竞猜网页地址
        "https://actff1.web.sdo.com/20200908JingCai/index.html#/index",
        // 积分网页地址
        "https://qu.sdo.com/personal-center?merchantId=1#pointsindex-1",
    ];

    const HOST = window.location.host;

    // 在拓展上添加按钮
    GM_registerMenuCommand("每日签到", checkin, "");

    // 检查日期
    const date = GM_getValue("date", null);
    if (!date || date !== getToDay()) {
        checkin();
        GM_setValue("date", getToDay());
    }

    // 登录页面，自动选中一键登录
    if (HOST === "login.u.sdo.com") {
        document.querySelector('#isAgreementAccept').click();
        document.querySelector('#nav_btn_mobile').click();
        document.querySelector('#username').value = ACCOUNT;
    }
    // 竞猜页面，添加一键领取按钮
    if (HOST === "actff1.web.sdo.com") {
        const newBtn = addButton();
        setTimeout(() => newBtn.click(), 1000);
    }
    // 商城个人中心
    if (HOST === "qu.sdo.com") {
        const newBtn = addButton();
        setTimeout(() => document.querySelector(".action-dom").click(), 1000);
    }

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
        return newBtn;
    }

    /* 打开网页手动签到 */
    function checkin() {
        ADDRESS.forEach(v => window.open(v));
    }

    function getToDay() {
        const date = new Date();
        return (date.getMonth() + 1) + "-" + date.getDate();
    }
})();
