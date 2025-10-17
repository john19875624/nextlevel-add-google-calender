// ==UserScript==
// @name         nextlevel-add-google-calendar
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  e-nextlevel.jpのヘッダーにGoogleカレンダーへのリンクを追加します。
// @author       Your Name
// @match        https://www.e-nextlevel.jp/*
// @grant        GM_addStyle
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    // 設定
    const CONFIG = {
        calendarUrl: 'https://calendar.google.com/calendar/r',
        buttonText: 'カレンダー',
        headerSelector: '.header__title',
        buttonClass: 'user-calendar-btn'
    };

    // CSSスタイル定義
    const STYLES = `
        .user-calendar-btn {
            display: inline-block;
            padding: 6px 12px;
            margin-left: 15px;
            border: 1px solid #4285F4;
            border-radius: 4px;
            background-color: #f7f7f7;
            color: #4285F4 !important;
            text-decoration: none;
            font-weight: bold;
            font-size: 14px;
            line-height: 1;
            white-space: nowrap;
            transition: background-color 0.2s;
        }

        .user-calendar-btn:hover {
            background-color: #e6e6e6;
        }

        @media (max-width: 991px) {
            .user-calendar-btn {
                padding: 4px 8px;
                margin-left: 10px;
                font-size: 12px;
            }
        }

        .header__inner.inner {
            display: flex;
            align-items: center;
        }
    `;

    /**
     * カレンダーボタン要素を作成
     * @returns {HTMLAnchorElement} 作成されたボタン要素
     */
    function createCalendarButton() {
        const btn = document.createElement('a');
        btn.href = CONFIG.calendarUrl;
        btn.target = '_blank';
        btn.rel = 'noopener noreferrer'; // セキュリティ対策
        btn.textContent = CONFIG.buttonText;
        btn.classList.add(CONFIG.buttonClass);
        btn.setAttribute('aria-label', 'Googleカレンダーを開く');
        return btn;
    }

    /**
     * ヘッダーにボタンを挿入
     * @returns {boolean} 挿入成功時true
     */
    function insertButton() {
        const headerTitle = document.querySelector(CONFIG.headerSelector);
        
        if (!headerTitle) {
            console.warn(`[Calendar Button] 挿入対象の要素 (${CONFIG.headerSelector}) が見つかりませんでした。`);
            return false;
        }

        // 既に挿入済みかチェック
        if (document.querySelector(`.${CONFIG.buttonClass}`)) {
            console.info('[Calendar Button] ボタンは既に存在します。');
            return false;
        }

        const button = createCalendarButton();
        headerTitle.parentNode.insertBefore(button, headerTitle.nextSibling);
        console.info('[Calendar Button] ボタンを正常に挿入しました。');
        return true;
    }

    /**
     * 初期化処理
     */
    function init() {
        try {
            GM_addStyle(STYLES);
            insertButton();
        } catch (error) {
            console.error('[Calendar Button] 初期化エラー:', error);
        }
    }

    // 実行
    init();
})();
