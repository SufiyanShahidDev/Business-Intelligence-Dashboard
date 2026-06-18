

// Toggle Elements

let themeToggle = document.getElementById("themeToggle");

let themeToggleSide = document.getElementById("themeToggleSide");


// local atorage fees

const starageKey = "Teyzix-dashboard-data";
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

if (!localStorage.getItem(starageKey)) {
    localStorage.setItem(starageKey, JSON.stringify(seedData));
}

// fetching data from local storage

function getDashboardData() {
    return JSON.parse(localStorage.getItem(starageKey));
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