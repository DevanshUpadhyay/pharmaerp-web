// src/features/reports/constants/reportsHubData.js

import {
  TrendingUp,
  ShoppingCart,
  Package,
  Users,
  Truck,
  Calculator,
  FileText,
  BarChart2,
  Tag,
  Sliders,
  Receipt,
  FilePlus,
  Clock,
  Download,
  Percent,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Boxes,
  UserCheck,
  CreditCard,
  Building2,
  ShieldCheck,
  Calendar,
  Layers,
  ArrowDownRight,
  ArrowUpRight,
  Database,
  Share2,
  SlidersHorizontal,
} from "lucide-react";

/**
 * ── 1. Top KPI Stat Cards for Reports Front Page (Image 2) ──────────────────
 */
export const REPORTS_OVERVIEW_STATS = [
  {
    id: "total-sales",
    title: "Total Sales",
    value: "₹12,48,500",
    trend: "12.5%",
    trendDirection: "up",
    trendLabel: "vs previous period",
    color: "emerald",
    icon: TrendingUp,
    iconBg: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400",
    sparklineColor: "#10b981",
    sparklinePath: "M 0,22 C 15,22 25,28 38,20 C 50,12 62,25 75,10 C 85,5 92,15 100,6",
  },
  {
    id: "total-purchase",
    title: "Total Purchase",
    value: "₹8,32,400",
    trend: "8.2%",
    trendDirection: "up",
    trendLabel: "vs previous period",
    color: "sky",
    icon: ShoppingCart,
    iconBg: "bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400",
    sparklineColor: "#0ea5e9",
    sparklinePath: "M 0,26 C 20,26 30,30 45,22 C 60,14 70,20 85,15 C 92,12 96,16 100,11",
  },
  {
    id: "stock-value",
    title: "Current Stock Value",
    value: "₹18,75,300",
    trend: "5.1%",
    trendDirection: "up",
    trendLabel: "vs previous period",
    color: "purple",
    icon: Package,
    iconBg: "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400",
    sparklineColor: "#a855f7",
    sparklinePath: "M 0,24 C 18,24 25,18 42,22 C 58,26 68,14 82,12 C 90,10 95,16 100,9",
  },
  {
    id: "total-customers",
    title: "Total Customers",
    value: "3,482",
    trend: "18.3%",
    trendDirection: "up",
    trendLabel: "vs previous period",
    color: "amber",
    icon: Users,
    iconBg: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400",
    sparklineColor: "#f59e0b",
    sparklinePath: "M 0,27 C 15,27 28,20 40,24 C 55,28 65,16 80,18 C 90,20 95,12 100,8",
  },
];

/**
 * ── Helper to generate 31 daily trend points ────────────────────────────────
 */
export const generateDailyTrend = (val1Mul = 1, val2Mul = 1) => [
  { date: "01 Oct", sales: Math.round(48 * val1Mul), profit: Math.round(24 * val2Mul) },
  { date: "02 Oct", sales: Math.round(42 * val1Mul), profit: Math.round(20 * val2Mul) },
  { date: "03 Oct", sales: Math.round(55 * val1Mul), profit: Math.round(28 * val2Mul) },
  { date: "04 Oct", sales: Math.round(78 * val1Mul), profit: Math.round(38 * val2Mul) },
  { date: "05 Oct", sales: Math.round(50 * val1Mul), profit: Math.round(25 * val2Mul) },
  { date: "06 Oct", sales: Math.round(46 * val1Mul), profit: Math.round(22 * val2Mul) },
  { date: "07 Oct", sales: Math.round(62 * val1Mul), profit: Math.round(32 * val2Mul) },
  { date: "08 Oct", sales: Math.round(38 * val1Mul), profit: Math.round(18 * val2Mul) },
  { date: "09 Oct", sales: Math.round(45 * val1Mul), profit: Math.round(23 * val2Mul) },
  { date: "10 Oct", sales: Math.round(70 * val1Mul), profit: Math.round(36 * val2Mul) },
  { date: "11 Oct", sales: Math.round(54 * val1Mul), profit: Math.round(26 * val2Mul) },
  { date: "12 Oct", sales: Math.round(48 * val1Mul), profit: Math.round(23 * val2Mul) },
  { date: "13 Oct", sales: Math.round(82 * val1Mul), profit: Math.round(42 * val2Mul) },
  { date: "14 Oct", sales: Math.round(60 * val1Mul), profit: Math.round(30 * val2Mul) },
  { date: "15 Oct", sales: Math.round(52 * val1Mul), profit: Math.round(26 * val2Mul) },
  { date: "16 Oct", sales: Math.round(66 * val1Mul), profit: Math.round(34 * val2Mul) },
  { date: "17 Oct", sales: Math.round(44 * val1Mul), profit: Math.round(21 * val2Mul) },
  { date: "18 Oct", sales: Math.round(58 * val1Mul), profit: Math.round(29 * val2Mul) },
  { date: "19 Oct", sales: Math.round(76 * val1Mul), profit: Math.round(38 * val2Mul) },
  { date: "20 Oct", sales: Math.round(52 * val1Mul), profit: Math.round(27 * val2Mul) },
  { date: "21 Oct", sales: Math.round(49 * val1Mul), profit: Math.round(24 * val2Mul) },
  { date: "22 Oct", sales: Math.round(79 * val1Mul), profit: Math.round(40 * val2Mul) },
  { date: "23 Oct", sales: Math.round(56 * val1Mul), profit: Math.round(28 * val2Mul) },
  { date: "24 Oct", sales: Math.round(62 * val1Mul), profit: Math.round(31 * val2Mul) },
  { date: "25 Oct", sales: Math.round(84 * val1Mul), profit: Math.round(43 * val2Mul) },
  { date: "26 Oct", sales: Math.round(58 * val1Mul), profit: Math.round(29 * val2Mul) },
  { date: "27 Oct", sales: Math.round(54 * val1Mul), profit: Math.round(27 * val2Mul) },
  { date: "28 Oct", sales: Math.round(72 * val1Mul), profit: Math.round(37 * val2Mul) },
  { date: "29 Oct", sales: Math.round(48 * val1Mul), profit: Math.round(24 * val2Mul) },
  { date: "30 Oct", sales: Math.round(68 * val1Mul), profit: Math.round(34 * val2Mul) },
  { date: "31 Oct", sales: Math.round(58 * val1Mul), profit: Math.round(30 * val2Mul) },
];

/**
 * ── 2. The 9 Master Report Categories with Full 45-Report Configurations ───
 */
