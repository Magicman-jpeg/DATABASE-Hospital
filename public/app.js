// =============================================================
//  MediCap dashboard — connected client logic (Fetch API)
// =============================================================
const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

function escapeHTML(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

const api = {
  async get(url)         { return handle(await fetch(url)); },
  async post(url, body)  { return handle(await fetch(url, { method: 'POST', headers: json(), body: JSON.stringify(body) })); },
  async patch(url, body) { return handle(await fetch(url, { method: 'PATCH', headers: json(), body: body ? JSON.stringify(body) : undefined })); },
};
const json = () => ({ 'Content-Type': 'application/json' });
async function handle(response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || `Request failed (${response.status})`);
  return data;
}

const filters = { department: '', type: '', status: '' };
let backgroundStale = false;

function statusStyle(status, beds, occupied = 0) {
  if (status === 'Maintenance') return { card: 'room-card--maintenance', badge: 'status-badge--maintenance', bar: 'gauge-fill--neutral', label: 'Maintenance', icon: 'ri-tools-line' };
  if (status === 'Full' || beds <= 0) return { card: 'room-card--full', badge: 'status-badge--full', bar: 'gauge-fill--red', label: 'Full', icon: 'ri-close-circle-line' };
  if (beds === 1 && occupied > 0) return { card: 'room-card--warning', badge: 'status-badge--warning', bar: 'gauge-fill--amber', label: 'Near full', icon: 'ri-alert-line' };
  return { card: 'room-card--available', badge: 'status-badge--available', bar: 'gauge-fill--green', label: 'Available', icon: 'ri-checkbox-circle-line' };
}

function renderStats(rooms) {
  const usableRooms = rooms.filter(room => room.status !== 'Maintenance');
  const usableBeds = usableRooms.reduce((sum, room) => sum + Number(room.max_capacity), 0);
  const occupied = usableRooms.reduce((sum, room) => sum + Number(room.current_occupancy), 0);
  const admittable = usableRooms.reduce((sum, room) => sum + Number(room.beds_available), 0);
  const fullRooms = usableRooms.filter(room => room.status === 'Full').length;
  const pct = usableBeds ? Math.round(occupied / usableBeds * 100) : 0;

  const tiles = [
    { label: 'Usable beds', value: usableBeds, tone: 'metric--blue' },
    { label: 'Occupied', value: occupied, tone: '' },
    { label: 'Admittable', value: admittable, tone: 'metric--green' },
    { label: 'Full rooms', value: fullRooms, tone: fullRooms ? 'metric--red' : '' },
  ];

  $('#stats').innerHTML = tiles.map((tile, index) => `
    <div class="metric ${tile.tone}">
      <div class="metric__top">
        <p class="metric__label">${tile.label}</p>
        <span class="metric__index">0${index + 1}</span>
      </div>
      <p class="metric__value">${tile.value}</p>
    </div>`).join('') + `
    <div class="occupancy-summary">
      <div class="occupancy-summary__meta"><span>Occupancy of usable beds</span><span>${pct}%</span></div>
      <div class="gauge-track" role="progressbar" aria-label="Occupancy of usable beds" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100">
        <div class="gauge-fill ${pct >= 100 ? 'gauge-fill--red' : pct >= 80 ? 'gauge-fill--amber' : 'gauge-fill--green'}" style="width:${pct}%"></div>
      </div>
    </div>`;
}

