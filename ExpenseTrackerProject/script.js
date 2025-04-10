let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    let editIndex = -1;

    function saveToLocal() {
      localStorage.setItem("transactions", JSON.stringify(transactions));
    }

    function addTransaction() {
      const date = document.getElementById("date").value;
      const desc = document.getElementById("desc").value;
      const category = document.getElementById("category").value;
      const amount = parseFloat(document.getElementById("amount").value);

      if (!date || !desc || !category || isNaN(amount) || amount <= 0) {
        alert("Please enter valid data.");
        return;
      }

      const transaction = { date, desc, category, amount };
      if (editIndex !== -1) {
        transactions[editIndex] = transaction;
        editIndex = -1;
      } else {
        transactions.push(transaction);
      }

      saveToLocal();
      resetForm();
      renderTransactions();
    }

    function resetForm() {
      document.getElementById("date").value = "";
      document.getElementById("desc").value = "";
      document.getElementById("category").value = "Income";
      document.getElementById("amount").value = "";
    }

    function editTransaction(index) {
      const t = transactions[index];
      document.getElementById("date").value = t.date;
      document.getElementById("desc").value = t.desc;
      document.getElementById("category").value = t.category;
      document.getElementById("amount").value = t.amount;
      editIndex = index;
    }

    function deleteTransaction(index) {
      transactions.splice(index, 1);
      saveToLocal();
      renderTransactions();
    }

    function renderTransactions() {
      const container = document.getElementById("transactions");
      const filter = document.getElementById("filter").value;
      container.innerHTML = "";
      let income = 0, expense = 0;
      let pieData = {};

      transactions.forEach((t, index) => {
        if (filter !== "All" && t.category !== filter) return;
        const div = document.createElement("div");
        div.classList.add("transaction");
        if (t.category !== "Income") div.classList.add("expense");

        div.innerHTML = `
          <div>
            <div><strong>${t.desc}</strong> - ${t.category}</div>
            <small>${t.date}</small>
          </div>
          <div class="actions">
            ₹${t.amount}
            <button onclick="editTransaction(${index})">✏️</button>
            <button onclick="deleteTransaction(${index})">❌</button>
          </div>
        `;
        if (t.category === "Income") income += t.amount;
        else {
          expense += t.amount;
          pieData[t.category] = (pieData[t.category] || 0) + t.amount;
        }
        container.appendChild(div);
      });

      document.getElementById("total-income").innerText = income;
      document.getElementById("total-expense").innerText = expense;
      document.getElementById("net-balance").innerText = income - expense;
      renderChart(pieData);
    }

    function renderChart(pieData) {
      const ctx = document.getElementById("chart").getContext("2d");
      if (window.pieChart) window.pieChart.destroy();
      window.pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: Object.keys(pieData),
          datasets: [{
            data: Object.values(pieData),
            backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0', '#9966ff']
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'bottom' }
          }
        }
      });
    }

    function exportData() {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(transactions));
      const link = document.createElement('a');
      link.setAttribute("href", dataStr);
      link.setAttribute("download", "transactions.json");
      document.body.appendChild(link);
      link.click();
      link.remove();
    }

    function triggerImport() {
      const fileInput = document.getElementById("fileInput");
      if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
        alert("Please select a valid file.");
        return;
      }

      const file = fileInput.files[0];

      if (!(file instanceof Blob)) {
        alert("The selected file is not valid.");
        return;
      }

      const reader = new FileReader();
      reader.onload = function(e) {
        const content = e.target.result;

        if (file.name.endsWith(".json")) {
          try {
            const data = JSON.parse(content);
            if (!Array.isArray(data)) throw new Error("Invalid JSON format");
            transactions = data;
            saveToLocal();
            renderTransactions();
          } catch (err) {
            alert("Invalid JSON file: " + err.message);
          }
        } else if (file.name.endsWith(".csv")) {
          try {
            const lines = content.trim().split("\n");
            const newData = lines.map((line, idx) => {
              const [date, desc, category, amount] = line.split(",").map(x => x.trim());
              if (idx === 0 && date.toLowerCase() === "date") return null; // skip header
              return { date, desc, category, amount: parseFloat(amount) };
            }).filter(Boolean);
            transactions = newData;
            saveToLocal();
            renderTransactions();
          } catch (err) {
            alert("Failed to import CSV: " + err.message);
          }
        } else {
          alert("Unsupported file type. Please upload a .json or .csv file.");
        }
      };

      reader.readAsText(file);
    }

    renderTransactions();