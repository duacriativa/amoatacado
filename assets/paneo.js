// ─── STATE ───────────────────────────────────────────────────────────────────
let qty = typeof MIN_QTY !== 'undefined' ? MIN_QTY : 6;
let grade = {};
let activeVideoIdx = 0;
let isMobileView = window.innerWidth <= 768;

function initGrade() {
  grade = {};
  if (typeof COLORS === 'undefined' || typeof SIZES === 'undefined') return;
  SIZES.forEach(s => {
    grade[s] = {};
    COLORS.forEach(c => { grade[s][c] = 0; });
  });
}

function gradeTotal() {
  if (!grade || typeof COLORS === 'undefined') return 0;
  return SIZES.reduce((sum, s) => sum + COLORS.reduce((s2, c) => s2 + (grade[s][c] || 0), 0), 0);
}

function colTotal(color) {
  if (!grade) return 0;
  return SIZES.reduce((s, sz) => s + (grade[sz]?.[color] || 0), 0);
}

function fmt(n) {
  return 'R$ ' + n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// ─── RENDER ──────────────────────────────────────────────────────────────────
function renderOrder() {
  if (typeof COLORS === 'undefined') return;
  const total = gradeTotal();
  const minQty = typeof MIN_QTY !== 'undefined' ? MIN_QTY : 6;
  const price = typeof WHOLESALE_PRICE !== 'undefined' ? WHOLESALE_PRICE : 145;
  const ready = total === qty && qty >= minQty;
  const remaining = qty - total;

  // Qty display
  const qtyDisplay = document.getElementById('qty-display');
  if (qtyDisplay) qtyDisplay.textContent = qty;
  const btnMinus = document.getElementById('btn-minus');
  if (btnMinus) btnMinus.disabled = qty <= minQty;

  // Presets highlight
  document.querySelectorAll('.p-qty-preset').forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.textContent) === qty);
  });

  // Progress
  const prog = document.getElementById('grade-progress');
  if (prog) {
    prog.textContent = `${total}/${qty}`;
    prog.style.color = ready ? '#2C7A3A' : '#7D3018';
  }

  // Summary
  const sumQty = document.getElementById('sum-qty');
  if (sumQty) sumQty.textContent = `${total} / ${qty} peças`;

  const sumTotal = document.getElementById('sum-total');
  if (sumTotal) sumTotal.textContent = fmt(total * price);

  // Color breakdown
  const sumColors = document.getElementById('sum-colors-content');
  if (sumColors) {
    sumColors.innerHTML = COLORS.filter(c => colTotal(c) > 0).map(c => {
      const dot = COLOR_DOTS?.[c] || '#888';
      const details = SIZES.filter(s => grade[s]?.[c] > 0).map(s => `${s}:${grade[s][c]}`).join(' ');
      return `<div class="p-sum-color-row"><span class="p-sum-color-dot" style="background:${dot}"></span><span>${c}: ${colTotal(c)} pç</span><span style="opacity:0.5;font-size:0.65rem">(${details})</span></div>`;
    }).join('');
  }

  // Warning + button
  const warn = document.getElementById('sum-warn');
  const btn = document.getElementById('btn-checkout');
  if (warn) {
    if (ready) {
      warn.textContent = 'Frete calculado no checkout.';
      warn.classList.remove('error');
    } else {
      warn.textContent = total === 0 ? 'Preencha a grade para continuar.' : `Faltam ${remaining} peça${remaining !== 1 ? 's' : ''} para completar a grade.`;
      warn.classList.add('error');
    }
  }
  if (btn) btn.disabled = !ready;

  if (isMobileView) renderMobile();
  else renderDesktop();
}