async function renderRooms() {
  const grid = $('#rooms');
  grid.setAttribute('aria-busy', 'true');
  try {
    const query = new URLSearchParams();
    if (filters.department) query.set('department', filters.department);
    if (filters.type) query.set('type', filters.type);
    if (filters.status) query.set('status', filters.status);

    const [rooms, admissions] = await Promise.all([
      api.get('/api/rooms?' + query.toString()),
      api.get('/api/admissions?active=true'),
    ]);
    const allRooms = filters.department || filters.type || filters.status
      ? await api.get('/api/rooms')
      : rooms;
    renderStats(allRooms);

    const byRoom = {};
    admissions.forEach(admission => (byRoom[admission.room_id] ||= []).push(admission));
    $('#rooms-empty').classList.toggle('hidden', rooms.length > 0);

    grid.innerHTML = rooms.map(room => {
      const beds = Number(room.beds_available);
      const occupied = Number(room.current_occupancy);
      const style = statusStyle(room.status, beds, occupied);
      const disabled = room.status === 'Full' || room.status === 'Maintenance' || beds <= 0;
      const patients = byRoom[room.room_id] || [];
      const roomNumber = escapeHTML(room.room_number);
      const roomType = escapeHTML(room.room_type);
      const department = escapeHTML(room.department_name);
      const occupancyPct = Number(room.occupancy_pct);

      return `
      <article class="room-card ${style.card}">
        <div class="room-card__header">
          <div>
            <h3 class="room-card__title">${roomNumber}</h3>
            <p class="room-card__meta">${roomType} · ${department}</p>
          </div>
          <span class="status-badge ${style.badge}"><i class="${style.icon}" aria-hidden="true"></i> ${style.label}</span>
        </div>
        <div class="capacity-line">
          <span class="capacity-count"><strong>${occupied}</strong> / ${Number(room.max_capacity)} beds</span>
          <span>${occupancyPct}% full</span>
        </div>
        <div class="gauge-track" role="progressbar" aria-valuenow="${occupancyPct}" aria-valuemin="0" aria-valuemax="100" aria-label="${roomNumber} occupancy">
          <div class="gauge-fill ${style.bar}" style="width:${occupancyPct}%"></div>
        </div>
        <p class="capacity-note">${room.status === 'Maintenance' ? 'Unavailable during maintenance' : `${beds} bed${beds === 1 ? '' : 's'} can accept patients`}</p>
        ${patients.length ? `
        <ul class="patient-list" aria-label="Active patients in ${roomNumber}">
          ${patients.map(patient => {
            const patientName = `${escapeHTML(patient.first_name)} ${escapeHTML(patient.last_name)}`;
            return `
            <li class="patient-row">
              <span><i class="ri-user-line" aria-hidden="true"></i> ${patientName}</span>
              <button data-discharge="${Number(patient.admission_id)}" aria-label="Discharge ${patientName} from ${roomNumber}" class="button button--quiet">Discharge</button>
            </li>`;
          }).join('')}
        </ul>` : `<p class="empty-note"><i class="ri-user-unfollow-line" aria-hidden="true"></i> No active patients</p>`}
        <button data-admit-room="${Number(room.room_id)}" ${disabled ? 'disabled' : ''} class="room-action">
          ${disabled ? (room.status === 'Maintenance' ? 'Under maintenance' : 'No beds available') : `Admit here · ${beds} open`}
        </button>
      </article>`;
    }).join('');
    backgroundStale = false;
  } finally {
    grid.setAttribute('aria-busy', 'false');
  }
}

// ---- Modal ----
const modal = $('#modal');
let returnFocus = null;
let isolatedElements = [];
let modalOpening = false;

function setBackgroundInert(enabled) {
  if (enabled) {
    if (isolatedElements.length) return;
    isolatedElements = [...document.body.children]
      .filter(element => element !== modal && element.tagName !== 'SCRIPT')
      .map(element => ({
        element,
        ariaHidden: element.getAttribute('aria-hidden'),
        inert: 'inert' in element ? element.inert : null,
      }));
    isolatedElements.forEach(({ element }) => {
      if ('inert' in element) element.inert = true;
      element.setAttribute('aria-hidden', 'true');
    });
  } else {
    isolatedElements.forEach(({ element, ariaHidden, inert }) => {
      if ('inert' in element && inert !== null) element.inert = inert;
      if (ariaHidden === null) element.removeAttribute('aria-hidden');
      else element.setAttribute('aria-hidden', ariaHidden);
    });
    isolatedElements = [];
  }
}

async function openModal(presetRoomId = '') {
  if (modalOpening || !modal.classList.contains('hidden')) return;
  modalOpening = true;
  returnFocus = document.activeElement;
  const admissionTriggers = $$('#admit-btn, [data-admit-room]:not([disabled])');
  admissionTriggers.forEach(trigger => { trigger.disabled = true; });

  try {
    const rooms = await api.get('/api/rooms?status=Available');
    const select = $('#room_id');
    select.innerHTML = '<option value="">Select a room…</option>' +
      rooms.map(room => `<option value="${Number(room.room_id)}">${escapeHTML(room.room_number)} — ${escapeHTML(room.room_type)} (${Number(room.beds_available)} open)</option>`).join('');
    $('#modal-error').textContent = '';
    $('#modal-error').classList.add('hidden');
    $('#admit-form').reset();
    if (presetRoomId) select.value = String(presetRoomId);
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    modal.setAttribute('aria-hidden', 'false');
    $('#first_name').focus();
    setBackgroundInert(true);
  } finally {
    modalOpening = false;
    admissionTriggers.forEach(trigger => {
      if (trigger.isConnected) trigger.disabled = false;
    });
  }
}

function closeModal(restoreFocus = true) {
  if (modal.classList.contains('hidden')) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  modal.setAttribute('aria-hidden', 'true');
  setBackgroundInert(false);
  if (restoreFocus && returnFocus?.isConnected) returnFocus.focus();
}

