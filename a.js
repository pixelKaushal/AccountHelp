const form = document.getElementById("input");
const sbtn = document.getElementById("ds");
const bdate = document.getElementById("bdate");
const table = document.getElementById("tbt");
const tableBody = document.getElementById("tbt-body");
const debitT = document.getElementById("debit-total");
const creditT = document.getElementById("credit-total");
const tafoot = document.getElementById("ta-foot");
const tatable = document.getElementById("ta-table");
let snC = 0;
let dbtT = 0;
let cbtT = 0;
const taname = document.getElementById("taname");
const tadate = document.getElementById("tadate");
const fad = {};
const tabody = document.getElementById("ta-body");
const debit = [
  // Assets
  "cash",
  "bank account",
  "petty cash",
  "accounts receivable",
  "bills receivable",
  "inventory",
  "stock",
  "prepaid expenses",
  "furniture and fixtures",
  "office equipment",
  "computer equipment",
  "machinery",
  "vehicles",
  "buildings",
  "land",
  "accrued income",
  "loan to employees",
  "advance to suppliers",

  // Expenses
  "rent expense",
  "salaries expense",
  "wages",
  "utilities expense",
  "electricity expense",
  "water expense",
  "telephone expense",
  "internet expense",
  "insurance expense",
  "advertising expense",
  "depreciation expense",
  "repairs and maintenance",
  "postage and courier",
  "printing and stationery",
  "travel and conveyance",
  "legal and professional fees",
  "training expense",
  "bank charges",
  "bad debts written off",

  // Losses
  "loss on sale of assets",
  "loss by fire",
  "loss by theft",

  // Drawings
  "drawings",
  "drawing",

  "closing stock",
  "bad debts",
  "provision for bad debts",
  "outstanding expenses",
  "prepaid expenses",
  "opening stock",
  "purchases",
  "direct wages",
  "direct expenses",
  "freight ",
  "manufacturing expenses",
  "carriage inward",
  "custom duties",
  "packing expenses",
  "insurance (on goods)",
  "power and fuel",
  "factory rent",
  "import duty",
  "depreciation",
  "factory insurance",
  "royalty",
  "coal and consumables",
  "octroi",
  "excise duty",
  "sales return",
];
let taTD = 0;
let taTC = 0;
let plfactor;

const credit = [
  // Liabilities
  "accounts payable",
  "bills payable",
  "accrued expenses",
  "outstanding salaries",
  "outstanding rent",
  "unearned revenue",
  "customer advances",
  "loan from bank",
  "loan from partners",
  "overdraft",
  "provision for bad debts",
  "taxes payable",

  // Income / Revenue
  "sales",
  "service revenue",
  "interest income",
  "commission received",
  "rent received",
  "discount received",
  "dividend income",
  "gain on sale of assets",
  "miscellaneous income",

  // Capital
  "capital account",
  "partner’s capital",
  "owner’s capital",
  "retained earnings",
  "reserves and surplus",

  // Provisions & Contra Accounts
  "provision for depreciation", // Depreciation provision
  "allowance for doubtful accounts", // Allowance for bad debts (contra asset)

  // Adjustments
  "unearned income",
  "accrued income",
  "interest on capital",
  "interest on drawings",
  "purchases return",
];
const fatad = [
  "opening stock",
  "purchases",
  "direct wages",
  "freight",
  "carriage inward",
  "custom duties",
  "import duty",
  "manufacturing expenses",
  "packing expenses",
  "power and fuel",
  "factory rent",
  "factory insurance",
  "repairs and maintenance",
  "royalty",
  "coal and consumables",
  "octroi",
  "excise duty",
  "duty and clearing charges",
  "custom duty",
  "water supply",
  "sales return",
];
const fatac = ["sales", "purchase return", "closing stock"];
//===================COMPANY NAME========================= AND DATE KO =====================
if (sbtn) {
  sbtn.addEventListener("click", function (e) {
    e.preventDefault();

    if (form.checkValidity()) {
      const cname = document.getElementById("cname").value;
      const dateStr = document.getElementById("date").value;

      const date = new Date(dateStr);
      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();

      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      function getOrdinal(n) {
        const s = ["th", "st", "nd", "rd"],
          v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
      }
      const bname = document.getElementById("bname");
      const formattedDate = `${getOrdinal(day)} ${monthNames[month]} ${year}`;
      bdate.innerHTML = `As on ${formattedDate}`;
      bname.innerHTML = cname;
      taname.innerHTML = `Trading account of ${cname}`;
      tadate.innerHTML = `For the year ended ${formattedDate}`;
    } else {
      form.reportValidity();
    }
  });
}
//TRIAL BALANCE ===============================

