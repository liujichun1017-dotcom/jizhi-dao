/* ===========================
   肌知道 · 主逻辑
=========================== */

(function () {
  'use strict';

  // ---- 元素引用 ----
  const filterBar    = document.getElementById('filterBar');
  const cardsGrid    = document.getElementById('cardsGrid');
  const commonList   = document.getElementById('commonNoteList');
  const overlay      = document.getElementById('modalOverlay');
  const modal        = document.getElementById('modal');
  const modalClose   = document.getElementById('modalClose');

  const modalEmoji    = document.getElementById('modalEmoji');
  const modalTitle    = document.getElementById('modalTitle');
  const modalNameEn   = document.getElementById('modalNameEn');
  const modalDevices  = document.getElementById('modalDevices');
  const modalIntro    = document.getElementById('modalIntro');
  const modalAftercare = document.getElementById('modalAftercare');
  const modalCommon   = document.getElementById('modalCommonList');

  let currentFilter = '全部';

  // ---- 初始化 ----
  function init() {
    renderFilters();
    renderCards();
    renderCommonNotes();
    bindEvents();
  }

  // ---- 分类筛选按钮 ----
  function renderFilters() {
    CATEGORIES.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = 'filter-btn' + (cat === '全部' ? ' active' : '');
      btn.textContent = cat;
      btn.addEventListener('click', () => applyFilter(cat));
      filterBar.appendChild(btn);
    });
  }

  function applyFilter(cat) {
    currentFilter = cat;

    // 更新按钮状态
    filterBar.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.textContent === cat);
    });

    // 显示/隐藏卡片
    cardsGrid.querySelectorAll('.card').forEach(card => {
      const match = cat === '全部' || card.dataset.category === cat;
      card.classList.toggle('hidden', !match);
    });
  }

  // ---- 卡片列表 ----
  function renderCards() {
    TREATMENTS.forEach((t, i) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.dataset.id = t.id;
      card.dataset.category = t.category;
      card.style.animationDelay = (i * 0.04) + 's';

      card.innerHTML = `
        <div class="card-top">
          <span class="card-emoji">${t.emoji}</span>
          <div class="card-names">
            <div class="card-name">${t.name}</div>
            <div class="card-name-en">${t.nameEn}</div>
          </div>
        </div>
        <span class="card-category">${t.category}</span>
        <p class="card-intro">${t.intro}</p>
        <div class="card-footer">
          <span class="card-count">术后 ${t.aftercare.length} 条注意事项</span>
          <span class="card-btn">查看详情</span>
        </div>
      `;

      card.addEventListener('click', () => openModal(t));
      cardsGrid.appendChild(card);
    });
  }

  // ---- 共同注意事项 ----
  function renderCommonNotes() {
    COMMON_NOTES.forEach(note => {
      const li = document.createElement('li');
      li.textContent = note;
      commonList.appendChild(li);
    });
  }

  // ---- 打开 Modal ----
  function openModal(t) {
    // 填充内容
    modalEmoji.textContent   = t.emoji;
    modalTitle.textContent   = t.name;
    modalNameEn.textContent  = t.nameEn;
    modalIntro.textContent   = t.intro;

    // 设备标签
    modalDevices.innerHTML = '';
    if (t.devices && t.devices.length > 0) {
      t.devices.forEach(d => {
        const tag = document.createElement('span');
        tag.className = 'device-tag';
        tag.textContent = d;
        modalDevices.appendChild(tag);
      });
    }

    // 术后注意事项
    modalAftercare.innerHTML = '';
    t.aftercare.forEach((item, i) => {
      const li = document.createElement('li');
      const isWarning = item.startsWith('★') || item.includes('立即联系') || item.includes('请立即');
      if (isWarning) li.classList.add('warning');
      li.innerHTML = `<span class="num">${i + 1}</span><span>${item}</span>`;
      modalAftercare.appendChild(li);
    });

    // 共同注意
    modalCommon.innerHTML = '';
    COMMON_NOTES.forEach(note => {
      const li = document.createElement('li');
      li.textContent = note;
      modalCommon.appendChild(li);
    });

    // 显示 modal
    modal.scrollTop = 0;
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  // ---- 关闭 Modal ----
  function closeModal() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // ---- 绑定事件 ----
  function bindEvents() {
    // 关闭按钮
    modalClose.addEventListener('click', closeModal);

    // 点击遮罩关闭
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeModal();
    });

    // ESC 关闭
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeModal();
    });

    // 触摸下滑关闭（手机）
    let startY = 0;
    modal.addEventListener('touchstart', e => {
      startY = e.touches[0].clientY;
    }, { passive: true });

    modal.addEventListener('touchend', e => {
      const dy = e.changedTouches[0].clientY - startY;
      if (dy > 80 && modal.scrollTop === 0) closeModal();
    }, { passive: true });
  }

  // ---- 启动 ----
  document.addEventListener('DOMContentLoaded', init);
})();
