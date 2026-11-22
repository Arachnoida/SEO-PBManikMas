/**
 * GOR Bulu Tangkis P. B. Manik Mas - Modular Vanilla JavaScript
 * Handles Mobile Menu, Gallery Filter & Lightbox, Flat-Rate (Rp30.000/jam) Calculator,
 * WhatsApp Draft Generator, Community Share, FAQ Accordion, and KPI Telemetry Demo.
 */
(() => {
  'use strict';

  const CONFIG = {
    waNumber: '62895701609699',
    gorName: 'GOR Bulu Tangkis P. B. Manik Mas',
    address: 'Jl. Tulip Gg. III No. 2, Sumerta Kaja, Kec. Denpasar Timur, Kota Denpasar, Bali 80236',
    mapsUrl: 'https://maps.app.goo.gl/f3XtGzDtJFnp3AXQ9',
    siteUrl: 'https://kinkareem.github.io/SEO-PBManikMas/',
    ratePerHour: 30000,
    storageKey: 'pbmanikmas_telemetry_v1',
    sessionKey: 'pbmanikmas_session_active'
  };

  const formatRupiah = (amount) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);

  const nowTimeLabel = () => {
    const d = new Date();
    return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  /* ------------------------------------------------------------------------
     Toast Notification Helper
     ------------------------------------------------------------------------ */
  const toastEl = document.getElementById('toast');
  let toastTimer = null;

  function showToast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.hidden = true;
    }, 3000);
  }

  /* ------------------------------------------------------------------------
     KPI & GA4 Telemetry Service (Interactive Demo Panel)
     ------------------------------------------------------------------------ */
  const Telemetry = (() => {
    const defaultState = () => ({
      sessions: 1,
      waClicks: 0,
      sources: {},
      events: []
    });

    function loadState() {
      try {
        const raw = localStorage.getItem(CONFIG.storageKey);
        if (!raw) return defaultState();
        const parsed = JSON.parse(raw);
        return {
          sessions: Number(parsed.sessions) || 1,
          waClicks: Number(parsed.waClicks) || 0,
          sources: parsed.sources && typeof parsed.sources === 'object' ? parsed.sources : {},
          events: Array.isArray(parsed.events) ? parsed.events : []
        };
      } catch {
        return defaultState();
      }
    }

    let state = loadState();

    function saveState() {
      try {
        localStorage.setItem(CONFIG.storageKey, JSON.stringify(state));
      } catch {
        /* Ignore storage errors */
      }
    }

    // Event demo/simulasi tidak dikirim ke GA4 asli agar data tidak tercemar.
    // page_view asli sudah dikirim otomatis oleh gtag('config').
    const GA_SKIP_EVENTS = new Set(['page_view', 'demo_reset']);

    function pushEvent(eventName, params = {}) {
      if (typeof window.gtag === 'function' && !GA_SKIP_EVENTS.has(eventName)) {
        try {
          window.gtag('event', eventName, params);
        } catch {
          /* Safe no-op if GA blocked */
        }
      }

      const detail = Object.entries(params)
        .map(([k, v]) => `${k}=${v}`)
        .join(', ');

      state.events.unshift({
        time: nowTimeLabel(),
        name: eventName,
        detail: detail || 'interaction'
      });
      if (state.events.length > 25) {
        state.events.length = 25;
      }
      saveState();
      render();
    }

    function recordWaClick(source) {
      state.waClicks += 1;
      state.sources[source] = (state.sources[source] || 0) + 1;
      saveState();
      pushEvent('click_whatsapp_cp', { cta_source: source, total_clicks: state.waClicks });
    }

    function startSessionIfNew(forceIncrement = false) {
      const alreadyActive = sessionStorage.getItem(CONFIG.sessionKey);
      if (!alreadyActive || forceIncrement) {
        if (alreadyActive && forceIncrement) {
          state.sessions += 1;
        } else if (!alreadyActive) {
          sessionStorage.setItem(CONFIG.sessionKey, '1');
          if (state.events.length > 0) {
            state.sessions += 1;
          }
        }
        saveState();
        pushEvent('page_view', { page_title: document.title.slice(0, 40), session_no: state.sessions });
      } else {
        render();
      }
    }

    function resetDemo() {
      state = defaultState();
      sessionStorage.setItem(CONFIG.sessionKey, '1');
      saveState();
      pushEvent('demo_reset', { status: 'initialized' });
      showToast('Data Telemetry Demo berhasil di-reset.');
    }

    function render() {
      const sessionsEl = document.getElementById('kpi-sessions');
      const clicksEl = document.getElementById('kpi-wa-clicks');
      const ctrEl = document.getElementById('kpi-ctr');
      const logEl = document.getElementById('telemetry-log');

      if (sessionsEl) sessionsEl.textContent = String(state.sessions);
      if (clicksEl) clicksEl.textContent = String(state.waClicks);
      if (ctrEl) {
        const ctr = state.sessions > 0 ? ((state.waClicks / state.sessions) * 100).toFixed(1) : '0.0';
        ctrEl.textContent = `${ctr}%`;
      }

      if (logEl) {
        logEl.innerHTML = '';
        if (state.events.length === 0) {
          const empty = document.createElement('div');
          empty.className = 'telemetry-log__item';
          empty.textContent = 'Belum ada event tercatat.';
          logEl.appendChild(empty);
        } else {
          state.events.forEach((ev) => {
            const row = document.createElement('div');
            row.className = 'telemetry-log__item';
            const timeSpan = document.createElement('span');
            timeSpan.textContent = `[${ev.time}] `;
            const nameStrong = document.createElement('strong');
            nameStrong.textContent = ev.name;
            const detailSpan = document.createElement('span');
            detailSpan.textContent = ` — ${ev.detail}`;
            row.append(timeSpan, nameStrong, detailSpan);
            logEl.appendChild(row);
          });
        }
      }
    }

    function init() {
      const toggleBtn = document.getElementById('telemetry-toggle');
      const closeBtn = document.getElementById('telemetry-close');
      const drawer = document.getElementById('telemetry-drawer');
      const simSessionBtn = document.getElementById('telemetry-sim-session');
      const resetBtn = document.getElementById('telemetry-reset');

      const setDrawerOpen = (open) => {
        if (!drawer || !toggleBtn) return;
        drawer.hidden = !open;
        toggleBtn.setAttribute('aria-expanded', String(open));
      };

      toggleBtn?.addEventListener('click', () => setDrawerOpen(drawer?.hidden ?? false));
      closeBtn?.addEventListener('click', () => setDrawerOpen(false));
      simSessionBtn?.addEventListener('click', () => {
        startSessionIfNew(true);
        showToast('Simulasi sesi baru ditambahkan.');
      });
      resetBtn?.addEventListener('click', resetDemo);

      document.querySelectorAll('[data-wa-source]').forEach((el) => {
        el.addEventListener('click', () => {
          const source = el.getAttribute('data-wa-source') || 'unknown';
          recordWaClick(source);
        });
      });

      startSessionIfNew(false);
    }

    return { init, pushEvent, recordWaClick };
  })();

  /* ------------------------------------------------------------------------
     Mobile Navigation
     ------------------------------------------------------------------------ */
  function initMobileMenu() {
    const btn = document.getElementById('hamburger-btn');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;

    const toggle = (force) => {
      const isOpen = typeof force === 'boolean' ? force : menu.hidden;
      menu.hidden = !isOpen;
      btn.setAttribute('aria-expanded', String(isOpen));
    };

    btn.addEventListener('click', () => toggle());
    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => toggle(false));
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !menu.hidden) {
        toggle(false);
        btn.focus();
      }
    });
  }

  /* ------------------------------------------------------------------------
     Gallery Filter & Lightbox Modal
     ------------------------------------------------------------------------ */
  function initGallery() {
    const filterButtons = Array.from(document.querySelectorAll('.filter-btn'));
    const cards = Array.from(document.querySelectorAll('.gallery-card'));
    const lightbox = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightbox-img');
    const lbCaption = document.getElementById('lightbox-caption');
    const lbClose = document.getElementById('lightbox-close');
    const lbPrev = document.getElementById('lightbox-prev');
    const lbNext = document.getElementById('lightbox-next');

    let currentIndex = 0;

    const visibleCards = () => cards.filter((card) => !card.hidden);

    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter || 'all';
        filterButtons.forEach((b) => {
          const active = b === btn;
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-pressed', String(active));
        });

        cards.forEach((card) => {
          const cat = card.dataset.category;
          card.hidden = filter !== 'all' && cat !== filter;
        });

        Telemetry.pushEvent('filter_gallery', { category: filter });
      });
    });

    function showLightboxAt(index) {
      const list = visibleCards();
      if (!lightbox || !lbImg || !lbCaption || list.length === 0) return;
      currentIndex = (index + list.length) % list.length;
      const card = list[currentIndex];
      lbImg.src = card.dataset.fullSrc || card.querySelector('img')?.src || '';
      lbImg.alt = card.querySelector('img')?.alt || '';
      lbCaption.textContent = card.dataset.caption || '';
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
      Telemetry.pushEvent('open_lightbox', { photo: (card.dataset.caption || '').slice(0, 32) });
    }

    function closeLightbox() {
      if (!lightbox) return;
      lightbox.hidden = true;
      document.body.style.overflow = '';
    }

    cards.forEach((card) => {
      card.addEventListener('click', () => {
        const list = visibleCards();
        const idx = list.indexOf(card);
        showLightboxAt(idx >= 0 ? idx : 0);
      });
    });

    lbClose?.addEventListener('click', closeLightbox);
    lbPrev?.addEventListener('click', () => showLightboxAt(currentIndex - 1));
    lbNext?.addEventListener('click', () => showLightboxAt(currentIndex + 1));
    lightbox?.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox || lightbox.hidden) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showLightboxAt(currentIndex - 1);
      if (e.key === 'ArrowRight') showLightboxAt(currentIndex + 1);
    });
  }

  /* ------------------------------------------------------------------------
     Kalkulator Sewa Flat Rp30.000/Jam & Generator Pesan WhatsApp Otomatis
     ------------------------------------------------------------------------ */
  function initCalculator() {
    const courtsEl = document.getElementById('calc-courts');
    const hoursEl = document.getElementById('calc-hours');
    const dateEl = document.getElementById('calc-date');
    const timeEl = document.getElementById('calc-time');
    const nameEl = document.getElementById('calc-name');

    const totalEl = document.getElementById('calc-total');
    const metaEl = document.getElementById('calc-meta');
    const previewEl = document.getElementById('calc-wa-preview');
    const waBtn = document.getElementById('calc-wa-btn');
    const copyBtn = document.getElementById('calc-copy-btn');
    const slotHintEl = document.getElementById('calc-slot-hint');

    if (!courtsEl || !hoursEl || !dateEl || !timeEl || !nameEl) return;

    // Batasi tanggal minimal ke hari ini
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    dateEl.min = todayStr;

    const tomorrow = new Date(Date.now() + 86400000);
    const tomorrowStr = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, '0')}-${String(tomorrow.getDate()).padStart(2, '0')}`;
    dateEl.value = tomorrowStr;

    let calcTrackTimeout = null;

    // Sinkronkan opsi jam mulai agar tidak melebihi jam tutup GOR (23.00 WITA)
    function refreshStartTimeOptions() {
      const hours = Math.max(1, Math.min(8, Number(hoursEl.value) || 2));
      const maxStartHour = 23 - hours;
      let currentVal = Number(timeEl.value) || 19;

      timeEl.innerHTML = '';
      for (let h = 7; h <= 22; h++) {
        const opt = document.createElement('option');
        opt.value = String(h);
        const hourPad = String(h).padStart(2, '0');

        if (h > maxStartHour) {
          opt.disabled = true;
          opt.textContent = `${hourPad}.00 WITA — Tutup (Max main s/d 23.00 WITA)`;
        } else {
          opt.textContent = `${hourPad}.00 WITA`;
        }
        timeEl.appendChild(opt);
      }

      if (currentVal > maxStartHour) {
        currentVal = maxStartHour;
      }
      if (currentVal < 7) {
        currentVal = 7;
      }
      timeEl.value = String(currentVal);
    }

    function updateCalculator(logEvent = false) {
      const courts = Math.max(1, Math.min(2, Number(courtsEl.value) || 1));
      const hours = Math.max(1, Math.min(8, Number(hoursEl.value) || 2));
      const maxStartHour = 23 - hours;

      let startHour = Number(timeEl.value) || 19;
      if (startHour > maxStartHour) {
        startHour = maxStartHour;
        timeEl.value = String(startHour);
      }
      const endHour = startHour + hours;

      const estimatedTotal = courts * hours * CONFIG.ratePerHour;

      let dateFormatted = 'Menyusul';
      if (dateEl.value) {
        const parts = dateEl.value.split('-').map(Number);
        if (parts.length === 3) {
          const d = new Date(parts[0], parts[1] - 1, parts[2]);
          dateFormatted = d.toLocaleDateString('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          });
        }
      }

      const startFormatted = `${String(startHour).padStart(2, '0')}.00`;
      const endFormatted = `${String(endHour).padStart(2, '0')}.00 WITA`;
      const timeSlotFull = `${startFormatted} – ${endFormatted}`;

      if (slotHintEl) {
        slotHintEl.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <span>Selesai: <strong>${endFormatted}</strong> (Slot: ${timeSlotFull})</span>
        `;
      }

      const bookerName = nameEl.value.trim() || 'Pemain / Tim';

      if (totalEl) totalEl.textContent = formatRupiah(estimatedTotal);
      if (metaEl) {
        metaEl.textContent = `${courts} Lapangan × ${hours} Jam × Rp30.000/jam`;
      }

      const waMessage = [
        `Halo Admin ${CONFIG.gorName}, saya mau cek slot lapangan:`,
        `• Nama: ${bookerName}`,
        `• Tanggal: ${dateFormatted}`,
        `• Jam Main: ${timeSlotFull} (Durasi: ${hours} Jam)`,
        `• Jumlah: ${courts} Lapangan`,
        `• Total Biaya: ${formatRupiah(estimatedTotal)} (Rp30.000/jam)`,
        '',
        'Apakah jadwal tersebut masih kosong, Admin? Terima kasih.'
      ].join('\n');

      if (previewEl) previewEl.textContent = waMessage;
      if (waBtn) {
        waBtn.href = `https://wa.me/${CONFIG.waNumber}?text=${encodeURIComponent(waMessage)}`;
      }

      if (logEvent) {
        clearTimeout(calcTrackTimeout);
        calcTrackTimeout = setTimeout(() => {
          Telemetry.pushEvent('calculate_booking', {
            courts,
            hours,
            slot: timeSlotFull,
            estimate_idr: estimatedTotal
          });
        }, 450);
      }
    }

    refreshStartTimeOptions();
    updateCalculator(false);

    hoursEl.addEventListener('change', () => {
      refreshStartTimeOptions();
      updateCalculator(true);
    });

    [courtsEl, dateEl, timeEl, nameEl].forEach((input) => {
      input.addEventListener('input', () => updateCalculator(true));
      input.addEventListener('change', () => updateCalculator(true));
    });

    copyBtn?.addEventListener('click', async () => {
      const text = previewEl?.textContent || '';
      try {
        await navigator.clipboard.writeText(text);
        showToast('Pesan WhatsApp berhasil disalin!');
        Telemetry.pushEvent('copy_wa_draft', { rate: CONFIG.ratePerHour });
      } catch {
        showToast('Silakan salin teks pesan secara manual.');
      }
    });
  }

  /* ------------------------------------------------------------------------
     Share Lokasi ke Grup WA
     ------------------------------------------------------------------------ */
  function initShareMabar() {
    const shareBtn = document.getElementById('share-mabar-btn');
    const copyLocBtn = document.getElementById('copy-mabar-btn');

    const inviteMessage = [
      `Yuk mabar bulu tangkis di *${CONFIG.gorName}*!`,
      `Sewa cuma Rp30.000/jam, lapangan karpet vinyl & lampu anti-silau.`,
      `Lokasi: ${CONFIG.address}`,
      `Google Maps: ${CONFIG.mapsUrl}`,
      `Info & Booking: ${CONFIG.siteUrl}`
    ].join('\n');

    if (shareBtn) {
      shareBtn.href = `https://wa.me/?text=${encodeURIComponent(inviteMessage)}`;
    }

    copyLocBtn?.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(inviteMessage);
        showToast('Undangan mabar & link Maps berhasil disalin!');
        Telemetry.pushEvent('copy_location_invite', { channel: 'clipboard' });
      } catch {
        showToast('Gunakan tombol Bagikan ke Grup WA.');
      }
    });
  }

  /* ------------------------------------------------------------------------
     FAQ Accordion
     ------------------------------------------------------------------------ */
  function initFaq() {
    const triggers = Array.from(document.querySelectorAll('.faq-trigger'));
    triggers.forEach((btn) => {
      btn.addEventListener('click', () => {
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        const panelId = btn.getAttribute('aria-controls');
        const panel = panelId ? document.getElementById(panelId) : null;
        if (!panel) return;

        btn.setAttribute('aria-expanded', String(!expanded));
        panel.hidden = expanded;

        if (!expanded) {
          Telemetry.pushEvent('toggle_faq', { question: btn.textContent.trim().slice(0, 38) });
        }
      });
    });
  }

  /* ------------------------------------------------------------------------
     Section View Telemetry (Pricing Impression)
     ------------------------------------------------------------------------ */
  function initSectionObserver() {
    const pricingSection = document.getElementById('harga');
    if (!pricingSection || !('IntersectionObserver' in window)) return;

    let tracked = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !tracked) {
            tracked = true;
            Telemetry.pushEvent('view_pricing', { rate_idr: CONFIG.ratePerHour });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(pricingSection);
  }

  /* ------------------------------------------------------------------------
     Bootstrap
     ------------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', () => {
    Telemetry.init();
    initMobileMenu();
    initGallery();
    initCalculator();
    initShareMabar();
    initFaq();
    initSectionObserver();
  });
})();