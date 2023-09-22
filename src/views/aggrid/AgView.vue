
<template>
  <div class="ag-theme-alpine" style="height: 400px;">
    <ag-grid-vue
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      :columnDefs="columnDefs"
      :rowData="rowData"
      rowSelection="multiple"
      animateRows="true"
    ></ag-grid-vue>
  </div>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue3';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export default {
  components: {
    AgGridVue,
  },
  data() {
    return {
      columnDefs: [
      { field: 'id' },
        { field: 'title',sortable:true,filter:true},
        { field: 'status' },
        { field: 'duedate' },
        { field: 'startdate' },
        { field: 'assigned' },
        // { field: 'actualEndDate' },
      ],
      rowData: [],
    };
  },
  mounted() {
    
    this.fetchData();
  },
  methods: {
    fetchData() {
      fetch('http://127.0.0.1:8000/api/tasks')
        .then((response) => response.json())
        .then((data) => {
          this.rowData = data; 
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    },
  },
};
</script>


