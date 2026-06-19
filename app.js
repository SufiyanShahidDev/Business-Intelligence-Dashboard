
// Sidebar Elements

const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');


// Toggle Elements

const menuToggle = document.getElementById('menuToggle');

const menuIcon = document.getElementById('menuIcon');

let themeToggle = document.getElementById("themeToggle");

let themeToggleSide = document.getElementById("themeToggleSide");


// local atorage fees

const storageKey = "Teyzix-dashboard-data";
const themeKey = "Teyzix-theme";
const uiKey = "Teyzix-ui";


// dummy data is stored locally so the dashboard works without any API.
const seedData = {
    kpis: {
        totalRevenue: 284560,
        totalCustomers: 12840,
        totalOrders: 4680,
        monthlyGrowth: 18.4,
        conversionRate: 6.8,
        operationalIndex: 91
    },
    revenueMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    revenueValues: [44, 52, 48, 61, 69, 73, 70, 78, 83, 79, 88, 94],
    salesTeams: [
        { label: 'North Team', value: 86 },
        { label: 'South Team', value: 74 },
        { label: 'East Team', value: 91 },
        { label: 'West Team', value: 67 }
    ],
    customerGrowth: [12, 18, 21, 25, 31, 38, 42, 50, 57, 63, 71, 78],
    categories: [
        { name: 'Enterprise', value: 28, color: '#2563eb' },
        { name: 'Retail', value: 22, color: '#16a34a' },
        { name: 'Wholesale', value: 22, color: '#f59e0b' },
        { name: 'Services', value: 28, color: '#ef4444' }
    ],
    customers: [
        { name: 'Apex Holdings', revenue: 24500, orders: 42, status: 'Active', region: 'North' },
        { name: 'Nova Retail', revenue: 18900, orders: 31, status: 'Pending', region: 'East' },
        { name: 'BluePeak Ltd', revenue: 32100, orders: 56, status: 'Active', region: 'South' },
        { name: 'Metro Supply', revenue: 15120, orders: 24, status: 'Churned', region: 'West' },
        { name: 'Prime Source', revenue: 27800, orders: 47, status: 'Active', region: 'North' },
        { name: 'Urban Flow', revenue: 13200, orders: 19, status: 'Pending', region: 'West' },
        { name: 'Crestline Group', revenue: 35350, orders: 61, status: 'Active', region: 'East' },
        { name: 'Vertex Market', revenue: 17450, orders: 29, status: 'Churned', region: 'South' },
        { name: 'Summit Pro', revenue: 21600, orders: 36, status: 'Active', region: 'North' },
        { name: 'Orbit Partners', revenue: 29100, orders: 53, status: 'Pending', region: 'East' },
        { name: 'Legacy Traders', revenue: 12600, orders: 17, status: 'Active', region: 'West' },
        { name: 'Pulse Commerce', revenue: 19800, orders: 28, status: 'Churned', region: 'South' }
    ]
};

if (!localStorage.getItem(storageKey)) {
    localStorage.setItem(storageKey, JSON.stringify(seedData));
}

// fetching data from local storage

function getDashboardData() {
    return JSON.parse(localStorage.getItem(storageKey));
}

let dashboardData = getDashboardData();


// Theme Management

function applyTheme(theme) {

    if (theme === 'dark') {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark')
    }
    localStorage.setItem(themeKey, theme);
}

const savedTheme = localStorage.getItem(themeKey) || 'light';
applyTheme(savedTheme);


function toggleTheme() {
    const isDark = document.body.classList.contains('dark');
    applyTheme(isDark ? 'light' : 'dark');
}

themeToggle.addEventListener('click', toggleTheme);

themeToggleSide.addEventListener('click', toggleTheme);

function openSidebar() {
    sidebar.classList.add('show');
    sidebarOverlay.classList.add('show');
    menuIcon.className = 'fa-solid fa-xmark';
}

function closeSidebar() {
    sidebar.classList.remove('show');
    sidebarOverlay.classList.remove('show');
    menuIcon.className = 'fa-solid fa-bars';
}

menuToggle.addEventListener('click', function () {
    if (sidebar.classList.contains('show')) {
        closeSidebar();
    } else {
        openSidebar();
    }
});

sidebarOverlay.addEventListener('click', closeSidebar);

const sidebarLinks = document.querySelectorAll('.sidebar .nav-link-custom');
for (let i = 0; i < sidebarLinks.length; i++) {
    sidebarLinks[i].addEventListener('click', function () {
        if (window.innerWidth < 992) closeSidebar();
    });
}

