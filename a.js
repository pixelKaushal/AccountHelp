const form = document.getElementById("input");
const sbtn = document.getElementById("ds");
const bdate = document.getElementById("bdate");
const table = document.getElementById("tbt");
const tableBody = document.getElementById("tbt-body");
const debitT = document.getElementById("debit-total");
const creditT = document.getElementById("credit-total");

let snC = 0;
let dbtT = 0;
let cbtT = 0;

const debit = [
  // assets
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

  // expenses
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

  // losses
  "loss on sale of assets",
  "loss by fire",
  "loss by theft",

  // drawings
  "drawings",
  "drawing",
];

const credit = [
  // liabilities
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

  // income / revenue
  "sales revenue",
  "service revenue",
  "interest income",
  "commission received",
  "rent received",
  "discount received",
  "dividend income",
  "gain on sale of assets",
  "miscellaneous income",

  // capital
  "capital account",
  "partner’s capital",
  "owner’s capital",
  "retained earnings",
  "reserves and surplus",

  // provisions & contra accounts
  "provision for depreciation",
  "allowance for doubtful accounts",
];

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

    const particulars = particularsInput.value.toLowerCase().trim();
    const amount = Number(amountInput.value.trim());
    const errMsg = document.getElementById("err");

    let isValid = false;

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
      errMsg.innerText = `Invalid Particular Entry or Not Found`;
    } else {
      errMsg.innerText = "";
      particularsInput.value = "";
      amountInput.value = "";
    }
  } else {
    form2.reportValidity();
  }
});
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
const form3 = document.getElementById("checks");
const sbtn3 = document.getElementById("dataC");

sbtn3.addEventListener("click", function (e) {
  e.preventDefault();
  if (form3.checkValidity()) {
    const check = document.getElementById("check").value.toLowerCase().trim();

    if (debit.includes(check)) {
      alert("✅ It is available in the DEBIT table.");
    } else if (credit.includes(check)) {
      alert("✅ It is available in the CREDIT table.");
    } else {
      alert("❌ Not found in debit or credit.");
      let response = confirm(
        "Do you want to add it to the debit or credit table?"
      );
      if (response) {
        let tableChoice = prompt("Enter 'debit' or 'credit':").toLowerCase();
        if (tableChoice === "debit") {
          debit.push(check);
          alert(`✅ ${check} has been added to the DEBIT table.`);
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
          credit.push(check);
          alert(`✅ ${check} has been added to the CREDIT table.`);
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
        } else {
          alert("❌ Invalid choice. Please enter 'debit' or 'credit'.");
        }
      }
    }
  } else {
    form3.reportValidity();
  }
});
