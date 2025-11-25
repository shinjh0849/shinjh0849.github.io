---
title: "Gallery"
permalink: /gallery/
layout: single
author_profile: true
excerpt: "Photos pulled from my previous site."
---

{% assign gallery_items = site.data.gallery %}

<div class="home-gallery">
{% for item in gallery_items %}
    <figure>
      <a class="gallery-link" href="{{ '/gallery/' | relative_url }}" data-src="{{ item.image }}" data-title="{{ item.title }}" data-idx="{{ forloop.index0 }}">
        <img src="{{ item.image }}" alt="{{ item.title }}">
      </a>
      <figcaption>{{ item.title }}</figcaption>
    </figure>
  {% endfor %}
</div>

<div class="lightbox-modal" id="gallery-modal" aria-hidden="true">
  <div class="lightbox-backdrop"></div>
  <div class="lightbox-inner">
    <button class="lightbox-arrow prev" aria-label="Previous image">‹</button>
    <button class="lightbox-arrow next" aria-label="Next image">›</button>
    <button class="lightbox-close" aria-label="Close">×</button>
    <img id="lightbox-image" alt="">
    <div class="lightbox-caption" id="lightbox-caption"></div>
  </div>
</div>

<script>
  (function() {
    const modal = document.getElementById('gallery-modal');
    const imgEl = document.getElementById('lightbox-image');
    const captionEl = document.getElementById('lightbox-caption');
    const closeBtn = modal.querySelector('.lightbox-close');
    const prevBtn = modal.querySelector('.lightbox-arrow.prev');
    const nextBtn = modal.querySelector('.lightbox-arrow.next');
    const links = document.querySelectorAll('.gallery-link');
    const baseUrl = "{{ '/gallery/' | relative_url }}";
    const items = Array.from(links).map((link, idx) => ({
      src: link.dataset.src || link.href,
      title: link.dataset.title || '',
      idx,
    }));
    let current = 0;

    function render(idx) {
      const item = items[idx];
      current = idx;
      imgEl.src = item.src;
      imgEl.alt = item.title || '';
      captionEl.textContent = item.title || '';
    }

    function open(idx) {
      render(idx);
      modal.setAttribute('aria-hidden', 'false');
      modal.classList.add('is-open');
      document.body.classList.add('lightbox-open');
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, '', baseUrl);
      }
    }

    function close() {
      modal.setAttribute('aria-hidden', 'true');
      modal.classList.remove('is-open');
      document.body.classList.remove('lightbox-open');
      imgEl.src = '';
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, '', baseUrl);
      }
    }

    links.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const idx = parseInt(link.getAttribute('data-idx'), 10) || 0;
        open(idx);
      });
    });

    closeBtn.addEventListener('click', close);
    modal.addEventListener('click', e => {
      if (e.target === modal || e.target.classList.contains('lightbox-backdrop')) close();
    });
    document.addEventListener('keyup', e => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prevBtn.click();
      if (e.key === 'ArrowRight') nextBtn.click();
    });
    prevBtn.addEventListener('click', e => {
      e.stopPropagation();
      const idx = (current - 1 + items.length) % items.length;
      render(idx);
    });
    nextBtn.addEventListener('click', e => {
      e.stopPropagation();
      const idx = (current + 1) % items.length;
      render(idx);
    });
  })();
</script>