// KPI Data Rendering

function formatCurrency(value) {
    return '$' + value.toLocaleString();
}

function renderKpis() {
    document.getElementById('totalRevenue').textContent = formatCurrency(dashboardData.kpis.totalRevenue);
    document.getElementById('totalCustomers').textContent = dashboardData.kpis.totalCustomers.toLocaleString();
    document.getElementById('totalOrders').textContent = dashboardData.kpis.totalOrders.toLocaleString();
    document.getElementById('monthlyGrowth').textContent = dashboardData.kpis.monthlyGrowth.toFixed(1) + '%';
    document.getElementById('conversionRate').textContent = dashboardData.kpis.conversionRate.toFixed(1) + '%';
    document.getElementById('operationalIndex').textContent = dashboardData.kpis.operationalIndex.toFixed(0) + '%';

    document.getElementById('revenueChange').textContent = '14.2%';
    document.getElementById('customerChange').textContent = '12.8%';
    document.getElementById('ordersChange').textContent = '8.5%';
}

// Chart Rendering

function renderRevenueChart() {
    const chart = document.getElementById('revenueChart');
    chart.innerHTML = '';

    const values = dashboardData.revenueValues;
    const maxValue = Math.max.apply(null, values);

    for (let i = 0; i < values.length; i++) {
        const wrap = document.createElement('div');
        wrap.className = 'bar-wrap';

        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = ((values[i] / maxValue) * 100) + '%';
        bar.title = dashboardData.revenueMonths[i] + ': ' + values[i] + '%';

        const label = document.createElement('div');
        label.className = 'bar-label';
        label.textContent = dashboardData.revenueMonths[i];

        wrap.appendChild(bar);
        wrap.appendChild(label);
        chart.appendChild(wrap);
    }
}

function renderSalesChart() {
    const chart = document.getElementById('salesChart');
    chart.innerHTML = '';

    for (let i = 0; i < dashboardData.salesTeams.length; i++) {
        const row = document.createElement('div');
        row.className = 'compare-row';

        const label = document.createElement('div');
        label.textContent = dashboardData.salesTeams[i].label;

        const track = document.createElement('div');
        track.className = 'compare-track';

        const fill = document.createElement('div');
        fill.className = 'compare-fill';
        fill.style.width = dashboardData.salesTeams[i].value + '%';

        const value = document.createElement('div');
        value.textContent = dashboardData.salesTeams[i].value + '%';

        track.appendChild(fill);
        row.appendChild(label);
        row.appendChild(track);
        row.appendChild(value);
        chart.appendChild(row);
    }
}

function renderCustomerChart() {
    const chart = document.getElementById('customerChart');
    chart.innerHTML = '';

    const values = dashboardData.customerGrowth;
    const maxValue = Math.max.apply(null, values);
    const width = chart.clientWidth || 500;
    const height = 230;

    // Create point elements first.
    const points = [];
    for (let i = 0; i < values.length; i++) {
        const x = 20 + (i * ((width - 40) / (values.length - 1)));
        const y = height - 25 - ((values[i] / maxValue) * 170);
        points.push({ x: x, y: y });
    }

    // Draw the line segments using divs.
    for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const length = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;

        const segment = document.createElement('div');
        segment.className = 'line-link';
        segment.style.left = p1.x + 'px';
        segment.style.top = p1.y + 'px';
        segment.style.width = length + 'px';
        segment.style.transform = 'rotate(' + angle + 'deg)';
        chart.appendChild(segment);
    }

    for (let i = 0; i < points.length; i++) {
        const point = document.createElement('div');
        point.className = 'line-point';
        point.style.left = points[i].x + 'px';
        point.style.top = points[i].y + 'px';
        point.title = dashboardData.revenueMonths[i] + ': ' + values[i] + '%';
        chart.appendChild(point);
    }
}

function renderCategoryChart() {
    const legend = document.getElementById('categoryLegend');
    legend.innerHTML = '';

    const categories = dashboardData.categories;
    let total = 0;
    for (let i = 0; i < categories.length; i++) total += categories[i].value;

    document.getElementById('categoryCenterValue').textContent = total + '%';

    for (let i = 0; i < categories.length; i++) {
        const item = document.createElement('div');
        item.className = 'legend-item';

        const left = document.createElement('div');
        left.className = 'legend-left';

        const dot = document.createElement('span');
        dot.className = 'legend-dot';
        dot.style.background = categories[i].color;

        const text = document.createElement('span');
        text.textContent = categories[i].name;

        const val = document.createElement('strong');
        val.textContent = categories[i].value + '%';

        left.appendChild(dot);
        left.appendChild(text);
        item.appendChild(left);
        item.appendChild(val);
        legend.appendChild(item);
    }
}