const form2 = document.getElementById("p");
const sbtn2 = document.getElementById("dataS");
sbtn2.addEventListener("click", function (e) {
  e.preventDefault();
  if (form2.checkValidity()) {
    const particularsInput = document.getElementById("Particulars");
    const amountInput = document.getElementById("amount");
    fad[particularsInput.value] = amountInput.value;

    const particulars = particularsInput.value.toLowerCase().trim();
    const amount = Number(amountInput.value.trim());
    const errMsg = document.getElementById("err");

    let isValid = false;
    // ====TRADING ACCOUNT =============================================================================================
    if (fatad.includes(particulars)) {
      const r2 = document.createElement("tr");
      r2.innerHTML = `<td>To ${particulars}</td><td>${amount}</td> <td> </td><td></td>`;
      tabody.appendChild(r2);
      taTD += amount;
      plfactor = taTD - taTC;
      tafoot.innerHTML = `<td>Total</td><td>${taTD}</td><td></td><td>${taTC}</td>`;
      errMsg.innerText = "";
    }

    if (fatac.includes(particulars)) {
      const r2 = document.createElement("tr");
      r2.innerHTML = `<td></td><td></td> <td>By ${particulars}</td><td>${amount}</td>`;
      tabody.appendChild(r2);
      taTC += amount;

      plfactor = taTD - taTC;
      console.log(taTC);
      tafoot.innerHTML = `<td>Total</td><td>${taTD}</td><td></td><td>${taTC}</td>`;
      errMsg.innerText = "";
    }

    if (debit.includes(particulars)) {
      snC++;
      const row = document.createElement("tr");
      row.innerHTML = `<td>${snC}</td><td>${particulars}</td><td></td><td>${amount}</td><td></td>`;
      tableBody.appendChild(row);
      dbtT += amount;

      debitT.innerText = dbtT.toFixed(2);
      isValid = true;
    } else if (credit.includes(particulars)) {
      snC++;
      const row = document.createElement("tr");
      row.innerHTML = `<td>${snC}</td><td>${particulars}</td><td></td><td></td><td>${amount}</td>`;
      tableBody.appendChild(row);
      cbtT += amount;
      creditT.innerText = cbtT.toFixed(2);
      isValid = true;
    }

    if (!isValid) {
      if (!debit.includes(particulars) && !credit.includes(particulars)) {
        alert("❌ Not found in debit or credit.");
        let response = confirm(
          "Do you want to add it to the debit or credit table?"
        );
        if (response) {
          let tableChoice = prompt("Enter 'debit' or 'credit':").toLowerCase();
          if (tableChoice === "debit") {
            debit.push(particulars);
            fatad.push(particulars);
            alert(`✅ ${particulars} has been added to the DEBIT table.`);
            dbtList.innerHTML = generateStyledList(
              "🟢 Debit Items",
              debit,
              "#27ae60"
            );
            cbtList.innerHTML = generateStyledList(
              "🔴 Credit Items",
              credit,
              "#c0392b"
            );
          } else if (tableChoice === "credit") {
            credit.push(particulars);
            fatad.push(particulars);
            alert(`✅ ${particulars} has been added to the CREDIT table.`);
            dbtList.innerHTML = generateStyledList(
              "🟢 Debit Items",
              debit,
              "#27ae60"
            );
            cbtList.innerHTML = generateStyledList(
              "🔴 Credit Items",
              credit,
              "#c0392b"
            );
          }
        }
      }
    } else {
      errMsg.innerText = "";
      particularsInput.value = "";
      amountInput.value = "";
    }
  } else {
    form2.reportValidity();
  }
});

