// Am completat API-ul cu parametrul country=Romania
const API_URL = "http://universities.hipolabs.com/search?country=Romania";
const status = document.getElementById("status");
const tbody = document.getElementById("tbody");
const qInput = document.getElementById("q");
const exportBtn = document.getElementById("exportBtn");
let all = []; // Am completat array-ul gol

function setStatus(text) {
    status.textContent = text; // Completat
}

function render(data) {
    tbody.innerHTML = data.map(u => {
        const site = u.web_pages?.[0] 
            ? `<a href="${u.web_pages[0]}" target="_blank">${u.web_pages[0]}</a>` 
            : "";
        return `<tr>
            <td>${u.name || ""}</td>
            <td>${u.country || ""}</td>
            <td>${site}</td>
        </tr>`;
    }).join("");
}

async function loadUniversities() {
    setStatus("Se încarcă...");
    tbody.innerHTML = "";
    try {
        const res = await fetch(API_URL);
        const data = await res.json();
        all = data;
        render(all);
        setStatus(`Încărcat (${all.length} rezultate).`);
    } catch {
        setStatus("Eroare la încărcare. Încearcă din nou.");
    }
}

qInput.addEventListener("input", () => {
    const q = qInput.value.trim().toLowerCase();
    const filtered = q 
        ? all.filter(u => (u.name || "").toLowerCase().includes(q)) 
        : all;
    
    render(filtered); // Randează doar datele filtrate
    setStatus(`Filtrate: ${filtered.length} din ${all.length}.`);
});

// Funcția de export CSV (Pas 5)
function exportCSV(data) {
    if (!data.length) return alert("Nu există date de exportat.");
    
    const header = ["Nume", "Tara", "Site"]; // Am completat titlurile
    const rows = data.map(u => [
        u.name || "",
        u.country || "",
        (u.web_pages && u.web_pages[0]) || ""
    ]);
    
    const csvContent = [header, ...rows]
        .map(r => r.map(v => `"${v.replace(/"/g, '""')}"`).join(","))
        .join("\n");
        
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob); // Am completat cu 'blob'
    
    const a = document.createElement("a");
    a.href = url;
    a.download = "universitati.csv"; // Am completat numele fișierului
    a.click();
    URL.revokeObjectURL(url);
}

// Evenimentul pentru descărcare
exportBtn.addEventListener("click", () => {
    // Luăm lista filtrată ca să descărcăm doar ce avem pe ecran
    const q = qInput.value.trim().toLowerCase();
    const currentData = q 
        ? all.filter(u => (u.name || "").toLowerCase().includes(q)) 
        : all;
    exportCSV(currentData);
});

// Apelul funcției la final pentru a începe extragerea (Pas 3 final)
loadUniversities();