function renderDesktop() {
  const tbody = document.getElementById('p-grade-tbody');
  if (!tbody || typeof COLORS === 'undefined') return;
  tbody.innerHTML = SIZES.map(sz => `
    <tr>
      <td class="size-lbl">${sz}</td>
      ${COLORS.map(c => `
        <td>
          <div class="p-cell-ctr">
            <button class="p-cell-btn" onclick="changeCell('${sz}','${c}',-1)" ${grade[sz]?.[c] <= 0 ? 'disabled' : ''}>−</button>
            <span class="p-cell-num">${grade[sz]?.[c] || 0}</span>
            <button class="p-cell-btn" onclick="changeCell('${sz}','${c}',1)" ${gradeTotal() >= qty ? 'disabled' : ''}>+</button>
          </div>
        </td>
      `).join('')}
      <td><span class="p-total-badge${SIZES.reduce((s,_s) => s, 0) > 0 ? ' partial' : ''}">${SIZES.reduce((sum,_) => sum, 0) || COLORS.reduce((s,c) => s + (grade[sz]?.[c] || 0), 0)}</span></td>
    </tr>
  `).join('') + `
    <tr class="total-row">
      <td class="size-lbl">Total</td>
      ${COLORS.map(c => `<td><span class="p-total-badge${colTotal(c) > 0 && gradeTotal() < qty ? ' partial' : ''}">${colTotal(c)}</span></td>`).join('')}
      <td><span class="p-total-badge${gradeTotal() === qty ? '' : ' partial'}" style="${gradeTotal() === qty ? 'background:#2C7A3A' : ''}">${gradeTotal()}</span></td>
    </tr>
  `;
}

let currentMobileColor = typeof COLORS !== 'undefined' ? COLORS[0] : 'Preto';

