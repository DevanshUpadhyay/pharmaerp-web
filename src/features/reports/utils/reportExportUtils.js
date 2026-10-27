// src/features/reports/utils/reportExportUtils.js

const formatCurrency = (val) => {
  if (val === undefined || val === null || isNaN(Number(val))) return "0.00";
  return Number(val).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const formatDate = (val) => {
  if (!val) return "—";
  const d = new Date(val);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

/**
 * Downloads report data as CSV file
 */
export const exportReportToCsv = (reportTitle, columns = [], rows = [], metadata = {}) => {
  if (!rows || rows.length === 0) {
    alert("No records to export.");
    return;
  }

  const metaHeader = [
    `"${reportTitle.replace(/"/g, '""')}"`,
    `"Generated On: ${new Date().toLocaleString("en-IN")}"`,
    `"Pharmacy: ${(metadata.pharmacyName || "PharmaERP").replace(/"/g, '""')}"`,
    `"Date Range: ${metadata.startDate || "All"} to ${metadata.endDate || "Present"}"`,
    "", // Blank row
  ].join("\n");

  const headerRow = columns.map((c) => `"${c.label.replace(/"/g, '""')}"`).join(",");
  const bodyRows = rows.map((row) =>
    columns
      .map((col) => {
        let val = row[col.id];
        if (val === undefined || val === null) val = "";
        return `"${String(val).replace(/"/g, '""')}"`;
      })
      .join(",")
  );

  const csvContent = "data:text/csv;charset=utf-8," + [metaHeader, headerRow, ...bodyRows].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  const fileName = `${reportTitle.toLowerCase().replace(/[^a-z0-9]/g, "_")}_${new Date().toISOString().split("T")[0]}.csv`;
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Opens an official print view with Pharmacy Letterhead and Drug Licenses
 */
export const printPharmacyReport = ({
  reportTitle,
  columns = [],
  rows = [],
  summaryCards = [],
  company = {},
  branch = {},
  filters = {},
}) => {
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    alert("Please allow popups to print report.");
    return;
  }

  const companyName = company?.tradeName || company?.legalName || "Pharma Pharmacy";
  const branchName = branch?.name || "Main Dispensary";
  const branchAddress = branch?.address?.addressLine1
    ? `${branch.address.addressLine1}, ${branch.address.city || ""}`
    : "Retail Counter";
  const gstin = company?.gstin || "—";
  const dl20b = branch?.drugLicense20B || company?.drugLicense20B || "DL-20B-PENDING";
  const dl21b = branch?.drugLicense21B || company?.drugLicense21B || "DL-21B-PENDING";

  const summaryHtml = summaryCards
    .map(
      (s) => `
      <div class="summary-card">
        <div style="font-size: 9px; color: #64748b; text-transform: uppercase; font-weight: 600; letter-spacing: 0.02em;">${s.title}</div>
        <div style="font-size: 14px; font-weight: bold; color: #0f172a; margin-top: 2px;">
          ${s.type === "currency" ? `₹${formatCurrency(s.value)}` : s.value}
        </div>
        <div style="font-size: 8.5px; color: #94a3b8; margin-top: 2px;">${s.subtitle || ""}</div>
      </div>
    `
    )
    .join("");

  const tableHeaderHtml = columns
    .map(
      (c) => `
      <th style="text-align: ${c.align || "left"};">
        ${c.label}
      </th>
    `
    )
    .join("");

  const tableRowsHtml = rows
    .map(
      (row, idx) => `
      <tr style="background: ${idx % 2 === 0 ? "#ffffff" : "#f8fafc"};">
        ${columns
          .map((c) => {
            let val = row[c.id];
            let display = val !== undefined && val !== null ? String(val) : "—";
            if (c.type === "currency") display = `₹${formatCurrency(val)}`;
            else if (c.type === "date") display = formatDate(val);
            return `<td style="text-align: ${c.align || "left"};">${display}</td>`;
          })
          .join("")}
      </tr>
    `
    )
    .join("");

  const fullHtml = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>${reportTitle} — ${companyName}</title>
        <style>
          @page {
            size: A4 portrait;
            margin: 10mm;
          }
          * {
            box-sizing: border-box;
          }
          html, body {
            margin: 0;
            padding: 0;
            background: #ffffff;
            color: #0f172a;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          body {
            padding: 6px;
          }
          .header-box {
            border-bottom: 2px solid #0284c7;
            padding-bottom: 8px;
            margin-bottom: 12px;
          }
          .summary-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 8px;
            margin-bottom: 12px;
          }
          .summary-card {
            border: 1px solid #cbd5e1;
            border-radius: 6px;
            padding: 6px 10px;
            background: #f8fafc;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 8px;
            page-break-inside: auto;
          }
          thead {
            display: table-header-group;
          }
          tr {
            page-break-inside: avoid;
            page-break-after: auto;
          }
          th {
            padding: 6px 6px;
            border-bottom: 2px solid #0284c7;
            font-size: 9.5px;
            text-transform: uppercase;
            font-weight: 700;
            background: #f1f5f9;
            color: #1e293b;
            letter-spacing: 0.02em;
          }
          td {
            padding: 5px 6px;
            font-size: 9.5px;
            border-bottom: 1px solid #e2e8f0;
            color: #0f172a;
            word-break: break-word;
          }
          @media print {
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header-box">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 16px;">
            <div>
              <h1 style="margin: 0; font-size: 18px; color: #0369a1; text-transform: uppercase; letter-spacing: -0.01em;">${companyName}</h1>
              <div style="font-size: 11px; font-weight: 600; color: #334155; margin-top: 2px;">${branchName} — ${branchAddress}</div>
              <div style="font-size: 9.5px; color: #64748b; margin-top: 3px;">
                <strong>GSTIN:</strong> ${gstin} &nbsp;|&nbsp; 
                <strong>DL No (20B/21B):</strong> ${dl20b} / ${dl21b}
              </div>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 15px; font-weight: bold; color: #0f172a; text-transform: uppercase;">${reportTitle}</div>
              <div style="font-size: 9.5px; color: #64748b; margin-top: 2px;">
                Period: ${filters.startDate || "Start"} to ${filters.endDate || "Present"}
              </div>
              <div style="font-size: 8.5px; color: #94a3b8; margin-top: 1px;">Printed: ${new Date().toLocaleString("en-IN")}</div>
            </div>
          </div>
        </div>

        <div class="summary-grid">
          ${summaryHtml}
        </div>

        <table>
          <thead>
            <tr>${tableHeaderHtml}</tr>
          </thead>
          <tbody>
            ${tableRowsHtml}
          </tbody>
        </table>

        <div style="display: flex; justify-content: space-between; margin-top: 32px; padding-top: 8px; font-size: 9.5px; color: #64748b; border-top: 1px dashed #cbd5e1; page-break-inside: avoid;">
          <div>Generated by PharmaERP System</div>
          <div>Verified By Registered Pharmacist: _____________________</div>
          <div>Authorized Signatory: _____________________</div>
        </div>

        <script>
          window.onload = function() {
            window.focus();
            window.print();
          };
        </script>
      </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(fullHtml);
  printWindow.document.close();
};
