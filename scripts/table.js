class Table {
    #tableContainerRef;
    #tableHeaderRef;
    #tableBodyRef;
    #colDef;

    constructor(selector, colDef) {
        this.#tableContainerRef = document.querySelector(selector);
        this.#colDef = colDef;

        this.#tableHeaderRef = this.#getTableHeaderRef(colDef);
        this.#tableBodyRef = this.#getTableBodyRef();

        this.#drawTable(this.#tableBodyRef, this.#tableHeaderRef);
    }

    get rowData() {
        return [...this.#tableBodyRef.children].map(row => {
            return [...row.children]
                .reduce((acc, col, i) => {
                    acc[this.#colDef[i].propertyName] = col.textContent;

                    return acc;
                }, {});
        });
    }

    get tableHeaderRef() {
        return this.#getTableHeaderRef();
    }

    get tableBodyRef() {
        return this.#getTableBodyRef()
    }

    get colDef() {
        return this.#colDef;
    }

    setRowData(data) {
       this.#tableBodyRef.innerHTML = '';

       for(let row of data) {
           this.addRow(row);
       }
    }

    addRow(row) {
        const rowRef = this.#getRowRef();
        rowRef.dataset.id = row.id;

        for(let col of this.#colDef) {
            const columnRef = document.createElement('td');
            columnRef.textContent = row[col.propertyName];

            rowRef.appendChild(columnRef);
        }

        this.#tableBodyRef.appendChild(rowRef);
    }

    isDuplicateRow(newRow) {
        return this.rowData.some(existingRow => {
            return this.#colDef.every(col => {
                return existingRow[col.propertyName] === newRow[col.propertyName];
            });
        });
    }

    #getTableBodyRef() {
        return document.createElement('tbody');
    }

    #getRowRef() {
        return document.createElement('tr');
    }

    #getTableHeaderRef(colDef) {
        const theadRef = document.createElement('thead');
        const rowRef = document.createElement('tr');

        for (let col of colDef) {
            const columnRef = document.createElement('th');
            columnRef.textContent = col.headerText;

            rowRef.appendChild(columnRef);
        }

        theadRef.appendChild(rowRef);

        return theadRef;
    }

    #drawTable(bodyRef, headerRef) {
        this.#tableContainerRef.innerHTML = '';
        this.#tableContainerRef.appendChild(headerRef);
        this.#tableContainerRef.appendChild(bodyRef);
    }
}