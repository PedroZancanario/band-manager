const STORAGE_KEY = "bands";

function saveBands(bands) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bands));
}

function loadBands() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}