function handleModalKeys(event) {
  if (modal.classList.contains('hidden')) return;
  if (event.key === 'Escape') {
    event.preventDefault();
    closeModal();
    return;
  }
  if (event.key !== 'Tab') return;

  const focusable = $$('button:not([disabled]), input:not([disabled]), select:not([disabled]), a[href]', modal);
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (!first || !last) return;
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

// ---- Toast ----
function toast(message, kind = 'ok') {
  const element = $('#toast');
  element.setAttribute('role', kind === 'ok' ? 'status' : 'alert');
  element.textContent = message;
  element.className = 'fixed bottom-5 left-1/2 -translate-x-1/2 z-[60] px-5 py-3 text-sm font-medium';
  element.classList.remove('hidden');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => element.classList.add('hidden'), 2600);
}

async function loadDepartments() {
  const departments = await api.get('/api/departments');
  $('#f-department').innerHTML = '<option value="">All departments</option>' +
    departments.map(department => `<option value="${Number(department.department_id)}">${escapeHTML(department.department_name)}</option>`).join('');
}

async function refreshRooms({ announce = false, background = false } = {}) {
  try {
    await renderRooms();
    backgroundStale = false;
    if (announce) toast('Capacity refreshed');
    return true;
  } catch (error) {
    if (background) {
      if (!backgroundStale) toast('Automatic updates paused; showing the last loaded capacity', 'err');
      backgroundStale = true;
    } else {
      toast(error.message || 'Could not refresh capacity', 'err');
    }
    console.error(error);
    return false;
  }
}

// ---- Events ----
$('#admit-btn').addEventListener('click', async () => {
  try { await openModal(); }
  catch (error) { toast(error.message || 'Could not load available rooms', 'err'); }
});
$('#refresh-btn').addEventListener('click', async event => {
  const button = event.currentTarget;
  button.disabled = true;
  await refreshRooms({ announce: true });
  button.disabled = false;
});
$$('[data-close]').forEach(element => element.addEventListener('click', closeModal));
document.addEventListener('keydown', handleModalKeys);

$('#f-department').addEventListener('change', event => { filters.department = event.target.value; refreshRooms(); });
$('#f-type').addEventListener('change', event => { filters.type = event.target.value; refreshRooms(); });
$('#f-status').addEventListener('change', event => { filters.status = event.target.value; refreshRooms(); });
$('#f-clear').addEventListener('click', () => {
  filters.department = filters.type = filters.status = '';
  $('#f-department').value = '';
  $('#f-type').value = '';
  $('#f-status').value = '';
  refreshRooms();
  $('#f-department').focus();
});

$('#rooms').addEventListener('click', async event => {
  const dischargeButton = event.target.closest('[data-discharge]');
  const admitButton = event.target.closest('[data-admit-room]');

  if (admitButton && !admitButton.disabled) {
    try { await openModal(admitButton.dataset.admitRoom); }
    catch (error) { toast(error.message || 'Could not load available rooms', 'err'); }
    return;
  }
  if (!dischargeButton) return;

  dischargeButton.disabled = true;
  try {
    await api.patch(`/api/admissions/${dischargeButton.dataset.discharge}/discharge`);
  } catch (error) {
    dischargeButton.disabled = false;
    toast(error.message, 'err');
    return;
  }

  toast('Patient discharged');
  try {
    await renderRooms();
  } catch (error) {
    toast('Patient discharged; capacity refresh failed', 'err');
    console.error(error);
  }
});

$('#admit-form').addEventListener('submit', async event => {
  event.preventDefault();
  const submitButton = $('button[type="submit"]', event.currentTarget);
  submitButton.disabled = true;
  const body = {
    first_name: $('#first_name').value,
    last_name: $('#last_name').value,
    contact_number: $('#contact_number').value,
    room_id: $('#room_id').value,
  };

  try {
    await api.post('/api/admissions', body);
  } catch (error) {
    const errorMessage = $('#modal-error');
    errorMessage.textContent = error.message;
    errorMessage.classList.remove('hidden');
    submitButton.disabled = false;
    return;
  }

  closeModal(false);
  toast('Patient admitted');
  try {
    await renderRooms();
  } catch (error) {
    toast('Patient admitted; capacity refresh failed', 'err');
    console.error(error);
  } finally {
    submitButton.disabled = false;
    $('#admit-btn').focus();
  }
});

(async function init() {
  try {
    await loadDepartments();
    await renderRooms();
  } catch (error) {
    toast('Cannot reach API — check the server and database connection', 'err');
    console.error(error);
  }
})();

setInterval(() => {
  if (!document.hidden) refreshRooms({ background: true });
}, 15000);
