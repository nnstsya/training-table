let trainingData = JSON.parse(localStorage.getItem('trainingData')) || [];

const tableSearchByDirectionInputRef = document.getElementById('table-direction-search');
const errorDisplayRef = document.querySelector('.error-display');

const colDef = [
    { id: 1, headerText: 'Trainer', propertyName: 'trainer' },
    { id: 2, headerText: 'Date', propertyName: 'date' },
    { id: 3, headerText: 'Time', propertyName: 'time' },
    { id: 4, headerText: 'Direction', propertyName: 'direction' },
];

const table = new Table('.training-table', colDef);

const nameInputControl = new FormControl('#name-input', '');
const directionSelectControl = new FormControl('#direction-select', '');
const dateInputControl = new FormControl('#date-input', '');
const timeInputControl = new FormControl('#time-input', '');

const form = new Form('.add-training-form', (data) => {
    table.addRow(data);
    trainingData.push(data);
    localStorage.setItem('trainingData', JSON.stringify(trainingData));
}, errorDisplayRef);

table.setRowData(trainingData);

tableSearchByDirectionInputRef.addEventListener('input', (event) => {
    const searchValue = event.target.value.toLowerCase().trim();

    const filteredTrainings = trainingData.filter((training) =>
        training.direction.toLowerCase().includes(searchValue)
    );

    table.setRowData(filteredTrainings);
});

table.setRowData(trainingData);