export const MASTER_CATEGORIES_DATA = {
  // ── 1. Sales Reports ──────────────────────────────────────────────
  "sales": {
    id: "sales-reports",
    slug: "sales",
    title: "Sales Reports",
    subtitle: "Sales analysis, billing reports and customer insights",
    theme: {
      headerBg: "bg-[#edfcf2] dark:bg-emerald-950/25",
      headerBorder: "border-[#d3f4de] dark:border-emerald-900/30",
      iconBg: "bg-[#d1fae5] dark:bg-emerald-900/40 text-[#059669] dark:text-emerald-400",
      activeTabBg: "bg-[#edfcf2] dark:bg-emerald-950/40 text-[#047857] dark:text-emerald-300 border-[#a7f3d0] dark:border-emerald-800/50",
      activeIconBg: "bg-[#d1fae5] dark:bg-emerald-900/50 text-[#059669] dark:text-emerald-400",
    },
    icon: ShoppingCart,
    items: [
      { id: "sales-summary", slug: "summary", title: "Sales Summary", subtitle: "Daily, monthly, yearly sales report", icon: BarChart2 },
      { id: "sales-detail", slug: "detail", title: "Sales Detail Report", subtitle: "Invoice wise detailed sales", icon: FileText },
      { id: "customer-sales", slug: "customer", title: "Customer Sales Report", subtitle: "Customer wise purchase analysis", icon: FileText },
      { id: "product-sales", slug: "product", title: "Product Sales Report", subtitle: "Best selling & slow moving products", icon: FileText },
      { id: "sales-return", slug: "return", title: "Sales Return Report", subtitle: "Returned items and credit notes", icon: FileText },
    ],
    tabs: {
      "summary": {
        id: "sales-summary",
        slug: "summary",
        title: "Sales Summary",
        subtitle: "Daily, monthly, and yearly sales overview with amount, profit and invoice details.",
        stats: [
          { id: "s1", title: "Total Sales", value: "₹12,48,500", trend: "12.5%", trendDirection: "up", trendLabel: "vs previous period", icon: Tag, iconBg: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400" },
          { id: "s2", title: "Total Invoices", value: "1,482", trend: "10.2%", trendDirection: "up", trendLabel: "vs previous period", icon: FileText, iconBg: "bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400" },
          { id: "s3", title: "Total Items Sold", value: "8,645", trend: "15.3%", trendDirection: "up", trendLabel: "vs previous period", icon: TrendingUp, iconBg: "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400" },
          { id: "s4", title: "Average Invoice Value", value: "₹842", trend: "2.1%", trendDirection: "up", trendLabel: "vs previous period", icon: Percent, iconBg: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400" },
        ],
        chart: { title: "Sales Trend", metric1Label: "Sales Amount", metric2Label: "Profit", metric1Color: "#059669", metric2Color: "#38bdf8", data: generateDailyTrend(1, 1) },
        filterPlaceholder: "Search by invoice no., customer, product...",
        columns: [
          { key: "date", label: "Date" },
          { key: "invoiceNo", label: "Invoice No." },
          { key: "customer", label: "Customer" },
          { key: "items", label: "Items", align: "center" },
          { key: "billAmount", label: "Bill Amount", align: "right", isCurrency: true },
          { key: "discount", label: "Discount", align: "right", isCurrency: true },
          { key: "netAmount", label: "Net Amount", align: "right", isCurrency: true, highlight: true },
          { key: "paymentMode", label: "Payment Mode", align: "center" },
          { key: "profit", label: "Profit", align: "right", isCurrency: true },
          { key: "status", label: "Status", align: "center", isStatus: true },
        ],
        rows: [
          { id: "1", date: "31 Oct 2024", invoiceNo: "INV-001482", customer: "Walk-in Customer", items: 3, billAmount: 1245.0, discount: 50.0, netAmount: 1195.0, paymentMode: "Cash", profit: 210.5, status: "Completed" },
          { id: "2", date: "31 Oct 2024", invoiceNo: "INV-001481", customer: "Rakesh Sharma", items: 5, billAmount: 2340.0, discount: 120.0, netAmount: 2220.0, paymentMode: "UPI", profit: 415.2, status: "Completed" },
          { id: "3", date: "31 Oct 2024", invoiceNo: "INV-001480", customer: "Neha Patel", items: 2, billAmount: 980.0, discount: 0.0, netAmount: 980.0, paymentMode: "Card", profit: 178.0, status: "Completed" },
          { id: "4", date: "30 Oct 2024", invoiceNo: "INV-001479", customer: "Walk-in Customer", items: 4, billAmount: 1876.0, discount: 76.0, netAmount: 1800.0, paymentMode: "Cash", profit: 302.4, status: "Completed" },
          { id: "5", date: "30 Oct 2024", invoiceNo: "INV-001478", customer: "Amit Verma", items: 6, billAmount: 3420.0, discount: 200.0, netAmount: 3220.0, paymentMode: "UPI", profit: 612.8, status: "Completed" },
          { id: "6", date: "29 Oct 2024", invoiceNo: "INV-001477", customer: "Walk-in Customer", items: 1, billAmount: 650.0, discount: 0.0, netAmount: 650.0, paymentMode: "Cash", profit: 122.5, status: "Completed" },
          { id: "7", date: "29 Oct 2024", invoiceNo: "INV-001476", customer: "Sunita Jain", items: 3, billAmount: 1980.0, discount: 100.0, netAmount: 1880.0, paymentMode: "UPI", profit: 356.7, status: "Completed" },
          { id: "8", date: "28 Oct 2024", invoiceNo: "INV-001475", customer: "Walk-in Customer", items: 2, billAmount: 890.0, discount: 0.0, netAmount: 890.0, paymentMode: "Cash", profit: 168.9, status: "Completed" },
          { id: "9", date: "28 Oct 2024", invoiceNo: "INV-001474", customer: "Vikram Singh", items: 7, billAmount: 4120.0, discount: 250.0, netAmount: 3870.0, paymentMode: "Card", profit: 736.4, status: "Completed" },
          { id: "10", date: "27 Oct 2024", invoiceNo: "INV-001473", customer: "Walk-in Customer", items: 4, billAmount: 1560.0, discount: 60.0, netAmount: 1500.0, paymentMode: "UPI", profit: 280.3, status: "Completed" },
        ],
      },
      "detail": {
        id: "sales-detail",
        slug: "detail",
        title: "Sales Detail Report",
        subtitle: "Invoice wise line item breakdown with medicine, batch, quantity, GST rate, and margins.",
        stats: [
          { id: "sd1", title: "Gross Sales", value: "₹13,18,000", trend: "11.8%", trendDirection: "up", trendLabel: "vs previous period", icon: Receipt, iconBg: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400" },
          { id: "sd2", title: "Total Discounts", value: "₹69,500", trend: "3.2%", trendDirection: "down", trendLabel: "vs previous period", icon: Percent, iconBg: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400" },
          { id: "sd3", title: "GST Collected", value: "₹1,42,800", trend: "9.4%", trendDirection: "up", trendLabel: "vs previous period", icon: Tag, iconBg: "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400" },
          { id: "sd4", title: "Net Realized", value: "₹12,48,500", trend: "12.5%", trendDirection: "up", trendLabel: "vs previous period", icon: TrendingUp, iconBg: "bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400" },
        ],
        chart: { title: "Gross vs Net Realization", metric1Label: "Gross Billing", metric2Label: "Net Realized", metric1Color: "#10b981", metric2Color: "#0284c7", data: generateDailyTrend(1.05, 0.95) },
        filterPlaceholder: "Search medicine, batch, invoice number...",
        columns: [
          { key: "date", label: "Date" },
          { key: "invoiceNo", label: "Invoice No." },
          { key: "item", label: "Medicine / Product" },
          { key: "batch", label: "Batch No." },
          { key: "qty", label: "Qty", align: "center" },
          { key: "unitPrice", label: "Unit Rate", align: "right", isCurrency: true },
          { key: "gstRate", label: "GST %", align: "center" },
          { key: "discount", label: "Discount", align: "right", isCurrency: true },
          { key: "total", label: "Total (₹)", align: "right", isCurrency: true, highlight: true },
          { key: "cashier", label: "Dispensed By" },
        ],
        rows: [
          { id: "1", date: "31 Oct 2024", invoiceNo: "INV-001482", item: "Augmentin 625 Duo Tablet", batch: "AG-6251", qty: 2, unitPrice: 204.5, gstRate: "12%", discount: 10.0, total: 399.0, cashier: "Devansh (Counter 1)" },
          { id: "2", date: "31 Oct 2024", invoiceNo: "INV-001482", item: "Pan D Capsule (15s)", batch: "PND-992", qty: 1, unitPrice: 198.0, gstRate: "12%", discount: 5.0, total: 193.0, cashier: "Devansh (Counter 1)" },
          { id: "3", date: "31 Oct 2024", invoiceNo: "INV-001481", item: "Telma 40mg Tablet", batch: "TLM-441", qty: 3, unitPrice: 245.0, gstRate: "12%", discount: 25.0, total: 710.0, cashier: "Suresh (Counter 2)" },
          { id: "4", date: "31 Oct 2024", invoiceNo: "INV-001481", item: "Rosuvas 10mg Strip", batch: "RSV-810", qty: 2, unitPrice: 380.0, gstRate: "12%", discount: 30.0, total: 730.0, cashier: "Suresh (Counter 2)" },
          { id: "5", date: "31 Oct 2024", invoiceNo: "INV-001480", item: "Dolo 650mg Paracetamol", batch: "DOL-112", qty: 4, unitPrice: 32.0, gstRate: "12%", discount: 0.0, total: 128.0, cashier: "Devansh (Counter 1)" },
          { id: "6", date: "30 Oct 2024", invoiceNo: "INV-001479", item: "Allegra 120mg Tablet", batch: "ALG-303", qty: 2, unitPrice: 215.0, gstRate: "12%", discount: 15.0, total: 415.0, cashier: "Devansh (Counter 1)" },
          { id: "7", date: "30 Oct 2024", invoiceNo: "INV-001478", item: "Glycomet GP2 Forte", batch: "GLY-087", qty: 4, unitPrice: 285.0, gstRate: "12%", discount: 40.0, total: 1100.0, cashier: "Suresh (Counter 2)" },
          { id: "8", date: "29 Oct 2024", invoiceNo: "INV-001477", item: "Shelcal 500 Calcium Strip", batch: "SHL-701", qty: 2, unitPrice: 135.0, gstRate: "12%", discount: 0.0, total: 270.0, cashier: "Devansh (Counter 1)" },
          { id: "9", date: "28 Oct 2024", invoiceNo: "INV-001474", item: "Thyronorm 50mcg (100s)", batch: "THY-612", qty: 1, unitPrice: 175.0, gstRate: "5%", discount: 10.0, total: 165.0, cashier: "Devansh (Counter 1)" },
          { id: "10", date: "27 Oct 2024", invoiceNo: "INV-001473", item: "Montair LC Kid Syrup", batch: "MNT-223", qty: 2, unitPrice: 162.0, gstRate: "12%", discount: 10.0, total: 314.0, cashier: "Suresh (Counter 2)" },
        ],
      },
      "customer": {
        id: "customer-sales",
        slug: "customer",
        title: "Customer Sales Report",
        subtitle: "Customer wise purchase frequency, total billing volume, outstanding ledger, and loyalty insights.",
        stats: [
          { id: "cs1", title: "Active Buyers", value: "642", trend: "14.1%", trendDirection: "up", trendLabel: "vs previous period", icon: Users, iconBg: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400" },
          { id: "cs2", title: "New Patients", value: "128", trend: "22.0%", trendDirection: "up", trendLabel: "vs previous period", icon: UserCheck, iconBg: "bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400" },
          { id: "cs3", title: "Udhar Credit Given", value: "₹2,15,400", trend: "4.5%", trendDirection: "down", trendLabel: "vs previous period", icon: CreditCard, iconBg: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400" },
          { id: "cs4", title: "Repeat Rate", value: "68.4%", trend: "5.2%", trendDirection: "up", trendLabel: "vs previous period", icon: TrendingUp, iconBg: "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400" },
        ],
        chart: { title: "Patient Volume & Spend Trend", metric1Label: "Registered", metric2Label: "Walk-in Sales", metric1Color: "#6366f1", metric2Color: "#10b981", data: generateDailyTrend(0.9, 0.75) },
        filterPlaceholder: "Search customer name, phone number, city...",
        columns: [
          { key: "customer", label: "Patient / Customer" },
          { key: "phone", label: "Phone Number" },
          { key: "visits", label: "Visits", align: "center" },
          { key: "totalSpend", label: "Total Billing", align: "right", isCurrency: true, highlight: true },
          { key: "outstanding", label: "Udhar Outstanding", align: "right", isCurrency: true },
          { key: "lastVisit", label: "Last Visit" },
          { key: "segment", label: "Segment", align: "center" },
          { key: "mode", label: "Preferred Mode", align: "center" },
        ],
        rows: [
          { id: "1", customer: "Rakesh Sharma", phone: "+91 98765 43210", visits: 8, totalSpend: 18450.0, outstanding: 0.0, lastVisit: "31 Oct 2024", segment: "Chronic VIP", mode: "UPI" },
          { id: "2", customer: "Neha Patel", phone: "+91 98234 11223", visits: 4, totalSpend: 8200.0, outstanding: 450.0, lastVisit: "31 Oct 2024", segment: "Regular", mode: "Card" },
          { id: "3", customer: "Amit Verma", phone: "+91 99100 88776", visits: 6, totalSpend: 14600.0, outstanding: 1200.0, lastVisit: "30 Oct 2024", segment: "Monthly Udhar", mode: "Cash" },
          { id: "4", customer: "Sunita Jain", phone: "+91 94123 55667", visits: 5, totalSpend: 11300.0, outstanding: 0.0, lastVisit: "29 Oct 2024", segment: "Regular", mode: "UPI" },
          { id: "5", customer: "Vikram Singh", phone: "+91 98989 33445", visits: 3, totalSpend: 9850.0, outstanding: 2500.0, lastVisit: "28 Oct 2024", segment: "Credit Account", mode: "Card" },
          { id: "6", customer: "Dr. Arvind Mehta", phone: "+91 98221 77889", visits: 12, totalSpend: 34200.0, outstanding: 0.0, lastVisit: "27 Oct 2024", segment: "Doctor Clinic", mode: "NEFT" },
          { id: "7", customer: "Pooja Malhotra", phone: "+91 97654 22110", visits: 3, totalSpend: 4950.0, outstanding: 0.0, lastVisit: "26 Oct 2024", segment: "Casual", mode: "Cash" },
          { id: "8", customer: "Manoj Deshmukh", phone: "+91 98450 66778", visits: 7, totalSpend: 16800.0, outstanding: 850.0, lastVisit: "25 Oct 2024", segment: "Regular", mode: "UPI" },
          { id: "9", customer: "Kavita Rao", phone: "+91 99887 44332", visits: 4, totalSpend: 7600.0, outstanding: 0.0, lastVisit: "24 Oct 2024", segment: "Chronic Care", mode: "UPI" },
          { id: "10", customer: "Deepak Choudhary", phone: "+91 94321 00987", visits: 2, totalSpend: 3200.0, outstanding: 600.0, lastVisit: "23 Oct 2024", segment: "Casual", mode: "Cash" },
        ],
      },
      "product": {
        id: "product-sales",
        slug: "product",
        title: "Product Sales Report",
        subtitle: "Product wise turnover, units dispensed, revenue ranking, and inventory velocity.",
        stats: [
          { id: "ps1", title: "Distinct SKUs Sold", value: "418", trend: "8.6%", trendDirection: "up", trendLabel: "vs previous period", icon: Boxes, iconBg: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400" },
          { id: "ps2", title: "Top 10 SKU Share", value: "34.2%", trend: "1.8%", trendDirection: "up", trendLabel: "of total revenue", icon: Percent, iconBg: "bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400" },
          { id: "ps3", title: "Slow Moving Items", value: "28", trend: "12.5%", trendDirection: "down", trendLabel: "<2 sales/mo", icon: AlertTriangle, iconBg: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400" },
          { id: "ps4", title: "Stock Turns Velocity", value: "4.8x", trend: "0.6x", trendDirection: "up", trendLabel: "annualized velocity", icon: TrendingUp, iconBg: "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400" },
        ],
        chart: { title: "Medicine Volume & Profit Velocity", metric1Label: "Revenue Produced", metric2Label: "Gross Margin", metric1Color: "#f59e0b", metric2Color: "#10b981", data: generateDailyTrend(0.85, 0.9) },
        filterPlaceholder: "Search medicine name, brand, salt composition...",
        columns: [
          { key: "name", label: "Medicine / SKU" },
          { key: "manufacturer", label: "Manufacturer" },
          { key: "category", label: "Category" },
          { key: "units", label: "Units Sold", align: "center" },
          { key: "avgPrice", label: "Avg Price", align: "right", isCurrency: true },
          { key: "revenue", label: "Total Revenue", align: "right", isCurrency: true, highlight: true },
          { key: "margin", label: "Margin %", align: "center" },
          { key: "stock", label: "Stock Status", align: "center" },
        ],
        rows: [
          { id: "1", name: "Augmentin 625 Duo", manufacturer: "GSK Pharmaceuticals", category: "Antibiotic", units: 340, avgPrice: 204.5, revenue: 69530.0, margin: "22.5%", stock: "In Stock" },
          { id: "2", name: "Pan D Capsule", manufacturer: "Alkem Laboratories", category: "Antacid", units: 285, avgPrice: 198.0, revenue: 56430.0, margin: "26.0%", stock: "In Stock" },
          { id: "3", name: "Telma 40mg Tablet", manufacturer: "Glenmark Pharma", category: "Cardiology", units: 220, avgPrice: 245.0, revenue: 53900.0, margin: "24.2%", stock: "In Stock" },
          { id: "4", name: "Dolo 650mg Paracetamol", manufacturer: "Micro Labs", category: "Analgesic", units: 1420, avgPrice: 32.0, revenue: 45440.0, margin: "18.5%", stock: "In Stock" },
          { id: "5", name: "Glycomet GP2 Forte", manufacturer: "USV Pharma", category: "Diabetic", units: 160, avgPrice: 285.0, revenue: 45600.0, margin: "21.0%", stock: "In Stock" },
          { id: "6", name: "Shelcal 500 Calcium", manufacturer: "Torrent Pharma", category: "Nutritional", units: 260, avgPrice: 135.0, revenue: 35100.0, margin: "23.5%", stock: "In Stock" },
          { id: "7", name: "Rosuvas 10mg Strip", manufacturer: "Sun Pharma", category: "Cardiology", units: 95, avgPrice: 380.0, revenue: 36100.0, margin: "25.0%", stock: "In Stock" },
          { id: "8", name: "Allegra 120mg Tablet", manufacturer: "Sanofi India", category: "Antiallergic", units: 155, avgPrice: 215.0, revenue: 33325.0, margin: "20.5%", stock: "In Stock" },
          { id: "9", name: "Thyronorm 50mcg", manufacturer: "Abbott India", category: "Hormone", units: 180, avgPrice: 175.0, revenue: 31500.0, margin: "19.0%", stock: "Low Stock" },
          { id: "10", name: "Montair LC Kid Syrup", manufacturer: "Cipla Health", category: "Respiratory", units: 140, avgPrice: 162.0, revenue: 22680.0, margin: "24.0%", stock: "In Stock" },
        ],
      },
      "return": {
        id: "sales-return",
        slug: "return",
        title: "Sales Return Report",
        subtitle: "Customer sales returns, credit note receipts, return reasons, and stock reversal history.",
        stats: [
          { id: "sr1", title: "Total Return Value", value: "₹24,800", trend: "18.2%", trendDirection: "down", trendLabel: "vs previous period", icon: RotateCcw, iconBg: "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400" },
          { id: "sr2", title: "Return Credit Notes", value: "32", trend: "12.5%", trendDirection: "down", trendLabel: "credit vouchers", icon: FileText, iconBg: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400" },
          { id: "sr3", title: "Sales Return Ratio", value: "1.98%", trend: "0.4%", trendDirection: "down", trendLabel: "of gross billings", icon: Percent, iconBg: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400" },
          { id: "sr4", title: "Refunds Disbursed", value: "₹18,400", trend: "15.0%", trendDirection: "down", trendLabel: "counter refund cash", icon: Tag, iconBg: "bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400" },
        ],
        chart: { title: "Daily Return & Refund Trend", metric1Label: "Return Value (₹)", metric2Label: "Credit Notes", metric1Color: "#f43f5e", metric2Color: "#8b5cf6", data: generateDailyTrend(0.18, 0.12) },
        filterPlaceholder: "Search return no., original invoice, patient...",
        columns: [
          { key: "date", label: "Date" },
          { key: "returnNo", label: "Return Voucher" },
          { key: "originalInvoice", label: "Original Invoice" },
          { key: "customer", label: "Customer" },
          { key: "items", label: "Returned Medicine" },
          { key: "refundAmount", label: "Refund (₹)", align: "right", isCurrency: true, highlight: true },
          { key: "reason", label: "Return Reason" },
          { key: "mode", label: "Mode", align: "center" },
          { key: "processedBy", label: "Approved By" },
        ],
        rows: [
          { id: "1", date: "31 Oct 2024", returnNo: "CN-000214", originalInvoice: "INV-001470", customer: "Walk-in Customer", items: "Pan D Capsule (10s)", refundAmount: 198.0, reason: "Doctor changed dosage", mode: "Cash", processedBy: "Devansh" },
          { id: "2", date: "30 Oct 2024", returnNo: "CN-000213", originalInvoice: "INV-001452", customer: "Rakesh Sharma", items: "Telma 40mg (1 strip)", refundAmount: 245.0, reason: "Excess purchased", mode: "UPI Refund", processedBy: "Suresh" },
          { id: "3", date: "29 Oct 2024", returnNo: "CN-000212", originalInvoice: "INV-001441", customer: "Neha Patel", items: "Dolo 650mg (2 strips)", refundAmount: 64.0, reason: "Fever recovered", mode: "Credit Note", processedBy: "Devansh" },
          { id: "4", date: "28 Oct 2024", returnNo: "CN-000211", originalInvoice: "INV-001428", customer: "Amit Verma", items: "Rosuvas 10mg", refundAmount: 380.0, reason: "Allergic reaction", mode: "Cash", processedBy: "Suresh" },
          { id: "5", date: "27 Oct 2024", returnNo: "CN-000210", originalInvoice: "INV-001415", customer: "Walk-in Customer", items: "Augmentin 625 Duo", refundAmount: 204.5, reason: "Patient admitted", mode: "Cash", processedBy: "Devansh" },
          { id: "6", date: "26 Oct 2024", returnNo: "CN-000209", originalInvoice: "INV-001398", customer: "Sunita Jain", items: "Allegra 120mg", refundAmount: 215.0, reason: "Wrong strength bought", mode: "UPI Refund", processedBy: "Suresh" },
          { id: "7", date: "25 Oct 2024", returnNo: "CN-000208", originalInvoice: "INV-001380", customer: "Vikram Singh", items: "Glycomet GP2 (2 strips)", refundAmount: 570.0, reason: "Doctor stopped drug", mode: "Credit Note", processedBy: "Devansh" },
          { id: "8", date: "24 Oct 2024", returnNo: "CN-000207", originalInvoice: "INV-001366", customer: "Walk-in Customer", items: "Shelcal 500 (1 strip)", refundAmount: 135.0, reason: "Unopened seal return", mode: "Cash", processedBy: "Devansh" },
          { id: "9", date: "23 Oct 2024", returnNo: "CN-000206", originalInvoice: "INV-001350", customer: "Pooja Malhotra", items: "Montair LC Kid", refundAmount: 162.0, reason: "Child dislike syrup", mode: "Cash", processedBy: "Suresh" },
          { id: "10", date: "22 Oct 2024", returnNo: "CN-000205", originalInvoice: "INV-001332", customer: "Manoj Deshmukh", items: "Thyronorm 50mcg", refundAmount: 175.0, reason: "Dose titrated to 75mcg", mode: "UPI Refund", processedBy: "Devansh" },
        ],
      },
    },
  },

  // ── 2. Purchase Reports ───────────────────────────────────────────
  "purchase": {
    id: "purchase-reports",
    slug: "purchase",
    title: "Purchase Reports",
    subtitle: "Purchase analysis and supplier insights",
    theme: {
      headerBg: "bg-[#f0f7ff] dark:bg-sky-950/25",
      headerBorder: "border-[#dbeafe] dark:border-sky-900/30",
      iconBg: "bg-[#e0f2fe] dark:bg-sky-900/40 text-[#0284c7] dark:text-sky-400",
      activeTabBg: "bg-[#f0f7ff] dark:bg-sky-950/40 text-[#0369a1] dark:text-sky-300 border-[#bae6fd] dark:border-sky-800/50",
      activeIconBg: "bg-[#e0f2fe] dark:bg-sky-900/50 text-[#0284c7] dark:text-sky-400",
    },
    icon: Truck,
    items: [
      { id: "purchase-summary", slug: "summary", title: "Purchase Summary", subtitle: "Daily, monthly, yearly purchase report", icon: BarChart2 },
      { id: "purchase-detail", slug: "detail", title: "Purchase Detail Report", subtitle: "Invoice wise detailed purchase", icon: FileText },
      { id: "supplier-purchase", slug: "supplier", title: "Supplier Purchase Report", subtitle: "Supplier wise purchase analysis", icon: FileText },
      { id: "purchase-return", slug: "return", title: "Purchase Return Report", subtitle: "Returned items and debit notes", icon: FileText },
      { id: "grn-report", slug: "grn", title: "GRN Report", subtitle: "Goods receipt note report", icon: FileText },
    ],
    tabs: {
      "summary": {
        id: "purchase-summary",
        slug: "summary",
        title: "Purchase Summary",
        subtitle: "Procurement volume, vendor invoice tracking, credit terms, and stock entry overview.",
        stats: [
          { id: "p1", title: "Total Purchases", value: "₹8,32,400", trend: "8.2%", trendDirection: "up", trendLabel: "vs previous period", icon: ShoppingCart, iconBg: "bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400" },
          { id: "p2", title: "PO Bills Cleared", value: "412", trend: "6.5%", trendDirection: "up", trendLabel: "bills received", icon: FileText, iconBg: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400" },
          { id: "p3", title: "Active Distributors", value: "64", trend: "3.2%", trendDirection: "up", trendLabel: "supplying vendors", icon: Truck, iconBg: "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400" },
          { id: "p4", title: "Average Bill Value", value: "₹2,020", trend: "1.8%", trendDirection: "down", trendLabel: "per purchase order", icon: Tag, iconBg: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400" },
        ],
        chart: { title: "Purchase Volume & Inward Stock", metric1Label: "Inward Value", metric2Label: "Vendor Paid", metric1Color: "#0284c7", metric2Color: "#10b981", data: generateDailyTrend(0.75, 0.65) },
        filterPlaceholder: "Search purchase invoice, supplier, medicine...",
        columns: [
          { key: "date", label: "Date" },
          { key: "billNo", label: "Vendor Bill No." },
          { key: "supplier", label: "Distributor / Supplier" },
          { key: "items", label: "SKUs", align: "center" },
          { key: "grossAmount", label: "Gross Amount", align: "right", isCurrency: true },
          { key: "tax", label: "GST Input", align: "right", isCurrency: true },
          { key: "netPayable", label: "Net Payable", align: "right", isCurrency: true, highlight: true },
          { key: "paymentStatus", label: "Payment Status", align: "center" },
          { key: "deliveryStatus", label: "Delivery", align: "center", isStatus: true },
        ],
        rows: [
          { id: "1", date: "31 Oct 2024", billNo: "PUR-88401", supplier: "MedPlus Distributors", items: 14, grossAmount: 48500.0, tax: 5820.0, netPayable: 54320.0, paymentStatus: "Paid", deliveryStatus: "Received" },
          { id: "2", date: "30 Oct 2024", billNo: "PUR-88392", supplier: "Apex Pharma Agencies", items: 8, grossAmount: 32400.0, tax: 3888.0, netPayable: 36288.0, paymentStatus: "Partial", deliveryStatus: "Received" },
          { id: "3", date: "29 Oct 2024", billNo: "PUR-88370", supplier: "Shree Ganesh Medicals", items: 22, grossAmount: 89000.0, tax: 10680.0, netPayable: 99680.0, paymentStatus: "Credit (21D)", deliveryStatus: "Received" },
          { id: "4", date: "28 Oct 2024", billNo: "PUR-88355", supplier: "Sun Pharma Direct Depot", items: 5, grossAmount: 18500.0, tax: 925.0, netPayable: 19425.0, paymentStatus: "Paid", deliveryStatus: "Received" },
          { id: "5", date: "27 Oct 2024", billNo: "PUR-88340", supplier: "Cipla Distribution Centre", items: 18, grossAmount: 64200.0, tax: 7704.0, netPayable: 71904.0, paymentStatus: "Credit (30D)", deliveryStatus: "Received" },
          { id: "6", date: "26 Oct 2024", billNo: "PUR-88311", supplier: "Abbott Healthcare Agency", items: 12, grossAmount: 41000.0, tax: 4920.0, netPayable: 45920.0, paymentStatus: "Paid", deliveryStatus: "Received" },
          { id: "7", date: "25 Oct 2024", billNo: "PUR-88290", supplier: "Universal Surgicals", items: 9, grossAmount: 22800.0, tax: 4104.0, netPayable: 26904.0, paymentStatus: "Paid", deliveryStatus: "Received" },
          { id: "8", date: "24 Oct 2024", billNo: "PUR-88274", supplier: "Zydus Lifesciences", items: 15, grossAmount: 51200.0, tax: 6144.0, netPayable: 57344.0, paymentStatus: "Credit (15D)", deliveryStatus: "Received" },
          { id: "9", date: "23 Oct 2024", billNo: "PUR-88250", supplier: "Mankind Speciality", items: 11, grossAmount: 37500.0, tax: 4500.0, netPayable: 42000.0, paymentStatus: "Paid", deliveryStatus: "Received" },
          { id: "10", date: "22 Oct 2024", billNo: "PUR-88210", supplier: "Torrent Pharma Logistics", items: 16, grossAmount: 58900.0, tax: 7068.0, netPayable: 65968.0, paymentStatus: "Credit (21D)", deliveryStatus: "Received" },
        ],
      },
    },
  },

  // ── 3. Inventory Reports ──────────────────────────────────────────
  "inventory": {
    id: "inventory-reports",
    slug: "inventory",
    title: "Inventory Reports",
    subtitle: "Stock position, movement and valuation",
    theme: {
      headerBg: "bg-[#faf5ff] dark:bg-purple-950/25",
      headerBorder: "border-[#f3e8ff] dark:border-purple-900/30",
      iconBg: "bg-[#f3e8ff] dark:bg-purple-900/40 text-[#9333ea] dark:text-purple-400",
      activeTabBg: "bg-[#faf5ff] dark:bg-purple-950/40 text-[#7e22ce] dark:text-purple-300 border-[#e9d5ff] dark:border-purple-800/50",
      activeIconBg: "bg-[#f3e8ff] dark:bg-purple-900/50 text-[#9333ea] dark:text-purple-400",
    },
    icon: Package,
    items: [
      { id: "current-stock", slug: "current-stock", title: "Current Stock Report", subtitle: "Current stock with quantity and value", icon: FileText },
      { id: "stock-movement", slug: "stock-movement", title: "Stock Movement Report", subtitle: "Stock in/out movement history", icon: FileText },
      { id: "stock-valuation", slug: "stock-valuation", title: "Stock Valuation Report", subtitle: "Stock value at cost and MRP", icon: FileText },
      { id: "expiry-report", slug: "expiry", title: "Expiry Report", subtitle: "Near expiry and expired products", icon: FileText },
      { id: "low-stock", slug: "low-stock", title: "Low Stock Report", subtitle: "Products below reorder level", icon: FileText },
    ],
    tabs: {
      "current-stock": {
        id: "current-stock",
        slug: "current-stock",
        title: "Current Stock Report",
        subtitle: "Real-time on-shelf physical stock inventory, batch tracking, and warehouse valuation.",
        stats: [
          { id: "i1", title: "Current Stock Value", value: "₹18,75,300", trend: "5.1%", trendDirection: "up", trendLabel: "vs previous month", icon: Package, iconBg: "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400" },
          { id: "i2", title: "Total Units on Hand", value: "42,650", trend: "3.4%", trendDirection: "up", trendLabel: "bottles & strips", icon: Boxes, iconBg: "bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400" },
          { id: "i3", title: "Zero Stock SKUs", value: "14", trend: "8.0%", trendDirection: "down", trendLabel: "out of stock items", icon: AlertTriangle, iconBg: "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400" },
          { id: "i4", title: "Reorder Triggered", value: "36", trend: "2.5%", trendDirection: "up", trendLabel: "below minimum level", icon: RotateCcw, iconBg: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400" },
        ],
        chart: { title: "Stock Inward vs Dispensed Outward", metric1Label: "Stock Inward", metric2Label: "Sales Dispensed", metric1Color: "#a855f7", metric2Color: "#10b981", data: generateDailyTrend(0.8, 0.82) },
        filterPlaceholder: "Search medicine name, generic composition, rack location...",
        columns: [
          { key: "name", label: "Medicine / Product" },
          { key: "batch", label: "Batch No." },
          { key: "expiry", label: "Expiry Date" },
          { key: "rack", label: "Rack / Shelf" },
          { key: "stockQty", label: "Stock Qty", align: "center" },
          { key: "purchaseRate", label: "Cost Price", align: "right", isCurrency: true },
          { key: "mrp", label: "MRP", align: "right", isCurrency: true },
          { key: "totalValue", label: "Stock Valuation", align: "right", isCurrency: true, highlight: true },
          { key: "status", label: "Status", align: "center", isStatus: true },
        ],
        rows: [
          { id: "1", name: "Augmentin 625 Duo Tablet", batch: "AG-6251", expiry: "12/2026", rack: "R-02 / B4", stockQty: 240, purchaseRate: 160.0, mrp: 204.5, totalValue: 38400.0, status: "Normal" },
          { id: "2", name: "Pan D Capsule (15s)", batch: "PND-992", expiry: "08/2026", rack: "R-01 / A2", stockQty: 180, purchaseRate: 148.0, mrp: 198.0, totalValue: 26640.0, status: "Normal" },
          { id: "3", name: "Telma 40mg Tablet", batch: "TLM-441", expiry: "04/2027", rack: "R-03 / C1", stockQty: 310, purchaseRate: 185.0, mrp: 245.0, totalValue: 57350.0, status: "Normal" },
          { id: "4", name: "Dolo 650mg Paracetamol", batch: "DOL-112", expiry: "10/2027", rack: "R-01 / A1", stockQty: 850, purchaseRate: 24.5, mrp: 32.0, totalValue: 20825.0, status: "Fast Moving" },
          { id: "5", name: "Glycomet GP2 Forte", batch: "GLY-087", expiry: "03/2026", rack: "R-04 / D2", stockQty: 145, purchaseRate: 220.0, mrp: 285.0, totalValue: 31900.0, status: "Normal" },
          { id: "6", name: "Shelcal 500 Calcium Strip", batch: "SHL-701", expiry: "09/2026", rack: "R-02 / B1", stockQty: 290, purchaseRate: 102.0, mrp: 135.0, totalValue: 29580.0, status: "Normal" },
          { id: "7", name: "Rosuvas 10mg Strip", batch: "RSV-810", expiry: "05/2027", rack: "R-03 / C3", stockQty: 85, purchaseRate: 295.0, mrp: 380.0, totalValue: 25075.0, status: "Low Stock" },
          { id: "8", name: "Allegra 120mg Tablet", batch: "ALG-303", expiry: "11/2026", rack: "R-02 / B5", stockQty: 160, purchaseRate: 168.0, mrp: 215.0, totalValue: 26880.0, status: "Normal" },
          { id: "9", name: "Thyronorm 50mcg (100s)", batch: "THY-612", expiry: "01/2027", rack: "R-05 / E1", stockQty: 60, purchaseRate: 138.0, mrp: 175.0, totalValue: 8280.0, status: "Low Stock" },
          { id: "10", name: "Montair LC Kid Syrup", batch: "MNT-223", expiry: "07/2026", rack: "R-06 / F2", stockQty: 115, purchaseRate: 122.0, mrp: 162.0, totalValue: 14030.0, status: "Normal" },
        ],
      },
    },
  },

  // ── 4. Customer Reports ───────────────────────────────────────────
  "customer": {
    id: "customer-reports",
    slug: "customer",
    title: "Customer Reports",
    subtitle: "Customer analysis and outstanding",
    theme: {
      headerBg: "bg-[#fff8f1] dark:bg-orange-950/25",
      headerBorder: "border-[#ffedd5] dark:border-orange-900/30",
      iconBg: "bg-[#ffedd5] dark:bg-orange-900/40 text-[#ea580c] dark:text-orange-400",
      activeTabBg: "bg-[#fff8f1] dark:bg-orange-950/40 text-[#c2410c] dark:text-orange-300 border-[#fed7aa] dark:border-orange-800/50",
      activeIconBg: "bg-[#ffedd5] dark:bg-orange-900/50 text-[#ea580c] dark:text-orange-400",
    },
    icon: Users,
    items: [
      { id: "customer-list", slug: "list", title: "Customer List", subtitle: "All customers with details", icon: BarChart2 },
      { id: "customer-purchase-report", slug: "purchases", title: "Customer Purchase Report", subtitle: "Customer wise purchase history", icon: FileText },
      { id: "customer-outstanding", slug: "outstanding", title: "Outstanding Report", subtitle: "Customer pending payments", icon: FileText },
      { id: "customer-credit", slug: "credit", title: "Customer Credit Report", subtitle: "Credit limit and usage", icon: FileText },
      { id: "customer-aging", slug: "aging", title: "Customer Aging Report", subtitle: "Outstanding aging analysis", icon: FileText },
    ],
    tabs: {
      "list": {
        id: "customer-list",
        slug: "list",
        title: "Customer List",
        subtitle: "Complete pharmacy patient profiles, chronic medication schedules, and contact details.",
        stats: [
          { id: "c1", title: "Total Registered", value: "3,482", trend: "18.3%", trendDirection: "up", trendLabel: "patient accounts", icon: Users, iconBg: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400" },
          { id: "c2", title: "Active This Month", value: "642", trend: "12.0%", trendDirection: "up", trendLabel: "purchased in Oct", icon: UserCheck, iconBg: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400" },
          { id: "c3", title: "Chronic Patients", value: "1,120", trend: "5.4%", trendDirection: "up", trendLabel: "monthly refills", icon: ShieldCheck, iconBg: "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400" },
          { id: "c4", title: "Credit Accounts", value: "84", trend: "1.2%", trendDirection: "down", trendLabel: "udhar accounts", icon: CreditCard, iconBg: "bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400" },
        ],
        chart: { title: "Patient Registration Growth & Refills", metric1Label: "Registered Patients", metric2Label: "Refill Visits", metric1Color: "#f97316", metric2Color: "#10b981", data: generateDailyTrend(0.88, 0.7) },
        filterPlaceholder: "Search patient name, mobile, address, doctor...",
        columns: [
          { key: "name", label: "Customer / Patient" },
          { key: "phone", label: "Mobile" },
          { key: "city", label: "Area / City" },
          { key: "doctor", label: "Primary Doctor" },
          { key: "totalBills", label: "Total Bills", align: "center" },
          { key: "lifetimeSpend", label: "Lifetime Spend", align: "right", isCurrency: true, highlight: true },
          { key: "outstanding", label: "Balance Due", align: "right", isCurrency: true },
          { key: "tier", label: "Tier", align: "center" },
        ],
        rows: [
          { id: "1", name: "Rakesh Sharma", phone: "+91 98765 43210", city: "Civil Lines", doctor: "Dr. Arvind Mehta", totalBills: 48, lifetimeSpend: 68450.0, outstanding: 0.0, tier: "VIP Gold" },
          { id: "2", name: "Neha Patel", phone: "+91 98234 11223", city: "Model Town", doctor: "Dr. K. S. Sethi", totalBills: 24, lifetimeSpend: 32100.0, outstanding: 450.0, tier: "Silver" },
          { id: "3", name: "Amit Verma", phone: "+91 99100 88776", city: "Green Park", doctor: "Dr. Arvind Mehta", totalBills: 36, lifetimeSpend: 44600.0, outstanding: 1200.0, tier: "Gold" },
          { id: "4", name: "Sunita Jain", phone: "+91 94123 55667", city: "Gandhi Nagar", doctor: "Dr. R. Gupta", totalBills: 19, lifetimeSpend: 28300.0, outstanding: 0.0, tier: "Silver" },
          { id: "5", name: "Vikram Singh", phone: "+91 98989 33445", city: "Defense Colony", doctor: "Dr. P. K. Rao", totalBills: 15, lifetimeSpend: 24850.0, outstanding: 2500.0, tier: "Regular" },
          { id: "6", name: "Dr. Arvind Mehta Clinic", phone: "+91 98221 77889", city: "Central Market", doctor: "Self Prescribing", totalBills: 82, lifetimeSpend: 134200.0, outstanding: 0.0, tier: "Platinum" },
          { id: "7", name: "Pooja Malhotra", phone: "+91 97654 22110", city: "Lajpat Nagar", doctor: "Dr. K. S. Sethi", totalBills: 11, lifetimeSpend: 14950.0, outstanding: 0.0, tier: "Regular" },
          { id: "8", name: "Manoj Deshmukh", phone: "+91 98450 66778", city: "Railway Colony", doctor: "Dr. R. Gupta", totalBills: 28, lifetimeSpend: 36800.0, outstanding: 850.0, tier: "Silver" },
          { id: "9", name: "Kavita Rao", phone: "+91 99887 44332", city: "Sector 14", doctor: "Dr. Arvind Mehta", totalBills: 31, lifetimeSpend: 41600.0, outstanding: 0.0, tier: "Gold" },
          { id: "10", name: "Deepak Choudhary", phone: "+91 94321 00987", city: "Shastri Nagar", doctor: "Dr. P. K. Rao", totalBills: 9, lifetimeSpend: 11200.0, outstanding: 600.0, tier: "Regular" },
        ],
      },
    },
  },

  // ── 5. Supplier Reports ───────────────────────────────────────────
  "supplier": {
    id: "supplier-reports",
    slug: "supplier",
    title: "Supplier Reports",
    subtitle: "Supplier analysis and outstanding",
    theme: {
      headerBg: "bg-[#fff1f2] dark:bg-rose-950/25",
      headerBorder: "border-[#ffe4e6] dark:border-rose-900/30",
      iconBg: "bg-[#ffe4e6] dark:bg-rose-900/40 text-[#e11d48] dark:text-rose-400",
      activeTabBg: "bg-[#fff1f2] dark:bg-rose-950/40 text-[#be123c] dark:text-rose-300 border-[#fecdd3] dark:border-rose-800/50",
      activeIconBg: "bg-[#ffe4e6] dark:bg-rose-900/50 text-[#e11d48] dark:text-rose-400",
    },
    icon: Truck,
    items: [
      { id: "supplier-list", slug: "list", title: "Supplier List", subtitle: "All suppliers with details", icon: BarChart2 },
      { id: "supplier-purchase-report", slug: "purchases", title: "Supplier Purchase Report", subtitle: "Supplier wise purchase history", icon: FileText },
      { id: "supplier-outstanding", slug: "outstanding", title: "Outstanding Report", subtitle: "Supplier pending payments", icon: FileText },
      { id: "supplier-credit", slug: "credit", title: "Supplier Credit Report", subtitle: "Credit limit and usage", icon: FileText },
      { id: "supplier-aging", slug: "aging", title: "Supplier Aging Report", subtitle: "Outstanding aging analysis", icon: FileText },
    ],
    tabs: {
      "list": {
        id: "supplier-list",
        slug: "list",
        title: "Supplier List",
        subtitle: "Pharma distributors, stockist ledger balance, drug license numbers, and payment terms.",
        stats: [
          { id: "sp1", title: "Total Vendors", value: "128", trend: "4.2%", trendDirection: "up", trendLabel: "verified distributors", icon: Building2, iconBg: "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400" },
          { id: "sp2", title: "Active Suppliers", value: "64", trend: "2.1%", trendDirection: "up", trendLabel: "ordered this month", icon: Truck, iconBg: "bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400" },
          { id: "sp3", title: "Total Payables", value: "₹4,12,800", trend: "6.8%", trendDirection: "down", trendLabel: "vendor balances", icon: CreditCard, iconBg: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400" },
          { id: "sp4", title: "Avg Credit Period", value: "24 Days", trend: "2 Days", trendDirection: "up", trendLabel: "payment turnaround", icon: Calendar, iconBg: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400" },
        ],
        chart: { title: "Monthly Supplier Procurement & Payables", metric1Label: "Purchases Made", metric2Label: "Payments Disbursed", metric1Color: "#f43f5e", metric2Color: "#0ea5e9", data: generateDailyTrend(0.78, 0.72) },
        filterPlaceholder: "Search vendor name, GSTIN, DL number, contact...",
        columns: [
          { key: "name", label: "Distributor Name" },
          { key: "contact", label: "Contact Person" },
          { key: "phone", label: "Phone" },
          { key: "gstin", label: "GSTIN" },
          { key: "creditDays", label: "Credit Days", align: "center" },
          { key: "totalPurchased", label: "Total Purchases", align: "right", isCurrency: true },
          { key: "currentBalance", label: "Outstanding Due", align: "right", isCurrency: true, highlight: true },
          { key: "status", label: "Status", align: "center", isStatus: true },
        ],
        rows: [
          { id: "1", name: "MedPlus Distributors", contact: "Sunil Chopra", phone: "+91 98111 22334", gstin: "07AAAAA0000A1Z5", creditDays: 21, totalPurchased: 248500.0, currentBalance: 34200.0, status: "Active" },
          { id: "2", name: "Apex Pharma Agencies", contact: "Rajiv Khurana", phone: "+91 98222 33445", gstin: "07BBBBB1111B2Z6", creditDays: 30, totalPurchased: 184200.0, currentBalance: 28400.0, status: "Active" },
          { id: "3", name: "Shree Ganesh Medicals", contact: "Ganesh Patel", phone: "+91 98333 44556", gstin: "07CCCCC2222C3Z7", creditDays: 15, totalPurchased: 312000.0, currentBalance: 64500.0, status: "Active" },
          { id: "4", name: "Sun Pharma Depot", contact: "Anil Saxena", phone: "+91 98444 55667", gstin: "07DDDDD3333D4Z8", creditDays: 30, totalPurchased: 145000.0, currentBalance: 12000.0, status: "Active" },
          { id: "5", name: "Cipla Distribution Centre", contact: "Vikrant Joshi", phone: "+91 98555 66778", gstin: "07EEEEE4444E5Z9", creditDays: 21, totalPurchased: 268000.0, currentBalance: 45000.0, status: "Active" },
          { id: "6", name: "Abbott Healthcare Depot", contact: "Pankaj Seth", phone: "+91 98666 77889", gstin: "07FFFFF5555F6Z1", creditDays: 30, totalPurchased: 122000.0, currentBalance: 18500.0, status: "Active" },
          { id: "7", name: "Universal Surgicals Co.", contact: "Mohan Lal", phone: "+91 98777 88990", gstin: "07GGGGG6666G7Z2", creditDays: 14, totalPurchased: 89000.0, currentBalance: 9800.0, status: "Active" },
          { id: "8", name: "Zydus Lifesciences", contact: "Hitesh Shah", phone: "+91 98888 99001", gstin: "07HHHHH7777H8Z3", creditDays: 21, totalPurchased: 198000.0, currentBalance: 32000.0, status: "Active" },
          { id: "9", name: "Mankind Speciality Agency", contact: "Alok Tiwari", phone: "+91 98999 00112", gstin: "07IIIII8888I9Z4", creditDays: 15, totalPurchased: 154000.0, currentBalance: 24100.0, status: "Active" },
          { id: "10", name: "Torrent Pharma Logistics", contact: "Sanjay Dave", phone: "+91 98000 11223", gstin: "07JJJJJ9999J0Z5", creditDays: 30, totalPurchased: 210000.0, currentBalance: 38200.0, status: "Active" },
        ],
      },
    },
  },

  // ── 6. Financial Reports ──────────────────────────────────────────
  "financial": {
    id: "financial-reports",
    slug: "financial",
    title: "Financial Reports",
    subtitle: "Profit, loss, tax and accounting reports",
    theme: {
      headerBg: "bg-[#f0fdfa] dark:bg-teal-950/25",
      headerBorder: "border-[#ccfbf1] dark:border-teal-900/30",
      iconBg: "bg-[#ccfbf1] dark:bg-teal-900/40 text-[#0d9488] dark:text-teal-400",
      activeTabBg: "bg-[#f0fdfa] dark:bg-teal-950/40 text-[#0f766e] dark:text-teal-300 border-[#99f6e4] dark:border-teal-800/50",
      activeIconBg: "bg-[#ccfbf1] dark:bg-teal-900/50 text-[#0d9488] dark:text-teal-400",
    },
    icon: Calculator,
    items: [
      { id: "profit-loss", slug: "profit-loss", title: "Profit & Loss Report", subtitle: "Revenue, cost and profit analysis", icon: BarChart2 },
      { id: "day-book", slug: "day-book", title: "Day Book", subtitle: "Daily transaction summary", icon: FileText },
      { id: "cash-flow", slug: "cash-flow", title: "Cash Flow Report", subtitle: "Inflow and outflow analysis", icon: FileText },
      { id: "payment-collection", slug: "payment-collection", title: "Payment Collection Report", subtitle: "Received payments report", icon: FileText },
      { id: "expense-report", slug: "expense", title: "Expense Report", subtitle: "All business expenses", icon: FileText },
    ],
    tabs: {
      "profit-loss": {
        id: "profit-loss",
        slug: "profit-loss",
        title: "Profit & Loss Report",
        subtitle: "Trading statement, gross medicine margins, operating overheads, and net pharmacy profit.",
        stats: [
          { id: "fn1", title: "Operating Revenue", value: "₹12,48,500", trend: "12.5%", trendDirection: "up", trendLabel: "sales turnover", icon: TrendingUp, iconBg: "bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400" },
          { id: "fn2", title: "Cost of Goods (COGS)", value: "₹8,32,400", trend: "8.2%", trendDirection: "up", trendLabel: "cost of drugs sold", icon: ShoppingCart, iconBg: "bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400" },
          { id: "fn3", title: "Gross Pharmacy Margin", value: "₹4,16,100", trend: "16.8%", trendDirection: "up", trendLabel: "33.3% gross rate", icon: Tag, iconBg: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400" },
          { id: "fn4", title: "Net Net Margin", value: "₹3,29,800", trend: "14.2%", trendDirection: "up", trendLabel: "26.4% bottomline", icon: Percent, iconBg: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400" },
        ],
        chart: { title: "Revenue vs Cost of Goods vs Net Margin", metric1Label: "Gross Sales", metric2Label: "Gross Profit", metric1Color: "#0d9488", metric2Color: "#10b981", data: generateDailyTrend(1, 0.42) },
        filterPlaceholder: "Search account head, ledger, voucher...",
        columns: [
          { key: "period", label: "Accounting Period" },
          { key: "revenue", label: "Gross Sales Revenue", align: "right", isCurrency: true },
          { key: "cogs", label: "Cost of Sales (COGS)", align: "right", isCurrency: true },
          { key: "grossProfit", label: "Gross Margin", align: "right", isCurrency: true },
          { key: "operatingExpenses", label: "Operating Expenses", align: "right", isCurrency: true },
          { key: "netProfit", label: "Net Profit (EBITDA)", align: "right", isCurrency: true, highlight: true },
          { key: "marginPct", label: "Net Margin %", align: "center" },
        ],
        rows: [
          { id: "1", period: "Week 4 (25-31 Oct)", revenue: 345000.0, cogs: 228000.0, grossProfit: 117000.0, operatingExpenses: 24000.0, netProfit: 93000.0, marginPct: "27.0%" },
          { id: "2", period: "Week 3 (18-24 Oct)", revenue: 312000.0, cogs: 209000.0, grossProfit: 103000.0, operatingExpenses: 21500.0, netProfit: 81500.0, marginPct: "26.1%" },
          { id: "3", period: "Week 2 (11-17 Oct)", revenue: 298000.0, cogs: 199000.0, grossProfit: 99000.0, operatingExpenses: 22000.0, netProfit: 77000.0, marginPct: "25.8%" },
          { id: "4", period: "Week 1 (01-10 Oct)", revenue: 293500.0, cogs: 196400.0, grossProfit: 97100.0, operatingExpenses: 18800.0, netProfit: 78300.0, marginPct: "26.7%" },
          { id: "5", period: "September 2024", revenue: 1120000.0, cogs: 760000.0, grossProfit: 360000.0, operatingExpenses: 82000.0, netProfit: 278000.0, marginPct: "24.8%" },
          { id: "6", period: "August 2024", revenue: 1085000.0, cogs: 742000.0, grossProfit: 343000.0, operatingExpenses: 79500.0, netProfit: 263500.0, marginPct: "24.3%" },
          { id: "7", period: "July 2024", revenue: 1040000.0, cogs: 710000.0, grossProfit: 330000.0, operatingExpenses: 76000.0, netProfit: 254000.0, marginPct: "24.4%" },
          { id: "8", period: "Q2 FY25", revenue: 3245000.0, cogs: 2212000.0, grossProfit: 1033000.0, operatingExpenses: 237500.0, netProfit: 795500.0, marginPct: "24.5%" },
          { id: "9", period: "Q1 FY25", revenue: 3010000.0, cogs: 2080000.0, grossProfit: 930000.0, operatingExpenses: 224000.0, netProfit: 706000.0, marginPct: "23.5%" },
          { id: "10", period: "H1 FY25 Total", revenue: 6255000.0, cogs: 4292000.0, grossProfit: 1963000.0, operatingExpenses: 461500.0, netProfit: 1501500.0, marginPct: "24.0%" },
        ],
      },
    },
  },

  // ── 7. GST Reports ────────────────────────────────────────────────
  "gst": {
    id: "gst-reports",
    slug: "gst",
    title: "GST Reports",
    subtitle: "GST filing and tax reports",
    theme: {
      headerBg: "bg-[#f5f3ff] dark:bg-indigo-950/25",
      headerBorder: "border-[#ede9fe] dark:border-indigo-900/30",
      iconBg: "bg-[#ede9fe] dark:bg-indigo-900/40 text-[#7c3aed] dark:text-indigo-400",
      activeTabBg: "bg-[#f5f3ff] dark:bg-indigo-950/40 text-[#6d28d9] dark:text-indigo-300 border-[#ddd6fe] dark:border-indigo-800/50",
      activeIconBg: "bg-[#ede9fe] dark:bg-indigo-900/50 text-[#7c3aed] dark:text-indigo-400",
    },
    icon: Receipt,
    badgeText: "GST",
    items: [
      { id: "gst-sales", slug: "sales", title: "GST Sales Report", subtitle: "B2B, B2C, Export sales", icon: FileText },
      { id: "gst-purchase", slug: "purchase", title: "GST Purchase Report", subtitle: "Input tax credit analysis", icon: FileText },
      { id: "gstr-1", slug: "gstr-1", title: "GSTR-1 Report", subtitle: "Outward supplies summary", icon: FileText },
      { id: "gstr-3b", slug: "gstr-3b", title: "GSTR-3B Report", subtitle: "Monthly GST summary", icon: FileText },
      { id: "hsn-summary", slug: "hsn", title: "HSN Summary Report", subtitle: "HSN wise sales and purchase", icon: FileText },
    ],
    tabs: {
      "sales": {
        id: "gst-sales",
        slug: "sales",
        title: "GST Sales Report",
        subtitle: "Outward taxable supplies, CGST + SGST + IGST liability breakdown for monthly GST returns.",
        stats: [
          { id: "g1", title: "Taxable Turnover", value: "₹11,14,732", trend: "12.2%", trendDirection: "up", trendLabel: "assessable value", icon: Receipt, iconBg: "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400" },
          { id: "g2", title: "CGST Output", value: "₹66,884", trend: "10.5%", trendDirection: "up", trendLabel: "central tax", icon: Tag, iconBg: "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400" },
          { id: "g3", title: "SGST Output", value: "₹66,884", trend: "10.5%", trendDirection: "up", trendLabel: "state tax", icon: Tag, iconBg: "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400" },
          { id: "g4", title: "Total Tax Liability", value: "₹1,33,768", trend: "11.1%", trendDirection: "up", trendLabel: "total tax generated", icon: Percent, iconBg: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400" },
        ],
        chart: { title: "Taxable Supplies & Output GST Collected", metric1Label: "Taxable Amount", metric2Label: "GST Tax", metric1Color: "#7c3aed", metric2Color: "#10b981", data: generateDailyTrend(0.9, 0.12) },
        filterPlaceholder: "Search GST invoice, HSN code, tax slab...",
        columns: [
          { key: "invoiceNo", label: "Invoice No." },
          { key: "date", label: "Date" },
          { key: "gstType", label: "Supply Type", align: "center" },
          { key: "taxableValue", label: "Taxable Value", align: "right", isCurrency: true },
          { key: "gstRate", label: "Rate", align: "center" },
          { key: "cgst", label: "CGST (₹)", align: "right", isCurrency: true },
          { key: "sgst", label: "SGST (₹)", align: "right", isCurrency: true },
          { key: "totalTax", label: "Total Tax", align: "right", isCurrency: true },
          { key: "invoiceTotal", label: "Invoice Total", align: "right", isCurrency: true, highlight: true },
        ],
        rows: [
          { id: "1", invoiceNo: "INV-001482", date: "31 Oct 2024", gstType: "B2C Retail", taxableValue: 1066.96, gstRate: "12%", cgst: 64.02, sgst: 64.02, totalTax: 128.04, invoiceTotal: 1195.0 },
          { id: "2", invoiceNo: "INV-001481", date: "31 Oct 2024", gstType: "B2C Retail", taxableValue: 1982.14, gstRate: "12%", cgst: 118.93, sgst: 118.93, totalTax: 237.86, invoiceTotal: 2220.0 },
          { id: "3", invoiceNo: "INV-001480", date: "31 Oct 2024", gstType: "B2C Retail", taxableValue: 875.0, gstRate: "12%", cgst: 52.5, sgst: 52.5, totalTax: 105.0, invoiceTotal: 980.0 },
          { id: "4", invoiceNo: "INV-001479", date: "30 Oct 2024", gstType: "B2C Retail", taxableValue: 1607.14, gstRate: "12%", cgst: 96.43, sgst: 96.43, totalTax: 192.86, invoiceTotal: 1800.0 },
          { id: "5", invoiceNo: "INV-001478", date: "30 Oct 2024", gstType: "B2C Retail", taxableValue: 2875.0, gstRate: "12%", cgst: 172.5, sgst: 172.5, totalTax: 345.0, invoiceTotal: 3220.0 },
          { id: "6", invoiceNo: "INV-001477", date: "29 Oct 2024", gstType: "B2C Retail", taxableValue: 580.36, gstRate: "12%", cgst: 34.82, sgst: 34.82, totalTax: 69.64, invoiceTotal: 650.0 },
          { id: "7", invoiceNo: "INV-001476", date: "29 Oct 2024", gstType: "B2C Retail", taxableValue: 1678.57, gstRate: "12%", cgst: 100.71, sgst: 100.71, totalTax: 201.43, invoiceTotal: 1880.0 },
          { id: "8", invoiceNo: "INV-001475", date: "28 Oct 2024", gstType: "B2C Retail", taxableValue: 794.64, gstRate: "12%", cgst: 47.68, sgst: 47.68, totalTax: 95.36, invoiceTotal: 890.0 },
          { id: "9", invoiceNo: "INV-001474", date: "28 Oct 2024", gstType: "B2C Retail", taxableValue: 3455.36, gstRate: "12%", cgst: 207.32, sgst: 207.32, totalTax: 414.64, invoiceTotal: 3870.0 },
          { id: "10", invoiceNo: "INV-001473", date: "27 Oct 2024", gstType: "B2C Retail", taxableValue: 1339.29, gstRate: "12%", cgst: 80.36, sgst: 80.36, totalTax: 160.71, invoiceTotal: 1500.0 },
        ],
      },
    },
  },

  // ── 8. Product Reports ────────────────────────────────────────────
  "product": {
    id: "product-reports",
    slug: "product",
    title: "Product Reports",
    subtitle: "Product analysis and performance",
    theme: {
      headerBg: "bg-[#fff1f2] dark:bg-rose-950/25",
      headerBorder: "border-[#ffe4e6] dark:border-rose-900/30",
      iconBg: "bg-[#ffe4e6] dark:bg-rose-900/40 text-[#f43f5e] dark:text-rose-400",
      activeTabBg: "bg-[#fff1f2] dark:bg-rose-950/40 text-[#e11d48] dark:text-rose-300 border-[#fecdd3] dark:border-rose-800/50",
      activeIconBg: "bg-[#ffe4e6] dark:bg-rose-900/50 text-[#f43f5e] dark:text-rose-400",
    },
    icon: Tag,
    items: [
      { id: "product-list", slug: "list", title: "Product List", subtitle: "All products with details", icon: FileText },
      { id: "product-movement", slug: "movement", title: "Product Movement Report", subtitle: "Stock in/out movement", icon: FileText },
      { id: "fast-moving", slug: "fast-moving", title: "Fast Moving Products", subtitle: "Top selling products", icon: FileText },
      { id: "slow-moving", slug: "slow-moving", title: "Slow Moving Products", subtitle: "Low performing products", icon: FileText },
      { id: "non-moving", slug: "non-moving", title: "Non Moving Products", subtitle: "No sales for selected period", icon: FileText },
    ],
    tabs: {
      "list": {
        id: "product-list",
        slug: "list",
        title: "Product Master Catalog",
        subtitle: "Pharmacy inventory catalog, Schedule H drug flags, salt formulations, and pack sizes.",
        stats: [
          { id: "pr1", title: "Master Catalog SKUs", value: "2,840", trend: "38 added", trendDirection: "up", trendLabel: "in database", icon: Boxes, iconBg: "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400" },
          { id: "pr2", title: "Schedule H / H1", value: "412", trend: "Prescription", trendDirection: "up", trendLabel: "mandatory Rx", icon: ShieldCheck, iconBg: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400" },
          { id: "pr3", title: "Generic Medicines", value: "680", trend: "24.0%", trendDirection: "up", trendLabel: "cost-effective salts", icon: Tag, iconBg: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400" },
          { id: "pr4", title: "Discontinued SKUs", value: "18", trend: "Phased out", trendDirection: "down", trendLabel: "delisted by pharma", icon: AlertTriangle, iconBg: "bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400" },
        ],
        chart: { title: "Catalog Volume by Therapy Category", metric1Label: "Total SKUs", metric2Label: "Active Stock", metric1Color: "#f43f5e", metric2Color: "#0ea5e9", data: generateDailyTrend(0.7, 0.6) },
        filterPlaceholder: "Search brand name, active salt, therapeutic class...",
        columns: [
          { key: "brand", label: "Brand / Medicine Name" },
          { key: "salt", label: "Active Salt Composition" },
          { key: "manufacturer", label: "Manufacturer" },
          { key: "schedule", label: "Schedule", align: "center" },
          { key: "hsn", label: "HSN Code", align: "center" },
          { key: "mrp", label: "MRP", align: "right", isCurrency: true },
          { key: "stock", label: "Stock Units", align: "center" },
          { key: "status", label: "Status", align: "center", isStatus: true },
        ],
        rows: [
          { id: "1", brand: "Augmentin 625 Duo", salt: "Amoxicillin (500mg) + Clavulanic Acid (125mg)", manufacturer: "GSK Pharmaceuticals", schedule: "Schedule H", hsn: "300410", mrp: 204.5, stock: 240, status: "Active" },
          { id: "2", brand: "Pan D Capsule", salt: "Pantoprazole (40mg) + Domperidone (30mg)", manufacturer: "Alkem Laboratories", schedule: "Schedule H", hsn: "300490", mrp: 198.0, stock: 180, status: "Active" },
          { id: "3", brand: "Telma 40mg Tablet", salt: "Telmisartan (40mg)", manufacturer: "Glenmark Pharma", schedule: "Schedule H", hsn: "300490", mrp: 245.0, stock: 310, status: "Active" },
          { id: "4", brand: "Dolo 650mg Tablet", salt: "Paracetamol (650mg)", manufacturer: "Micro Labs", schedule: "OTC", hsn: "300490", mrp: 32.0, stock: 850, status: "Active" },
          { id: "5", brand: "Glycomet GP2 Forte", salt: "Glimepiride (2mg) + Metformin (1000mg)", manufacturer: "USV Pharma", schedule: "Schedule H", hsn: "300490", mrp: 285.0, stock: 145, status: "Active" },
          { id: "6", brand: "Shelcal 500 Calcium", salt: "Calcium Carbonate (1250mg) + Vitamin D3", manufacturer: "Torrent Pharma", schedule: "OTC", hsn: "300450", mrp: 135.0, stock: 290, status: "Active" },
          { id: "7", brand: "Rosuvas 10mg Strip", salt: "Rosuvastatin (10mg)", manufacturer: "Sun Pharma", schedule: "Schedule H", hsn: "300490", mrp: 380.0, stock: 85, status: "Active" },
          { id: "8", brand: "Allegra 120mg Tablet", salt: "Fexofenadine (120mg)", manufacturer: "Sanofi India", schedule: "Schedule H", hsn: "300490", mrp: 215.0, stock: 160, status: "Active" },
          { id: "9", brand: "Thyronorm 50mcg", salt: "Thyroxine Sodium (50mcg)", manufacturer: "Abbott India", schedule: "Schedule H", hsn: "300439", mrp: 175.0, stock: 60, status: "Active" },
          { id: "10", brand: "Montair LC Kid Syrup", salt: "Levocetirizine (2.5mg) + Montelukast (4mg)", manufacturer: "Cipla Health", schedule: "Schedule H", hsn: "300490", mrp: 162.0, stock: 115, status: "Active" },
        ],
      },
    },
  },

  // ── 9. Custom Reports ─────────────────────────────────────────────
  "custom": {
    id: "custom-reports",
    slug: "custom",
    title: "Custom Reports",
    subtitle: "Create and manage custom reports",
    theme: {
      headerBg: "bg-[#fffbeb] dark:bg-amber-950/25",
      headerBorder: "border-[#fef3c7] dark:border-amber-900/30",
      iconBg: "bg-[#fef3c7] dark:bg-amber-900/40 text-[#d97706] dark:text-amber-400",
      activeTabBg: "bg-[#fffbeb] dark:bg-amber-950/40 text-[#b45309] dark:text-amber-300 border-[#fde68a] dark:border-amber-800/50",
      activeIconBg: "bg-[#fef3c7] dark:bg-amber-900/50 text-[#d97706] dark:text-amber-400",
    },
    icon: Sliders,
    items: [
      { id: "create-custom-report", slug: "create", title: "Create Custom Report", subtitle: "Build your own report", icon: FilePlus },
      { id: "saved-custom-reports", slug: "saved", title: "Saved Custom Reports", subtitle: "View and run saved reports", icon: FileText },
      { id: "scheduled-reports", slug: "scheduled", title: "Scheduled Reports", subtitle: "Automate report delivery", icon: Clock },
      { id: "export-data", slug: "export", title: "Export Data", subtitle: "Export reports in Excel/PDF", icon: Download },
      { id: "report-templates", slug: "templates", title: "Report Templates", subtitle: "Pre-built report templates", icon: FileText },
    ],
    tabs: {
      "saved": {
        id: "saved-custom-reports",
        slug: "saved",
        title: "Saved Custom Reports",
        subtitle: "Saved custom queries, automated email schedules, and custom analytical data views.",
        stats: [
          { id: "cr1", title: "Saved Reports", value: "18", trend: "4 active crons", trendDirection: "up", trendLabel: "custom workflows", icon: Sliders, iconBg: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400" },
          { id: "cr2", title: "Scheduled Auto Runs", value: "6 Daily", trend: "08:00 PM", trendDirection: "up", trendLabel: "night audit", icon: Clock, iconBg: "bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400" },
          { id: "cr3", title: "Exports This Month", value: "84", trend: "Excel & PDF", trendDirection: "up", trendLabel: "exported files", icon: Download, iconBg: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400" },
          { id: "cr4", title: "Custom Dashboards", value: "3", trend: "Director View", trendDirection: "up", trendLabel: "executive views", icon: Database, iconBg: "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400" },
        ],
        chart: { title: "Automated Report Executions & Downloads", metric1Label: "Auto Runs", metric2Label: "Downloads", metric1Color: "#f59e0b", metric2Color: "#0284c7", data: generateDailyTrend(0.5, 0.4) },
        filterPlaceholder: "Search saved report name, creator, schedule...",
        columns: [
          { key: "reportName", label: "Report Name" },
          { key: "category", label: "Domain" },
          { key: "frequency", label: "Schedule", align: "center" },
          { key: "recipients", label: "Notification Channels" },
          { key: "lastRun", label: "Last Generated" },
          { key: "fileFormat", label: "Format", align: "center" },
          { key: "status", label: "Status", align: "center", isStatus: true },
        ],
        rows: [
          { id: "1", reportName: "Daily Evening Cashier Reconciliation", category: "Finance", frequency: "Daily at 10 PM", recipients: "Owner WhatsApp, Email", lastRun: "31 Oct 2024 22:00", fileFormat: "PDF", status: "Active" },
          { id: "2", reportName: "Near Expiry <60 Days Alert", category: "Inventory", frequency: "Every Monday 9 AM", recipients: "Store Manager Email", lastRun: "28 Oct 2024 09:00", fileFormat: "Excel", status: "Active" },
          { id: "3", reportName: "Doctor Prescription Volume Share", category: "Sales", frequency: "1st of Every Month", recipients: "Director Email", lastRun: "01 Oct 2024 00:00", fileFormat: "PDF", status: "Active" },
          { id: "4", reportName: "Schedule H1 Register Export", category: "Compliance", frequency: "On Demand", recipients: "Drug Inspector Portal", lastRun: "25 Oct 2024 15:30", fileFormat: "Excel", status: "Active" },
          { id: "5", reportName: "High Margin Skincare & Wellness", category: "Sales", frequency: "Weekly", recipients: "POS Counter 1", lastRun: "29 Oct 2024 08:00", fileFormat: "CSV", status: "Active" },
          { id: "6", reportName: "Supplier Outstanding & Debit Notes", category: "Suppliers", frequency: "Bi-Weekly", recipients: "Accounts Email", lastRun: "26 Oct 2024 11:00", fileFormat: "Excel", status: "Active" },
          { id: "7", reportName: "Slow Moving Dead Stock Dump", category: "Inventory", frequency: "Monthly", recipients: "Pharmacist WhatsApp", lastRun: "15 Oct 2024 10:00", fileFormat: "Excel", status: "Active" },
          { id: "8", reportName: "GSTR-1 Monthly JSON Pre-Check", category: "GST", frequency: "10th of Month", recipients: "CA Email", lastRun: "10 Oct 2024 17:00", fileFormat: "JSON", status: "Active" },
          { id: "9", reportName: "VIP Patient Udhar Recovery List", category: "Customers", frequency: "Every Friday", recipients: "Counter Staff", lastRun: "25 Oct 2024 18:00", fileFormat: "PDF", status: "Active" },
          { id: "10", reportName: "Narcotic Stock Discrepancy Log", category: "Compliance", frequency: "Daily", recipients: "Chief Pharmacist", lastRun: "31 Oct 2024 21:00", fileFormat: "PDF", status: "Active" },
        ],
      },
    },
  },
};

/**
 * Normalization helper: resolves category slug and tab config
 */
export const resolveCategoryAndTab = (categoryParam, subReportParam) => {
  let catKey = "sales";
  let tabKey = "summary";

  if (categoryParam) {
    const cleanCat = categoryParam.toLowerCase().replace("-reports", "");
    if (cleanCat in MASTER_CATEGORIES_DATA) {
      catKey = cleanCat;
    } else {
      // Find by report id
      for (const [cKey, cData] of Object.entries(MASTER_CATEGORIES_DATA)) {
        if (cData.id === categoryParam || cData.items.some((it) => it.id === categoryParam || it.slug === categoryParam)) {
          catKey = cKey;
          break;
        }
      }
    }
  }

  const categoryData = MASTER_CATEGORIES_DATA[catKey] || MASTER_CATEGORIES_DATA["sales"];

  if (subReportParam) {
    const cleanTab = subReportParam.toLowerCase();
    if (cleanTab in categoryData.tabs) {
      tabKey = cleanTab;
    } else {
      // Try to find matching item slug or id
      const matched = categoryData.items.find((it) => it.id === cleanTab || it.slug === cleanTab);
      if (matched && matched.slug in categoryData.tabs) {
        tabKey = matched.slug;
      }
    }
  } else {
    // Default to first tab of the category
    tabKey = categoryData.items[0]?.slug || Object.keys(categoryData.tabs)[0];
  }

  const tabConfig = categoryData.tabs[tabKey] || Object.values(categoryData.tabs)[0];

  return {
    categoryData,
    tabConfig,
    catKey,
    tabKey,
  };
};

/**
 * Backward compatibility alias for sales summary view
 */
export const SALES_REPORTS_CONFIG = MASTER_CATEGORIES_DATA["sales"].tabs;
export const REPORT_DIRECTORY_CATEGORIES = Object.values(MASTER_CATEGORIES_DATA);