// =============== LIST DEKHAUNE FUNCTION =========================
const dbtList = document.getElementById("dbt");
const cbtList = document.getElementById("cbt");

function generateStyledList(title, items, color) {
  return `
        <div class="styled-box" style="border-left: 6px solid ${color};">
          <h3 style="margin-bottom: 10px; color: ${color};">${title}</h3>
          <ul class="styled-list">
            ${items.map((item) => `<li>📌 ${item}</li>`).join("")}
          </ul>
        </div>
      `;
}

dbtList.innerHTML = generateStyledList("🟢 Debit Items", debit, "#27ae60");
cbtList.innerHTML = generateStyledList("🔴 Credit Items", credit, "#c0392b");

/// print button ko =====================================
const pbtn = document.getElementById("print");

if (pbtn) {
  pbtn.addEventListener("click", function () {
    let name = prompt("Enter Auditor's name");
    const printWindow = window.open("", "_blank");

    const tableHTML = table.outerHTML;
    const dateStr = document.getElementById("date").value;

    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    function getOrdinal(n) {
      const s = ["th", "st", "nd", "rd"],
        v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    }
    const bname = document.getElementById("bname");
    const formattedDate = `${getOrdinal(day)} ${monthNames[month]} ${year}`;
    const htmlContent = `
          <html>
            <head>
              <title>Trial Balance</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  padding: 20px;
                }
                table {
                  width: 100%;
                  border-collapse: collapse;
                  margin-top: 20px;
                }
                th, td {
                  border: 1px solid #000;
                  padding: 8px;
                  text-align: center;
                }
                h1, h2 {
                  text-align: center;
                }
                p {
                  text-align: center;
                }
              </style>
            </head>
            <body>
            <h2>${document.getElementById("cname").value}</h2>
              <h1>Trial Balance</h1>
              <p>As on ${formattedDate}</p>
            
              ${tableHTML}
          <h3>Prepared by: ${name}</h3>
            </body>
          </html>
        `;

    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();

    printWindow.onload = function () {
      printWindow.print();
    };
  });
}

const trdacc = document.getElementById("fata");
trdacc.addEventListener("click", function () {
  if (plfactor < 0) {
    const r2 = document.createElement("tr");
    let newplfactor = Math.abs(plfactor);
    r2.innerHTML = `<td>TO Gross profit c/d</td><td>${newplfactor} </td> <td></td><td></td>`;
    taTD += newplfactor;
    tafoot.innerHTML = `<td>Total</td><td>${taTD}</td><td></td><td>${taTC}</td>`;
    tabody.appendChild(r2);
  } else if (plfactor > 0) {
    const r2 = document.createElement("tr");
    r2.innerHTML = `<td></td><td></td> <td>By gross loss c/d</td><td>${plfactor}</td>`;
    taTC += plfactor;
    tafoot.innerHTML = `<td>Total</td><td>${taTD}</td><td></td><td>${taTC}</td>`;
    tabody.appendChild(r2);
  }
  let name = prompt("Enter Auditor's name");
  const tableHTML = tatable.outerHTML;
  const printWindow = window.open("", "_blank");
  const dateStr = document.getElementById("date").value;

  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function getOrdinal(n) {
    const s = ["th", "st", "nd", "rd"],
      v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }
  const formattedDate = `${getOrdinal(day)} ${monthNames[month]} ${year}`;
  const htmlContent = `
          <html>
            <head>
              <title>Trading Account</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  padding: 20px;
                }
                table {
                  width: 100%;
                  border-collapse: collapse;
                  margin-top: 20px;
                }
                th, td {
                  border: 1px solid #000;
                  padding: 8px;
                  text-align: center;
                }
                h1, h2 {
                  text-align: center;
                }
                p {
                  text-align: center;
                }
              </style>
            </head>
            <body>
            <h2>Trading account of ${
              document.getElementById("cname").value
            }</h2>
            
              <p>For the year ended ${formattedDate}</p>
              <div style="display:flex; justify-content:space-between; padding: 0 20px; width: 100%;">
            <strong>Dr.</strong>
            <strong>Cr.</strong>
            </div>
              ${tableHTML}
          <h3>Prepared by: ${name}</h3>
            </body>
          </html>
        `;
  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();
});
