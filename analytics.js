(function () {
  const STORAGE_KEY = 'powerpumpAnalyticsEvents';
  const VISITOR_KEY = 'powerpumpVisitorId';
  const SESSION_KEY = 'powerpumpSessionId';
  const SESSION_STARTED_KEY = 'powerpumpSessionStartedAt';
  const MAX_EVENTS = 5000;

  const now = () => new Date().toISOString();
  const uid = (prefix) => `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;

  const getOrCreate = (key, prefix) => {
    let value = localStorage.getItem(key);
    if (!value) {
      value = uid(prefix);
      localStorage.setItem(key, value);
    }
    return value;
  };

  const visitorId = getOrCreate(VISITOR_KEY, 'visitor');
  const sessionStartedAt = Number(sessionStorage.getItem(SESSION_STARTED_KEY) || 0);
  if (!sessionStartedAt || Date.now() - sessionStartedAt > 30 * 60 * 1000) {
    sessionStorage.setItem(SESSION_KEY, uid('session'));
    sessionStorage.setItem(SESSION_STARTED_KEY, String(Date.now()));
  }
  const sessionId = sessionStorage.getItem(SESSION_KEY) || uid('session');
  sessionStorage.setItem(SESSION_KEY, sessionId);

  const readEvents = () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch (_) {
      return [];
    }
  };

  const writeEvents = (events) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events.slice(-MAX_EVENTS)));
  };

  const sendToEndpoint = (event) => {
    const endpoint =
      window.POWERPUMP_ANALYTICS_ENDPOINT ||
      document.querySelector('meta[name="powerpump-analytics-endpoint"]')?.content ||
      '';

    if (!endpoint) return;

    const payload = JSON.stringify(event);
    if (navigator.sendBeacon) {
      navigator.sendBeacon(endpoint, new Blob([payload], { type: 'application/json' }));
      return;
    }

    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      keepalive: true
    }).catch(() => {});
  };

  const track = (type, data = {}) => {
    const event = {
      id: uid('event'),
      type,
      path: location.pathname,
      title: document.title,
      referrer: document.referrer || '',
      visitorId,
      sessionId,
      createdAt: now(),
      data
    };

    const events = readEvents();
    events.push(event);
    writeEvents(events);
    sendToEndpoint(event);
  };

  window.powerpumpAnalytics = {
    track,
    readEvents,
    clearLocalEvents: () => localStorage.removeItem(STORAGE_KEY)
  };

  const isAdminPage = location.pathname.endsWith('/admin.html');

  if (!isAdminPage) {
    track('page_view');
  }

  document.addEventListener('click', (event) => {
    if (isAdminPage) return;

    const link = event.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href') || '';
    const label = link.textContent.trim().replace(/\s+/g, ' ').slice(0, 80);

    if (href.startsWith('tel:')) {
      track('phone_click', { href, label });
    } else if (href.includes('membership.html')) {
      track('membership_click', { href, label });
    } else if (href.includes('blog.naver.com')) {
      track('naver_blog_click', { href, label });
    } else if (href.includes('map.naver.com') || href.includes('search.naver.com')) {
      track('naver_place_click', { href, label });
    }
  });
})();