function renderMobile() {
  const tabsEl = document.getElementById('p-color-tabs');
  const rowsEl = document.getElementById('p-size-rows');
  const totalsEl = document.getElementById('p-mobile-totals');
  if (!tabsEl || typeof COLORS === 'undefined') return;

  tabsEl.innerHTML = COLORS.map(c => {
    const dot = COLOR_DOTS?.[c] || '#888';
    const ct = colTotal(c);
    return `<button class="p-color-tab${currentMobileColor === c ? ' active' : ''}" onclick="setMobileColor('${c}')">
      <span class="p-col-dot" style="background:${dot}"></span>
      <span style="font-size:0.6rem;letter-spacing:0.1em">${c === 'Cappuccino' ? 'Capp.' : c}</span>
      ${ct > 0 ? `<span class="p-tab-badge">${ct}</span>` : ''}
    </button>`;
  }).join('');

  rowsEl.innerHTML = SIZES.map(sz => `
    <div class="p-size-row">
      <span class="p-size-row-lbl">${sz}</span>
      <div class="p-size-row-ctr">
        <button class="p-cell-btn" style="width:32px;height:32px" onclick="changeCell('${sz}','${currentMobileColor}',-1)" ${grade[sz]?.[currentMobileColor] <= 0 ? 'disabled' : ''}>−</button>
        <span class="p-cell-num" style="font-size:1.8rem;width:36px">${grade[sz]?.[currentMobileColor] || 0}</span>
        <button class="p-cell-btn" style="width:32px;height:32px" onclick="changeCell('${sz}','${currentMobileColor}',1)" ${gradeTotal() >= qty ? 'disabled' : ''}>+</button>
      </div>
    </div>
  `).join('') + `
    <div class="p-size-row" style="background:#F9F7F4">
      <span class="p-size-row-lbl" style="font-size:0.6rem;letter-spacing:0.15em;text-transform:uppercase;color:#7A6B60">Total ${currentMobileColor === 'Cappuccino' ? 'Capp.' : currentMobileColor}</span>
      <span class="p-total-badge${colTotal(currentMobileColor) > 0 ? ' partial' : ''}">${colTotal(currentMobileColor)}</span>
    </div>`;

  if (totalsEl) {
    const t = gradeTotal();
    totalsEl.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center;margin-top:0.75rem;padding:0.5rem 0;border-top:2px solid #D4C8BC">
      <span style="font-size:0.6rem;font-weight:500;letter-spacing:0.15em;text-transform:uppercase;color:#7A6B60">Total geral</span>
      <span class="p-total-badge${t === qty ? '' : ' partial'}" style="${t === qty ? 'background:#2C7A3A' : ''}">${t}/${qty}</span>
    </div>`;
  }
}

// ─── ACTIONS ─────────────────────────────────────────────────────────────────
function changeQty(delta) {
  const minQty = typeof MIN_QTY !== 'undefined' ? MIN_QTY : 6;
  const next = qty + delta;
  if (next < minQty) return;
  qty = next;
  if (gradeTotal() > qty) initGrade();
  renderOrder();
}

function setQtyPreset(val) {
  qty = val;
  initGrade();
  renderOrder();
}

function changeCell(size, color, delta) {
  if (delta > 0 && gradeTotal() >= qty) return;
  if (delta < 0 && (grade[size]?.[color] || 0) <= 0) return;
  grade[size][color] = (grade[size][color] || 0) + delta;
  renderOrder();
}

function setMobileColor(color) {
  currentMobileColor = color;
  renderMobile();
  renderOrder();
}

// ─── SHOPIFY CART API ─────────────────────────────────────────────────────────
async function addToCartAndCheckout() {
  const btn = document.getElementById('btn-checkout');
  if (btn) { btn.disabled = true; btn.textContent = 'Adicionando...'; }

  const items = [];
  if (typeof COLORS !== 'undefined' && typeof VARIANTS !== 'undefined') {
    COLORS.forEach(color => {
      SIZES.forEach(size => {
        const q = grade[size]?.[color] || 0;
        if (q > 0) {
          const variantId = VARIANTS[`${color}_${size}`];
          if (variantId) items.push({ id: variantId, quantity: q });
        }
      });
    });
  }

  if (items.length === 0) return;

  try {
    // Clear cart first
    await fetch('/cart/clear.js', { method: 'POST' });
    // Add all items
    const res = await fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items })
    });
    if (res.ok) {
      window.location.href = '/checkout';
    } else {
      alert('Erro ao adicionar ao carrinho. Tente novamente.');
      if (btn) { btn.disabled = false; btn.textContent = 'Ir para o Checkout →'; }
    }
  } catch (e) {
    alert('Erro de conexão. Tente novamente.');
    if (btn) { btn.disabled = false; btn.textContent = 'Ir para o Checkout →'; }
  }
}

// ─── VIDEO CAROUSEL ───────────────────────────────────────────────────────────
function goVideo(idx) {
  const videos = typeof SECTION_VIDEOS !== 'undefined' ? SECTION_VIDEOS : [];
  if (!videos.length) return;
  activeVideoIdx = idx;
  const iframe = document.getElementById('p-short-iframe');
  if (iframe) iframe.src = `https://www.youtube.com/embed/${videos[idx]}?rel=0&modestbranding=1&playsinline=1`;
  document.querySelectorAll('.p-short-dot').forEach((dot, i) => dot.classList.toggle('active', i === idx));
}

function prevVideo() {
  const videos = typeof SECTION_VIDEOS !== 'undefined' ? SECTION_VIDEOS : [];
  goVideo((activeVideoIdx - 1 + videos.length) % videos.length);
}

function nextVideo() {
  const videos = typeof SECTION_VIDEOS !== 'undefined' ? SECTION_VIDEOS : [];
  goVideo((activeVideoIdx + 1) % videos.length);
}

// ─── LIGHTBOX ─────────────────────────────────────────────────────────────────
function openLightbox(src) {
  const lb = document.getElementById('p-lightbox');
  const img = document.getElementById('p-lightbox-img');
  if (lb && img) { img.src = src; lb.style.display = 'flex'; document.body.style.overflow = 'hidden'; }
}

function closeLightbox() {
  const lb = document.getElementById('p-lightbox');
  if (lb) { lb.style.display = 'none'; document.body.style.overflow = ''; }
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function toggleMobileMenu() {
  document.getElementById('p-mobile-menu')?.classList.toggle('open');
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  initGrade();

  // Mobile vs desktop grade toggle
  function checkMobile() {
    const wasMobile = isMobileView;
    isMobileView = window.innerWidth <= 768;
    const desktopWrap = document.getElementById('p-grade-desktop-wrap');
    const mobileWrap = document.getElementById('p-grade-mobile-wrap');
    if (desktopWrap && mobileWrap) {
      desktopWrap.style.display = isMobileView ? 'none' : 'block';
      mobileWrap.style.display = isMobileView ? 'block' : 'none';
    }
    if (isMobileView !== wasMobile) renderOrder();
  }

  checkMobile();
  window.addEventListener('resize', checkMobile);
  renderOrder();

  // Nav scroll shadow
  window.addEventListener('scroll', () => {
    document.getElementById('p-nav')?.classList.toggle('scrolled', window.scrollY > 10);
  });

  // FAQ toggle icon
  document.querySelectorAll('.p-faq-item').forEach(item => {
    item.addEventListener('click', () => {
      const icon = item.querySelector('.p-faq-icon');
      if (icon) icon.textContent = item.classList.contains('open') ? '−' : '+';
    });
  });

  // ESC closes lightbox
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
});
