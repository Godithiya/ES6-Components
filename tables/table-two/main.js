let dragSrc = null;
const thead = document.querySelector("thead"),
    tbody = document.querySelector("tbody"),
    theadCells = thead.rows[0].cells;

const dragStart = (e) => {
    e.target.classList.add("drag");
    Array.from(theadCells).forEach((th) => th.classList.remove("drop"));
    dragSrc = e.target;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", e.target.cellIndex);
};

const dragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
}

const dragEnter = (e) => e.target.classList.add("over");

const dragLeave = (e) => e.target.classList.remove("over");

const dragEnd = (e) => {
    e.target.classList.remove("drag");
    Array.from(theadCells).forEach((th) => th.classList.remove("over"));
};

const drop = (e) => {
    e.stopPropagation();
    e.target.classList.add("drop");

    if (dragSrc && !e.target.isSameNode(dragSrc)) {
        const originalIndex = parseInt(e.dataTransfer.getData("text/plain"));
        const targetIndex = e.target.cellIndex;

        // Pastikan indeks valid
        if (isNaN(originalIndex) || originalIndex < 0 || originalIndex >= theadCells.length) return;
        if (targetIndex < 0 || targetIndex >= theadCells.length) return;

        // Dapatkan elemen th yang asli dan target
        const draggedTh = thead.rows[0].cells[originalIndex];
        const targetTh = e.target;

        // Tentukan posisi penyisipan
        const insertPosition = targetIndex > originalIndex ? "afterend" : "beforebegin";

        // Pindahkan header
        targetTh.insertAdjacentElement(insertPosition, draggedTh);

        // Pindahkan sel di setiap baris
        Array.from(tbody.rows).forEach((tr) => {
            const draggedCell = tr.cells[originalIndex];
            const targetCell = tr.cells[targetIndex];
            targetCell.insertAdjacentElement(insertPosition, draggedCell);
        });
    }
};

Array.from(theadCells).forEach((th) => {
    th.addEventListener("dragstart", dragStart);
    th.addEventListener("dragover", dragOver);
    th.addEventListener("dragenter", dragEnter);
    th.addEventListener("dragleave", dragLeave);
    th.addEventListener("dragend", dragEnd);
    th.addEventListener("drop", drop);
});