// Table Logic: search, filter, sort, pagination

const tableBody = document.getElementById('customerTableBody');
const searchInput = document.getElementById('searchInput');
const statusFilter = document.getElementById('statusFilter');
const regionFilter = document.getElementById('regionFilter');
const tableInfo = document.getElementById('tableInfo');
const pageText = document.getElementById('pageText');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');

let currentPage = 1;
let rowsPerPage = 5;
let sortKey = 'name';
let sortAsc = true;

function getFilteredRows() {
    const query = searchInput.value.toLowerCase().trim();
    const status = statusFilter.value;
    const region = regionFilter.value;

    let filtered = dashboardData.customers.filter(function (item) {
        const matchesQuery = item.name.toLowerCase().includes(query) || item.region.toLowerCase().includes(query) || item.status.toLowerCase().includes(query);
        const matchesStatus = status === 'all' || item.status === status;
        const matchesRegion = region === 'all' || item.region === region;
        return matchesQuery && matchesStatus && matchesRegion;
    });

    filtered.sort(function (a, b) {
        let valA = a[sortKey];
        let valB = b[sortKey];

        if (sortKey === 'revenue' || sortKey === 'orders') {
            valA = Number(valA);
            valB = Number(valB);
        } else {
            valA = String(valA).toLowerCase();
            valB = String(valB).toLowerCase();
        }

        if (valA < valB) return sortAsc ? -1 : 1;
        if (valA > valB) return sortAsc ? 1 : -1;
        return 0;
    });

    return filtered;
}

function renderTable() {
    const filteredRows = getFilteredRows();
    const totalRows = filteredRows.length;
    const totalPages = Math.max(1, Math.ceil(totalRows / rowsPerPage));

    if (currentPage > totalPages) currentPage = totalPages;

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const pageRows = filteredRows.slice(start, end);

    tableBody.innerHTML = '';

    for (let i = 0; i < pageRows.length; i++) {
        const row = pageRows[i];
        const tr = document.createElement('tr');

        tr.innerHTML =
            '<td><strong>' + row.name + '</strong></td>' +
            '<td>' + formatCurrency(row.revenue) + '</td>' +
            '<td>' + row.orders + '</td>' +
            '<td><span class="status-pill status-' + row.status.toLowerCase() + '">' + row.status + '</span></td>' +
            '<td>' + row.region + '</td>';

        tableBody.appendChild(tr);
    }

    tableInfo.textContent = 'Showing ' + (totalRows === 0 ? 0 : start + 1) + ' to ' + Math.min(end, totalRows) + ' of ' + totalRows + ' records';
    pageText.textContent = 'Page ' + currentPage + ' of ' + totalPages;
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;
}

// Event listeners for search and filters.
searchInput.addEventListener('input', function () {
    currentPage = 1;
    renderTable();
});

statusFilter.addEventListener('change', function () {
    currentPage = 1;
    renderTable();
});

regionFilter.addEventListener('change', function () {
    currentPage = 1;
    renderTable();
});

prevPageBtn.addEventListener('click', function () {
    if (currentPage > 1) {
        currentPage--;
        renderTable();
    }
});

nextPageBtn.addEventListener('click', function () {
    const totalRows = getFilteredRows().length;
    const totalPages = Math.max(1, Math.ceil(totalRows / rowsPerPage));
    if (currentPage < totalPages) {
        currentPage++;
        renderTable();
    }
});

// Sorting from table headers.
const sortHeaders = document.querySelectorAll('th[data-sort]');
for (let i = 0; i < sortHeaders.length; i++) {
    sortHeaders[i].addEventListener('click', function () {
        const key = this.getAttribute('data-sort');

        if (sortKey === key) {
            sortAsc = !sortAsc;
        } else {
            sortKey = key;
            sortAsc = true;
        }

        currentPage = 1;
        renderTable();
    });
}

// All functions calls here

function renderAll() {
    renderKpis();
    renderRevenueChart();
    renderSalesChart();
    renderCustomerChart();
    renderCategoryChart();
    renderTable();
}

renderAll();

// Re-render line chart on resize so it stays responsive.
window.addEventListener('resize', function () {
    renderCustomerChart();
    if (window.innerWidth >= 992) {
        closeSidebar();
    }
});
